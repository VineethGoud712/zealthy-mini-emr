import { NextRequest, NextResponse } from 'next/server';

import {
  prescriptionSchema,
} from '@/schemas/prescription.schema';

import {
  createPrescriptionService,
} from '@/services/prescription.service';

export async function POST(
  request: NextRequest,
) {
  try {
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
      await createPrescriptionService(
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