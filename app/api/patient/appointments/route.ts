import { NextResponse } from 'next/server';

import { getToken } from '@/lib/auth';
import { verifyToken } from '@/lib/jwt';

import { appointmentsService } from '@/services/dashboard.service';

export async function GET() {
  try {
    const token = await getToken();

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized',
        },
        { status: 401 },
      );
    }

    const payload = verifyToken(token) as {
      id: string;
    };

    const appointments =
      await appointmentsService(payload.id);

    return NextResponse.json({
      success: true,
      data: appointments,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized',
      },
      { status: 401 },
    );
  }
}