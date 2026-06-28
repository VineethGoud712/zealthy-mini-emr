import { HeartPulse } from 'lucide-react';

import { APP } from '@/lib/constants';

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg">
        <HeartPulse className="h-6 w-6" />
      </div>

      <div>
        <h1 className="text-lg font-bold tracking-tight">
          {APP.name}
        </h1>

        <p className="text-sm text-slate-500">
          {APP.tagline}
        </p>
      </div>
    </div>
  );
}