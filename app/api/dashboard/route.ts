import { NextResponse } from 'next/server';

import { getToken } from '@/lib/auth';
import { verifyToken } from '@/lib/jwt';

import { dashboardService } from '@/services/dashboard.service';

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

    const dashboard = await dashboardService(payload.id);

    return NextResponse.json({
      success: true,
      data: dashboard,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 401 },
    );
  }
}