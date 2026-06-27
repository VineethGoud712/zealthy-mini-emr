import { PrismaClient, RepeatSchedule, RefillSchedule } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

type SeedData = {
  users: {
    id: number;
    name: string;
    email: string;
    password: string;
    appointments: {
      id: number;
      provider: string;
      datetime: string;
      repeat: string;
    }[];
    prescriptions: {
      id: number;
      medication: string;
      dosage: string;
      quantity: number;
      refill_on: string;
      refill_schedule: string;
    }[];
  }[];
  medications: string[];
  dosages: string[];
};

async function main() {
  console.log('🌱 Starting database seed...');

  // Read JSON file
  const filePath = path.join(process.cwd(), 'prisma', 'data.json');
  const rawData = await fs.readFile(filePath, 'utf-8');
  const data: SeedData = JSON.parse(rawData);

  // Clean database (child tables first)
  await prisma.prescription.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.medication.deleteMany();

  console.log('🗑️ Old data removed');

  // Insert medications
  const medicationMap = new Map<string, string>();

  for (const medicationName of data.medications) {
    const medication = await prisma.medication.create({
      data: {
        name: medicationName,
      },
    });

    medicationMap.set(medicationName, medication.id);
  }

  console.log('💊 Medications inserted');

  // Insert patients
  for (const user of data.users) {
    const [firstName, ...rest] = user.name.split(' ');
    const lastName = rest.join(' ');

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const patient = await prisma.patient.create({
      data: {
        firstName,
        lastName,
        email: user.email,
        passwordHash: hashedPassword,
      },
    });

    // Appointments
    for (const appointment of user.appointments) {
      await prisma.appointment.create({
        data: {
          patientId: patient.id,
          providerName: appointment.provider,
          scheduledAt: new Date(appointment.datetime),
          repeatSchedule:
            appointment.repeat.toUpperCase() as RepeatSchedule,
        },
      });
    }

    // Prescriptions
    for (const prescription of user.prescriptions) {
      const medicationId = medicationMap.get(prescription.medication);

      if (!medicationId) continue;

      await prisma.prescription.create({
        data: {
          patientId: patient.id,
          medicationId,
          dosage: prescription.dosage,
          quantity: prescription.quantity,
          refillDate: new Date(prescription.refill_on),
          refillSchedule:
            prescription.refill_schedule.toUpperCase() as RefillSchedule,
        },
      });
    }
  }

  console.log('👤 Patients inserted');
  console.log('📅 Appointments inserted');
  console.log('💉 Prescriptions inserted');

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });