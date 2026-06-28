'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Pill,
} from 'lucide-react';

import Logo from './Logo';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Appointments',
    href: '/appointments',
    icon: CalendarDays,
  },
  {
    name: 'Prescriptions',
    href: '/prescriptions',
    icon: Pill,
  },
];

export default function PatientSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col border-r bg-white lg:flex">
      <div className="border-b p-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                active
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="h-5 w-5" />

              <span className="font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50">
          <LogOut className="h-5 w-5" />

          Logout
        </button>
      </div>
    </aside>
  );
}