import { HeartPulse } from 'lucide-react';

import LoginForm from '@/components/auth/LoginForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}

        <section className="hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-16 text-white lg:flex lg:flex-col lg:justify-between">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

              <HeartPulse className="h-10 w-10" />

            </div>

            <div>

              <h1 className="text-3xl font-bold">
                Zealthy
              </h1>

              <p className="text-blue-100">
                Healthcare Portal
              </p>

            </div>

          </div>

          <div className="max-w-lg">

            <h2 className="text-5xl font-bold leading-tight">
              Manage your healthcare with confidence.
            </h2>

            <p className="mt-6 text-lg text-blue-100 leading-8">
              Securely access your appointments,
              prescriptions, and medical records from
              anywhere. Built with modern technology to
              keep your health information organized and
              accessible.
            </p>

          </div>

          <div className="text-blue-100">
            © 2026 Zealthy Healthcare
          </div>

        </section>

        {/* Right Side */}

        <section className="flex items-center justify-center p-6 lg:p-16">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}

            <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">

              <div className="rounded-2xl bg-blue-600 p-3 text-white">

                <HeartPulse className="h-7 w-7" />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Zealthy
                </h2>

                <p className="text-sm text-slate-500">
                  Healthcare Portal
                </p>

              </div>

            </div>

            <LoginForm />

          </div>

        </section>

      </div>
    </main>
  );
}