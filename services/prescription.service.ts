import {
  createPrescription,
  updatePrescription,
  deletePrescription,
} from '@/repositories/prescription.repository';

import type {
  PrescriptionInput,
} from '@/schemas/prescription.schema';

export async function createPrescriptionService(
  prescription: PrescriptionInput,
) {
  return createPrescription({
    patientId: prescription.patientId,

    medicationId: prescription.medicationId,

    dosage: prescription.dosage,

    quantity: prescription.quantity,

    refillDate: new Date(
      prescription.refillDate,
    ),

    refillSchedule:
      prescription.refillSchedule,

    refillUntil:
      prescription.refillUntil
        ? new Date(
            prescription.refillUntil,
          )
        : null,

    notes: prescription.notes,
  });
}

export async function updatePrescriptionService(
  id: string,
  prescription: PrescriptionInput,
) {
  return updatePrescription(id, {
    medicationId:
      prescription.medicationId,

    dosage: prescription.dosage,

    quantity: prescription.quantity,

    refillDate: new Date(
      prescription.refillDate,
    ),

    refillSchedule:
      prescription.refillSchedule,

    refillUntil:
      prescription.refillUntil
        ? new Date(
            prescription.refillUntil,
          )
        : null,

    notes: prescription.notes,
  });
}

export async function deletePrescriptionService(
  id: string,
) {
  return deletePrescription(id);
}