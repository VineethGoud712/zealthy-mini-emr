import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/schemas/login.schema';
import { authenticate } from '@/services/auth.service';
import { createToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request data',
          errors: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { email, password } = validation.data;

    const patient = await authenticate(email, password);

    if (!patient) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 },
      );
    }

    const token = createToken({
      id: patient.id,
      email: patient.email,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
    });

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}