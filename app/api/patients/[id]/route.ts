import { NextRequest, NextResponse } from 'next/server';
import { updatePatientSchema } from '@/schemas/patient.schema';
import { updatePatientService } from '@/services/patient.service';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const validation = updatePatientSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    const patient = await updatePatientService(
      id,
      validation.data,
    );

    return NextResponse.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to update patient.',
      },
      { status: 500 },
    );
  }
}