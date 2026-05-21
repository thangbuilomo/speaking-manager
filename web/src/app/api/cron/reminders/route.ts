import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/mail';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'morning', 'before_30_min', or 'teacher_summary'
    
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
      
      const sentReminders = [];
      
      for (const session of todaySessions) {
        const studentEmails = session.bookings.map(b => b.student.email).filter(Boolean) as string[];
        const startTimeStr = session.startTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        
        if (studentEmails.length > 0) {
          const studentNames = session.bookings.map(b => b.student.name).join(', ');
          
          const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg: 8px;">
              <h2 style="color: #2563eb;">Nhắc lịch học Speaking hôm nay</h2>
              <p>Chào bạn <strong>${studentNames}</strong>,</p>
              <p>Hệ thống xin nhắc lịch học IELTS Speaking của bạn trong ngày hôm nay:</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 120px;">Thời gian:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${startTimeStr} hôm nay</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Giảng viên:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${session.teacher.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Hình thức:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">Speaking 1-1 Online</td>
                </tr>
              </table>
              <p style="color: #64748b; font-size: 14px;">Chúc bạn có buổi học tập hiệu quả. Vui lòng vào lớp đúng giờ!</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
              <p style="font-size: 12px; color: #94a3b8; text-align: center;">Email này được gửi tự động từ hệ thống IELTS Speaking Manager.</p>
            </div>
          `;

          await sendEmail({
            to: studentEmails,
            subject: `[Nhắc lịch] Lịch học IELTS Speaking hôm nay lúc ${startTimeStr}`,
            html: htmlContent
          });

          sentReminders.push({
            sessionId: session.id,
            recipients: studentEmails,
            time: startTimeStr
          });
        }
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Đã xử lý email nhắc lịch buổi sáng 07:00 thành công.', 
        sentCount: sentReminders.length,
        details: sentReminders
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

      const sentReminders = [];

      for (const session of upcomingSessions) {
        const studentEmails = session.bookings.map(b => b.student.email).filter(Boolean) as string[];
        const startTimeStr = session.startTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

        if (studentEmails.length > 0) {
          const studentNames = session.bookings.map(b => b.student.name).join(', ');

          const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg: 8px;">
              <h2 style="color: #dc2626;">Lớp học Speaking sắp bắt đầu sau 30 phút</h2>
              <p>Chào bạn <strong>${studentNames}</strong>,</p>
              <p>Lớp học Speaking của bạn với giảng viên <strong>${session.teacher.name}</strong> sẽ bắt đầu vào lúc <strong>${startTimeStr}</strong> (sau 30 phút nữa).</p>
              <p>Vui lòng chuẩn bị máy tính, tai nghe và kết nối internet ổn định để vào lớp học đúng giờ.</p>
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; margin: 15px 0;">
                <strong>Chi tiết lớp học:</strong><br>
                • Thời gian: ${startTimeStr} - ${session.startTime.getHours()}:${(session.startTime.getMinutes() + session.duration).toString().padStart(2, '0')}<br>
                • Giảng viên: ${session.teacher.name}<br>
              </div>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
              <p style="font-size: 12px; color: #94a3b8; text-align: center;">Hệ thống IELTS Speaking Manager.</p>
            </div>
          `;

          await sendEmail({
            to: studentEmails,
            subject: `[Khẩn cấp - 30 Phút] Lớp học Speaking của bạn sắp bắt đầu lúc ${startTimeStr}`,
            html: htmlContent
          });

          sentReminders.push({
            sessionId: session.id,
            recipients: studentEmails,
            time: startTimeStr
          });
        }
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Đã xử lý email nhắc nhở trước 30 phút thành công.', 
        sentCount: sentReminders.length,
        details: sentReminders
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

      const sentSummaries = [];

      for (const teacher of teachers) {
        if (teacher.sessionsAsTeacher.length > 0) {
          const sessionsListHtml = teacher.sessionsAsTeacher.map(s => {
            const dateStr = s.startTime.toLocaleDateString('vi-VN');
            const timeStr = s.startTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            const studentName = s.bookings.map(b => b.student.name).join(', ') || 'Chưa gán';
            return `<li><strong>${dateStr} (${timeStr})</strong>: Học viên ${studentName}</li>`;
          }).join('');

          const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg: 8px;">
              <h2 style="color: #0d9488;">Tổng hợp lịch dạy tuần tới</h2>
              <p>Chào Thầy/Cô <strong>${teacher.name}</strong>,</p>
              <p>Dưới đây là danh sách các ca học Speaking đã được xếp lịch dạy của Thầy/Cô trong vòng 7 ngày tới:</p>
              <ul style="line-height: 1.6; padding-left: 20px;">
                ${sessionsListHtml}
              </ul>
              <p>Thầy/Cô vui lòng cập nhật nhận xét và điểm IELTS của học viên ngay sau khi buổi học kết thúc trên Dashboard.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
              <p style="font-size: 12px; color: #94a3b8; text-align: center;">Hệ thống IELTS Speaking Manager.</p>
            </div>
          `;

          await sendEmail({
            to: teacher.email,
            subject: `[Lịch dạy] Tổng hợp lịch dạy tuần mới của Thầy/Cô ${teacher.name}`,
            html: htmlContent
          });

          sentSummaries.push({
            teacherId: teacher.id,
            email: teacher.email,
            sessionsCount: teacher.sessionsAsTeacher.length
          });
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Đã xử lý email tổng hợp lịch dạy cho giáo viên thành công.',
        sentCount: sentSummaries.length,
        details: sentSummaries
      });

    } else {
      return NextResponse.json({ success: false, error: 'Thiếu hoặc sai tham số type (morning / before_30_min / teacher_summary)' }, { status: 400 });
    }

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
