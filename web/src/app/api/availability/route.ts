import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// API cho phép Giáo viên submit nhiều ca rảnh cùng lúc
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { teacherId, availabilities } = body;
    // availabilities là array gồm { startTime, endTime, duration }

    if (!teacherId || !availabilities || !Array.isArray(availabilities)) {
      return NextResponse.json({ success: false, error: 'Dữ liệu không hợp lệ' }, { status: 400 });
    }

    const sessionsData = availabilities.map((av: any) => ({
      teacherId,
      startTime: new Date(av.startTime),
      endTime: new Date(av.endTime),
      duration: av.duration,
      type: 'ONE_ON_ONE' as const,
      status: 'AVAILABLE' as const,
    }));

    const result = await prisma.session.createMany({
      data: sessionsData
    });

    return NextResponse.json({ success: true, count: result.count }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
