import bcrypt from 'bcryptjs';

import { findPatientByEmail } from '@/repositories/patient.repository';

export async function authenticate(
  email: string,
  password: string,
) {
  const patient = await findPatientByEmail(email);

  if (!patient) {
    return null;
  }

  const validPassword = await bcrypt.compare(
    password,
    patient.passwordHash,
  );

  if (!validPassword) {
    return null;
  }

  return patient;
}