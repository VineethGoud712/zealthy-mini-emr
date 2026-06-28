import { addDays } from 'date-fns';

import { prisma } from '@/lib/prisma';

export async function getPatientDashboard(
  patientId: string,
) {
  const today = new Date();
  const nextWeek = addDays(today, 7);

  return prisma.patient.findUnique({
    where: {
      id: patientId,
    },
    include: {
      appointments: {
        where: {
          scheduledAt: {
            gte: today,
            lte: nextWeek,
          },
        },
        orderBy: {
          scheduledAt: 'asc',
        },
      },

      prescriptions: {
        where: {
          refillDate: {
            gte: today,
            lte: nextWeek,
          },
        },
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

export async function getPatientAppointments(
  patientId: string,
) {
  return prisma.appointment.findMany({
    where: {
      patientId,
      scheduledAt: {
        gte: new Date(),
      },
    },
    orderBy: {
      scheduledAt: 'asc',
    },
  });
}

export async function getPatientPrescriptions(
  patientId: string,
) {
  return prisma.prescription.findMany({
    where: {
      patientId,
    },
    include: {
      medication: true,
    },
    orderBy: {
      refillDate: 'asc',
    },
  });
}