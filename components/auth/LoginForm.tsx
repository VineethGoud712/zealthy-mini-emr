'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Lock,
  Mail,
} from 'lucide-react';

import {
  loginSchema,
  type LoginInput,
} from '@/schemas/login.schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [serverError, setServerError] =
    useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    try {
      setLoading(true);
      setServerError('');

      const response = await fetch(
        '/api/auth/login',
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
        setServerError(
          result.message ??
            'Invalid email or password.',
        );

        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setServerError(
        'Something went wrong.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="overflow-hidden rounded-[32px] border-0 shadow-2xl">

      <CardContent className="p-5 ">

        <div className="mb-5 text-center">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">

            <Lock className="h-6 w-6" />

          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-500">
            Sign in to access your patient portal.
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <div className="space-y-2">

            <Label>Email Address</Label>

            <div className="relative">

              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <Input
                type="email"
                placeholder="john@example.com"
                className="h-12 rounded-xl pl-12"
                {...register('email')}
              />

            </div>

            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}

          </div>

          <div className="space-y-2">

            <Label>Password</Label>

            <div className="relative">

              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <Input
                type="password"
                placeholder="••••••••"
                className="h-12 rounded-xl pl-12"
                {...register('password')}
              />

            </div>

            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}

          </div>

          {serverError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {serverError}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-base font-semibold transition-all hover:scale-[1.02] hover:from-blue-700 hover:to-cyan-600"
          >
            {loading
              ? 'Signing In...'
              : 'Sign In'}
          </Button>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">


            <p className="mt-2 text-sm text-slate-600">
              Login using the patient account
              created from the EMR Admin Portal.
            </p>

          </div>

        </form>

      </CardContent>

    </Card>
  );
}