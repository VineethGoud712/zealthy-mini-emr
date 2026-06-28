import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  value: number | string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
        <Icon className="h-7 w-7 text-blue-600" />
      </div>

      <h2 className="text-3xl font-bold">
        {value}
      </h2>

      <p className="mt-2 text-slate-500">
        {title}
      </p>
    </div>
  );
}