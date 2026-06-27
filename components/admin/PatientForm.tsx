'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  createPatientSchema,
  type CreatePatientInput,
} from '@/schemas/patient.schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PatientForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePatientInput>({
    resolver: zodResolver(createPatientSchema),
  });

  async function onSubmit(data: CreatePatientInput) {
    try {
      setLoading(true);
      setServerError('');

      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.message || 'Unable to create patient.');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch (error) {
      console.error(error);
      setServerError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl rounded-lg border bg-white p-8 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Create New Patient
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="grid grid-cols-2 gap-5">
          <div>
            <Label>First Name</Label>

            <Input {...register('firstName')} />

            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <Label>Last Name</Label>

            <Input {...register('lastName')} />

            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label>Email</Label>

          <Input
            type="email"
            {...register('email')}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label>Password</Label>

          <Input
            type="password"
            {...register('password')}
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label>Phone</Label>

          <Input
            placeholder="(555) 123-4567"
            {...register('phone')}
          />
        </div>

        <div>
          <Label>Gender</Label>

          <select
            {...register('gender')}
            className="w-full rounded-md border p-2"
            defaultValue=""
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {serverError && (
          <div className="rounded-md bg-red-100 p-3 text-red-600">
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading
            ? 'Creating Patient...'
            : 'Create Patient'}
        </Button>
      </form>
    </div>
  );
}