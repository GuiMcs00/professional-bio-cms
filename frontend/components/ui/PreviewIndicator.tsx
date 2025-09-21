'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function PreviewIndicator() {
  const searchParams = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';

  if (!isPreview) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black px-4 py-2 text-center text-sm font-medium">
      <span>Preview Mode Active</span>
      <Link 
        href="/api/disable-preview"
        className="ml-4 underline hover:no-underline"
      >
        Exit Preview
      </Link>
    </div>
  );
}