import { prisma } from '@/lib/prisma';

import { RefillSchedule } from '@prisma/client';

export interface PrescriptionRepositoryInput {
  patientId: string;

  medicationId: string;

  dosage: string;

  quantity: number;

  refillDate: Date;

  refillSchedule: RefillSchedule;

  refillUntil?: Date | null;

  notes?: string | null;
}

export async function createPrescription(
  data: PrescriptionRepositoryInput,
) {
  return prisma.prescription.create({
    data,
  });
}

export async function updatePrescription(
  id: string,
  data: Partial<PrescriptionRepositoryInput>,
) {
  return prisma.prescription.update({
    where: {
      id,
    },
    data,
  });
}

export async function deletePrescription(
  id: string,
) {
  return prisma.prescription.delete({
    where: {
      id,
    },
  });
}

export async function getPrescriptionById(
  id: string,
) {
  return prisma.prescription.findUnique({
    where: {
      id,
    },
    include: {
      medication: true,
    },
  });
}