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
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ success: false, error: 'Tài khoản không tồn tại' }, { status: 404 });
    }

    // Todo: Ở môi trường thực tế cần dùng bcrypt.compare, ở đây check plain text hoặc simple hash cho demo
    if (user.password !== password) {
      return NextResponse.json({ success: false, error: 'Mật khẩu không chính xác' }, { status: 401 });
    }

    // Tạo token đơn giản cho demo (thực tế dùng JWT)
    const mockToken = crypto.randomBytes(32).toString('hex');

    return NextResponse.json({ 
      success: true, 
      data: {
        token: mockToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      } 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
