import { Loader2 } from 'lucide-react';

interface Props {
  title?: string;
}

export default function PageLoader({
  title = 'Loading...',
}: Props) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />

      <p className="text-sm text-slate-500">
        {title}
      </p>
    </div>
  );
}