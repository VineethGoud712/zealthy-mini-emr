'use client';

import { Menu, Bell } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import PatientSidebar from './PatientSidebar';

interface Props {
  title: string;
}

export default function PatientTopbar({
  title,
}: Props) {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-white/90 px-6 backdrop-blur">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="rounded-lg p-2 hover:bg-slate-100 lg:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-72 p-0"
          >
            <PatientSidebar />
          </SheetContent>
        </Sheet>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="text-sm text-slate-500">
            Welcome back 👋
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="rounded-xl p-2 transition hover:bg-slate-100">
          <Bell className="h-5 w-5 text-slate-600" />
        </button>

        <Avatar className="h-11 w-11">
          <AvatarFallback>
            PT
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}