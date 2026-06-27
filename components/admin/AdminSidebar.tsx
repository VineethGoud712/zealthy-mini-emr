'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  LayoutDashboard,
  Users,
  PlusCircle,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    {
      href: '/admin',
      label: 'Patients',
      icon: Users,
    },
    {
      href: '/admin/patients/new',
      label: 'New Patient',
      icon: PlusCircle,
    },
  ];

  return (
    <aside className="w-64 border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">
          Zealthy EMR
        </h1>

        <p className="text-sm text-slate-500">
          Admin Portal
        </p>
      </div>

      <nav className="space-y-2 p-4">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg p-3 transition ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-slate-100'
              }`}
            >
              <Icon size={18} />

              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}