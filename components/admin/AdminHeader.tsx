'use client';

export default function AdminHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h2 className="text-2xl font-bold">
          Patient Management
        </h2>

        <p className="text-sm text-slate-500">
          Mini EMR Dashboard
        </p>
      </div>

      <div className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium">
        Admin
      </div>
    </header>
  );
}