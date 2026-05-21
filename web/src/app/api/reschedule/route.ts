import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// API xử lý đổi lịch (Reschedule)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      sessionId, 
      studentId, 
      newSessionId, // Nếu đổi sang 1 ca trống có sẵn
      newStartTime, // Nếu tạo ca mới hoàn toàn
      newEndTime,
      teacherId,
      duration,
      changedById,
      changedByRole,
      reason,
      note
    } = body;

    if (!sessionId || !studentId || !changedById || !changedByRole || !reason) {
      return NextResponse.json({ success: false, error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Lấy thông tin ca học cũ và booking hiện tại
      const oldSession = await tx.session.findUnique({
        where: { id: sessionId },
        include: { bookings: true }
      });

      if (!oldSession) {
        throw new Error('Không tìm thấy ca học cũ');
      }

      // Xóa booking cũ
      await tx.booking.deleteMany({
        where: {
          sessionId,
          studentId
        }
      });

      // Cập nhật trạng thái ca cũ (nếu không còn ai booking thì chuyển về AVAILABLE)
      const remainingBookings = oldSession.bookings.filter(b => b.studentId !== studentId);
      if (remainingBookings.length === 0) {
        await tx.session.update({
          where: { id: sessionId },
          data: { status: 'AVAILABLE' }
        });
      }

      let finalNewSessionId = newSessionId;
      let finalNewStartTime = null;
      let finalNewEndTime = null;

      // 2. Xử lý ca học mới
      if (newSessionId) {
        // Đổi sang ca trống có sẵn
        const targetSession = await tx.session.findUnique({
          where: { id: newSessionId }
        });

        if (!targetSession) {
          throw new Error('Không tìm thấy ca học mới được chỉ định');
        }

        finalNewStartTime = targetSession.startTime;
        finalNewEndTime = targetSession.endTime;

        // Tạo booking mới
        await tx.booking.create({
          data: {
            sessionId: newSessionId,
            studentId,
          }
        });

        // Cập nhật trạng thái ca học mới thành BOOKED
        await tx.session.update({
          where: { id: newSessionId },
          data: { status: 'BOOKED' }
        });

      } else if (newStartTime && newEndTime && teacherId && duration) {
        // Tạo ca mới hoàn toàn
        finalNewStartTime = new Date(newStartTime);
        finalNewEndTime = new Date(newEndTime);

        const newSession = await tx.session.create({
          data: {
            startTime: finalNewStartTime,
            endTime: finalNewEndTime,
            duration,
            teacherId,
            status: 'BOOKED',
            createdBy: changedById,
          }
        });

        finalNewSessionId = newSession.id;

        // Tạo booking mới
        await tx.booking.create({
          data: {
            sessionId: newSession.id,
            studentId,
          }
        });
      } else {
        throw new Error('Cần cung cấp newSessionId hoặc thông tin ca mới (newStartTime, newEndTime, teacherId, duration)');
      }

      // 3. Ghi log lịch sử đổi lịch
      const log = await tx.rescheduleLog.create({
        data: {
          sessionId,
          studentId,
          oldStartTime: oldSession.startTime,
          oldEndTime: oldSession.endTime,
          newStartTime: finalNewStartTime,
          newEndTime: finalNewEndTime,
          changedById,
          changedByRole,
          reason,
          note
        }
      });

      return { log, newSessionId: finalNewSessionId };
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
