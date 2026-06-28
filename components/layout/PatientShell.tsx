'use client';

import { ReactNode } from 'react';

import PatientSidebar from './PatientSidebar';
import PatientTopbar from './PatientTopbar';

interface Props {
  title: string;
  children: ReactNode;
}

export default function PatientShell({
  title,
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Desktop Sidebar */}
        <PatientSidebar />

        {/* Main Content */}
        <div className="flex min-h-screen flex-1 flex-col">
          <PatientTopbar title={title} />

          <main className="flex-1 p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}