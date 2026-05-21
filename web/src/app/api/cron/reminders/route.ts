import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Cron API Endpoint to trigger reminders
// This API can be scheduled via Vercel Cron or any external cron service
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'morning' (7:00 AM) or 'before_30_min'
    
    const now = new Date();
    
    if (type === 'morning') {
      // 1. Nhắc lịch buổi sáng lúc 07:00 cho các ca học diễn ra hôm nay
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

      const todaySessions = await prisma.session.findMany({
        where: {
          startTime: {
            gte: startOfDay,
            lte: endOfDay
          },
          status: 'BOOKED'
        },
        include: {
          teacher: true,
          bookings: {
            include: { student: true }
          }
        }
      });

      console.log(`[Cron Morning Reminder] Found ${todaySessions.length} sessions today.`);
      
      const sentReminders = todaySessions.map(session => {
        const studentEmails = session.bookings.map(b => b.student.email).filter(Boolean);
        const startTimeStr = session.startTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        
        // Mock gửi mail bằng log console
        console.log(`✉️ Gửi email nhắc lịch buổi sáng tới Học viên: ${studentEmails.join(', ')} | Ca: ${startTimeStr} với ${session.teacher.name}`);
        
        return {
          sessionId: session.id,
          recipientCount: studentEmails.length,
          type: 'MORNING_REMINDER'
        };
      });

      return NextResponse.json({ 
        success: true, 
        message: 'Đã xử lý email nhắc lịch buổi sáng 07:00 thành công.', 
        sent: sentReminders 
      });

    } else if (type === 'before_30_min') {
      // 2. Nhắc trước 30 phút (tìm các ca bắt đầu trong 30 đến 45 phút tới)
      const future30Min = new Date(now.getTime() + 30 * 60 * 1000);
      const future45Min = new Date(now.getTime() + 45 * 60 * 1000);

      const upcomingSessions = await prisma.session.findMany({
        where: {
          startTime: {
            gte: future30Min,
            lte: future45Min
          },
          status: 'BOOKED'
        },
        include: {
          teacher: true,
          bookings: {
            include: { student: true }
          }
        }
      });

      console.log(`[Cron 30m Reminder] Found ${upcomingSessions.length} sessions starting in 30-45 mins.`);

      const sentReminders = upcomingSessions.map(session => {
        const studentEmails = session.bookings.map(b => b.student.email).filter(Boolean);
        const startTimeStr = session.startTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

        console.log(`✉️ Gửi email nhắc trước 30 phút tới Học viên: ${studentEmails.join(', ')} | Sắp bắt đầu lúc: ${startTimeStr}`);

        return {
          sessionId: session.id,
          recipientCount: studentEmails.length,
          type: '30_MIN_REMINDER'
        };
      });

      return NextResponse.json({ 
        success: true, 
        message: 'Đã xử lý email nhắc nhở trước 30 phút thành công.', 
        sent: sentReminders 
      });

    } else if (type === 'teacher_summary') {
      // 3. Gửi email tổng hợp lịch dạy cho giáo viên trong tuần tới
      const startOfWeek = new Date();
      const endOfWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const teachers = await prisma.user.findMany({
        where: { role: 'TEACHER', isActive: true },
        include: {
          sessionsAsTeacher: {
            where: {
              startTime: {
                gte: startOfWeek,
                lte: endOfWeek
              },
              status: 'BOOKED'
            },
            include: {
              bookings: { include: { student: true } }
            }
          }
        }
      });

      console.log(`[Cron Teacher Summary] Found ${teachers.length} active teachers.`);

      const sentSummaries = teachers.map(teacher => {
        const sessionCount = teacher.sessionsAsTeacher.length;
        console.log(`✉️ Gửi email tổng hợp tới Giáo viên: ${teacher.email} | Số ca dạy tuần tới: ${sessionCount}`);
        
        return {
          teacherId: teacher.id,
          email: teacher.email,
          sessionsCount: sessionCount
        };
      });

      return NextResponse.json({
        success: true,
        message: 'Đã xử lý email tổng hợp lịch dạy cho giáo viên thành công.',
        sent: sentSummaries
      });

    } else {
      return NextResponse.json({ success: false, error: 'Thiếu hoặc sai tham số type (morning / before_30_min / teacher_summary)' }, { status: 400 });
    }

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
