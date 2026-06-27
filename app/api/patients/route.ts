import { NextRequest, NextResponse } from 'next/server';

import { createPatientSchema } from '@/schemas/patient.schema';

import { createPatientService } from '@/services/patient.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = createPatientSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const patient = await createPatientService(
      validation.data,
    );

    return NextResponse.json({
      success: true,
      patient,
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