import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import * as crypto from 'crypto';

// API Đăng nhập cơ bản (Giai đoạn 1)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Vui lòng nhập email và mật khẩu' }, { status: 400 });
    }

    // Tìm user
    let user = await prisma.user.findUnique({
      where: { email }
    });

    let role = user?.role;
    let name = user?.name;
    let id = user?.id;

    if (!user) {
      // Nếu không phải admin/teacher/am, kiểm tra xem có phải học viên không
      const student = await prisma.student.findUnique({
        where: { email }
      });

      if (!student) {
        return NextResponse.json({ success: false, error: 'Tài khoản không tồn tại' }, { status: 404 });
      }

      if (student.password !== password) {
        return NextResponse.json({ success: false, error: 'Mật khẩu không chính xác' }, { status: 401 });
      }

      id = student.id;
      name = student.name;
      role = 'STUDENT';
    } else {
      if (user.password !== password) {
        return NextResponse.json({ success: false, error: 'Mật khẩu không chính xác' }, { status: 401 });
      }
    }

    // Tạo token đơn giản cho demo (thực tế dùng JWT)
    const mockToken = crypto.randomBytes(32).toString('hex');

    return NextResponse.json({ 
      success: true, 
      data: {
        token: mockToken,
        user: {
          id,
          name,
          email,
          role
        }
      } 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
