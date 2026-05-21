import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// API để lấy danh sách ca học
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const teacherId = searchParams.get('teacherId');
    const status = searchParams.get('status');

    const filter: any = {};
    if (teacherId) filter.teacherId = teacherId;
    if (status) filter.status = status;

    const sessions = await prisma.session.findMany({
      where: filter,
      include: {
        teacher: { select: { name: true, email: true } },
        bookings: {
          include: { student: { select: { name: true, studentCode: true } } }
        }
      },
      orderBy: { startTime: 'asc' }
    });

    return NextResponse.json({ success: true, data: sessions });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// API để AM tạo ca học mới
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { startTime, endTime, duration, type, teacherId, createdBy } = body;

    // Validate
    if (!startTime || !endTime || !duration || !teacherId) {
      return NextResponse.json({ success: false, error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    const session = await prisma.session.create({
      data: {
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        duration,
        type: type || 'ONE_ON_ONE',
        status: 'AVAILABLE',
        teacherId,
        createdBy,
      }
    });

    return NextResponse.json({ success: true, data: session }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
