import Link from 'next/link';

interface Props {
  title: string;
  href: string;
}

export default function SectionHeader({
  title,
  href,
}: Props) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <Link
        href={href}
        className="font-medium text-blue-600 hover:underline"
      >
        View All →
      </Link>
    </div>
  );
}