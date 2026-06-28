import { prisma } from "@/lib/prisma";

export async function findPatientByEmail(
  email: string,
) {
  return prisma.patient.findUnique({
    where: {
      email,
    },
  });
}

export async function createPatient(data: {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  phone?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
}) {
  return prisma.patient.create({
    data,
  });
}

export async function getPatientById(id: string) {
  return prisma.patient.findUnique({
    where: {
      id,
    },
    include: {
      appointments: {
        orderBy: {
          scheduledAt: 'asc',
        },
      },
      prescriptions: {
        include: {
          medication: true,
        },
        orderBy: {
          refillDate: 'asc',
        },
      },
    },
  });
}


export async function updatePatient(
  id: string,
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
  },
) {
  return prisma.patient.update({
    where: {
      id,
    },
    data,
  });
}