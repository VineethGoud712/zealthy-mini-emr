import { prisma } from '@/lib/prisma';

export async function findPatientByEmail(email: string) {
  return prisma.patient.findUnique({
    where: {
      email,
    },
  });
}