import { NextRequest, NextResponse } from 'next/server';

import {
  appointmentSchema,
} from '@/schemas/appointment.schema';

import {
  createAppointmentService,
} from '@/services/appointment.service';

export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.json();

    const validation =
      appointmentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        validation.error.flatten(),
        { status: 400 },
      );
    }

    const appointment =
      await createAppointmentService(
        validation.data,
      );

    return NextResponse.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}