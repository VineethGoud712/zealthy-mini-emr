import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again.',
  onRetry,
}: Props) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 rounded-lg border border-dashed">
      <AlertTriangle className="h-14 w-14 text-red-500" />

      <div className="text-center">
        <h2 className="text-2xl font-semibold">
          {title}
        </h2>

        <p className="mt-2 text-slate-500">
          {description}
        </p>
      </div>

      {onRetry && (
        <Button onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}