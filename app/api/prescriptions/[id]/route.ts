import { NextRequest, NextResponse } from 'next/server';

import {
  prescriptionSchema,
} from '@/schemas/prescription.schema';

import {
  updatePrescriptionService,
  deletePrescriptionService,
} from '@/services/prescription.service';

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
      prescriptionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        validation.error.flatten(),
        {
          status: 400,
        },
      );
    }

    const prescription =
      await updatePrescriptionService(
        id,
        validation.data,
      );

    return NextResponse.json({
      success: true,
      data: prescription,
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

    await deletePrescriptionService(id);

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