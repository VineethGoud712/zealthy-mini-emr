import { NextRequest, NextResponse } from 'next/server';

import {
  appointmentSchema,
} from '@/schemas/appointment.schema';

import {
  updateAppointmentService,
  deleteAppointmentService,
} from '@/services/appointment.service';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: Props,
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const validation =
      appointmentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        validation.error.flatten(),
        {
          status: 400,
        },
      );
    }

    const appointment =
      await updateAppointmentService(
        id,
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

export async function DELETE(
  request: NextRequest,
  { params }: Props,
) {
  try {
    const { id } = await params;

    await deleteAppointmentService(id);

    return NextResponse.json({
      success: true,
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