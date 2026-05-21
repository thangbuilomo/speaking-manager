import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// API để AM gán học viên vào ca (Tạo Booking)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, studentId, isMakeup } = body;

    if (!sessionId || !studentId) {
      return NextResponse.json({ success: false, error: 'Thiếu sessionId hoặc studentId' }, { status: 400 });
    }

    // Tạo booking và cập nhật trạng thái session trong 1 transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Tạo booking
      const booking = await tx.booking.create({
        data: {
          sessionId,
          studentId,
          isMakeup: isMakeup || false,
        }
      });

      // 2. Cập nhật status của Session thành BOOKED
      await tx.session.update({
        where: { id: sessionId },
        data: { status: 'BOOKED' }
      });

      return booking;
    });

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    // Xử lý lỗi trùng lặp (Unique constraint failed)
    if (error.code === 'P2002') {
      return NextResponse.json({ success: false, error: 'Học viên đã được gán vào ca này rồi' }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
