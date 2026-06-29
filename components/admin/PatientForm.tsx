'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  User,
  Mail,
  Lock,
  Phone,
  Users,
} from 'lucide-react';

import {
  createPatientSchema,
  type CreatePatientInput,
} from '@/schemas/patient.schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Card,
  CardContent,

} from '@/components/ui/card';

export default function PatientForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [serverError, setServerError] =
    useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePatientInput>({
    resolver: zodResolver(
      createPatientSchema,
    ),
  });

  async function onSubmit(
    data: CreatePatientInput,
  ) {
    try {
      setLoading(true);
      setServerError('');

      const response = await fetch(
        '/api/patients',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      const result =
        await response.json();

      if (!response.ok) {
        const message =
          result.message ??
          'Unable to create patient.';

        setServerError(message);

        toast.error(message);

        return;
      }

      toast.success(
        'Patient created successfully.',
      );

      router.push('/admin');

      router.refresh();
    } catch (error) {
      console.error(error);

      setServerError(
        'Something went wrong.',
      );

      toast.error(
        'Something went wrong.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="rounded-[32px] border-0 shadow-xl">


      <CardContent>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >

          <div className="grid gap-6 md:grid-cols-2">

            {/* First Name */}

            <div className="space-y-2">

              <Label>
                First Name
              </Label>

              <div className="relative">

                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  {...register(
                    'firstName',
                  )}
                  className="h-12 rounded-xl pl-12"
                  placeholder="John"
                />

              </div>

              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {
                    errors.firstName
                      .message
                  }
                </p>
              )}

            </div>

            {/* Last Name */}

            <div className="space-y-2">

              <Label>
                Last Name
              </Label>

              <div className="relative">

                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  {...register(
                    'lastName',
                  )}
                  className="h-12 rounded-xl pl-12"
                  placeholder="Doe"
                />

              </div>

              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {
                    errors.lastName
                      .message
                  }
                </p>
              )}

            </div>

          </div>

          {/* Email */}

          <div className="space-y-2">

            <Label>
              Email Address
            </Label>

            <div className="relative">

              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <Input
                type="email"
                {...register('email')}
                className="h-12 rounded-xl pl-12"
                placeholder="john@example.com"
              />

            </div>

            {errors.email && (
              <p className="text-sm text-red-500">
                {
                  errors.email.message
                }
              </p>
            )}

          </div>

          {/* Password */}

          <div className="space-y-2">

            <Label>Password</Label>

            <div className="relative">

              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <Input
                type="password"
                {...register(
                  'password',
                )}
                className="h-12 rounded-xl pl-12"
                placeholder="••••••••"
              />

            </div>

            {errors.password && (
              <p className="text-sm text-red-500">
                {
                  errors.password
                    .message
                }
              </p>
            )}

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Phone */}

            <div className="space-y-2">

              <Label>Phone</Label>

              <div className="relative">

                <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                  {...register(
                    'phone',
                  )}
                  className="h-12 rounded-xl pl-12"
                  placeholder="(555) 123-4567"
                />

              </div>

            </div>

            {/* Gender */}

            <div className="space-y-2">

              <Label>
                Gender
              </Label>

              <div className="relative">

                <Users className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <select
                  {...register(
                    'gender',
                  )}
                  defaultValue=""
                  className="h-12 w-full rounded-xl border bg-white pl-12 pr-4"
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="MALE">
                    Male
                  </option>

                  <option value="FEMALE">
                    Female
                  </option>

                  <option value="OTHER">
                    Other
                  </option>

                </select>

              </div>

            </div>

          </div>

          {serverError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
              {serverError}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl text-base"
          >
            {loading
              ? 'Creating Patient...'
              : 'Create Patient'}
          </Button>

        </form>

      </CardContent>

    </Card>
  );
}