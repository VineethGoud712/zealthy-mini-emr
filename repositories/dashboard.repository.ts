// import { prisma } from '@/lib/prisma';
// import { addDays } from 'date-fns';

// export async function getPatientDashboard(patientId: string) {
//   const today = new Date();
//   const nextWeek = addDays(today, 7);

//   const patient = await prisma.patient.findUnique({
//     where: {
//       id: patientId,
//     },
//     include: {
//       appointments: {
//         where: {
//           scheduledAt: {
//             gte: today,
//             lte: nextWeek,
//           },
//         },
//         orderBy: {
//           scheduledAt: 'asc',
//         },
//       },

//       prescriptions: {
//         where: {
//           refillDate: {
//             gte: today,
//             lte: nextWeek,
//           },
//         },
//         include: {
//           medication: true,
//         },
//         orderBy: {
//           refillDate: 'asc',
//         },
//       },
//     },
//   });

//   return patient;
// }


import { prisma } from '@/lib/prisma';
import { addDays } from 'date-fns';

export async function getPatientDashboard(patientId: string) {
  // Development flag:
  // false = assignment behavior (next 7 days)
  // true = show all seeded data
  const SHOW_ALL_DATA = true;

  const today = new Date();
  const nextWeek = addDays(today, 7);

  const patient = await prisma.patient.findUnique({
    where: {
      id: patientId,
    },
    include: {
      appointments: {
        ...(SHOW_ALL_DATA
          ? {}
          : {
              where: {
                scheduledAt: {
                  gte: today,
                  lte: nextWeek,
                },
              },
            }),
        orderBy: {
          scheduledAt: 'asc',
        },
      },

      prescriptions: {
        ...(SHOW_ALL_DATA
          ? {}
          : {
              where: {
                refillDate: {
                  gte: today,
                  lte: nextWeek,
                },
              },
            }),
        include: {
          medication: true,
        },
        orderBy: {
          refillDate: 'asc',
        },
      },
    },
  });

  return patient;
}