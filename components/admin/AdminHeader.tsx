import Link from 'next/link';
import { UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  title: string;
  description: string;
}

export default function AdminHeader({
  title,
  description,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>

        <p className="mt-1 text-muted-foreground">
          {description}
        </p>
      </div>

      <Button asChild>
        <Link href="/admin/patients/new">
          <UserPlus className="mr-2 h-4 w-4" />
          New Patient
        </Link>
      </Button>
    </div>
  );
}