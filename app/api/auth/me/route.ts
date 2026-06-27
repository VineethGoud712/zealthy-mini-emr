import { NextResponse } from 'next/server';
import { getToken } from '@/lib/auth';
import { verifyToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const token = await getToken();

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const payload = verifyToken(token) as {
      id: string;
      email: string;
    };

    const patient = await prisma.patient.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        dateOfBirth: true,
        gender: true,
        status: true,
      },
    });

    if (!patient) {
      return NextResponse.json(
        {
          success: false,
          message: 'Patient not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Invalid or expired token',
      },
      { status: 401 }
    );
  }
}