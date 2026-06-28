'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  HeartPulse,
  LayoutDashboard,
  PlusCircle,
  Users,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    {
      href: '/admin',
      label: 'Patients',
      icon: LayoutDashboard,
    },
    {
      href: '/admin/patients/new',
      label: 'New Patient',
      icon: PlusCircle,
    },
  ];

  return (
    <aside className="hidden w-72 shrink-0 border-r bg-white lg:flex lg:flex-col">

      {/* Logo */}

      <div className="border-b p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">

            <HeartPulse className="h-7 w-7" />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-slate-900">
              Zealthy
            </h1>

            <p className="text-sm text-slate-500">
              EMR Admin Portal
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-3 p-6">

        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Navigation
        </p>

        {links.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-4 rounded-2xl px-4 py-4 transition-all duration-200 ${
                active
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  active
                    ? 'text-white'
                    : 'text-slate-500 group-hover:text-blue-600'
                }`}
              />

              <span className="font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="border-t p-6">

        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-5 text-white">

          <Users className="mb-3 h-8 w-8" />

          <h3 className="font-semibold">
            Healthcare EMR
          </h3>

          <p className="mt-2 text-sm text-blue-100">
            Manage patients, appointments,
            and prescriptions securely.
          </p>

        </div>

      </div>

    </aside>
  );
}