import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = parseInt(process.env.SMTP_PORT || '465');
const secure = process.env.SMTP_SECURE !== 'false'; // Mặc định là true (cổng 465)

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: {
    user: process.env.SMTP_USER, // ieltsonline@ducthangbui.com
    pass: process.env.SMTP_PASS, // Mật khẩu ứng dụng (App Password) từ Google
  },
  tls: {
    // Tránh lỗi chứng chỉ trên một số môi trường
    rejectUnauthorized: false
  }
});

interface SendMailParams {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendMailParams) {
  const fromEmail = process.env.SMTP_USER || 'ieltsonline@ducthangbui.com';
  
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(`[Mock Email Sent] To: ${Array.isArray(to) ? to.join(', ') : to} | Subject: ${subject}`);
    return { success: true, mock: true };
  }

  try {
    const recipient = Array.isArray(to) ? to.join(', ') : to;
    const info = await transporter.sendMail({
      from: `"IELTS Speaking Manager" <${fromEmail}>`,
      to: recipient,
      subject,
      html,
    });
    
    console.log(`[Email Sent] Message ID: ${info.messageId} to ${recipient}`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`[Email Failed] Lỗi gửi mail đến ${to}:`, error);
    throw error;
  }
}
