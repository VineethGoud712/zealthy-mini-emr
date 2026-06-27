import bcrypt from 'bcryptjs';

import {
  createPatient,
  getPatientById,
  updatePatient,
} from '@/repositories/patient.repository';

import type {
  CreatePatientInput,
  UpdatePatientInput,
} from '@/schemas/patient.schema';

export async function createPatientService(
  patient: CreatePatientInput,
) {
  const passwordHash = await bcrypt.hash(
    patient.password,
    10,
  );

  return createPatient({
    firstName: patient.firstName,
    lastName: patient.lastName,
    email: patient.email,
    phone: patient.phone,
    gender: patient.gender,
    passwordHash,
  });
}

export async function updatePatientService(
  id: string,
  patient: UpdatePatientInput,
) {
  return updatePatient(id, {
    firstName: patient.firstName,
    lastName: patient.lastName,
    email: patient.email,
    phone: patient.phone,
    gender: patient.gender,
  });
}

export async function getPatientService(id: string) {
  return getPatientById(id);
}