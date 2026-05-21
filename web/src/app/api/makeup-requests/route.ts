import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// API lấy danh sách yêu cầu ca bù
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const status = searchParams.get('status');

    const filter: any = {};
    if (studentId) filter.studentId = studentId;
    if (status) filter.status = status;

    const requests = await prisma.makeupRequest.findMany({
      where: filter,
      include: {
        student: { select: { name: true, studentCode: true } },
        originalSession: {
          select: {
            startTime: true,
            duration: true,
            teacher: { select: { name: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: requests });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API tạo yêu cầu ca bù mới
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentId, originalSessionId, preferredNote, targetWeekStart, targetWeekEnd } = body;

    if (!studentId || !originalSessionId || !targetWeekStart || !targetWeekEnd) {
      return NextResponse.json({ success: false, error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    const requestData = await prisma.$transaction(async (tx) => {
      // 1. Tạo MakeupRequest
      const req = await tx.makeupRequest.create({
        data: {
          studentId,
          originalSessionId,
          preferredNote,
          targetWeekStart: new Date(targetWeekStart),
          targetWeekEnd: new Date(targetWeekEnd),
          status: 'PENDING'
        }
      });

      // 2. Tăng số ca cần bù (makeupSessions) của học viên thêm 1
      await tx.student.update({
        where: { id: studentId },
        data: {
          makeupSessions: { increment: 1 }
        }
      });

      return req;
    });

    return NextResponse.json({ success: true, data: requestData }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
