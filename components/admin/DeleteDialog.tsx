'use client';

import { useRouter } from 'next/navigation';

import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface Props {
  url: string;

  title: string;

  description: string;

  successRedirect?: string;
}

export default function DeleteDialog({
  url,
  title,
  description,
  successRedirect,
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      toast.error('Delete failed.');
      return;
    }

    if (successRedirect) {
      router.push(successRedirect);
    }

    toast.success('Deleted successfully.');
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}