'use client';

import { useParams } from 'next/navigation';

export default function Page() {
  const { listingId } = useParams();

  return (
    <div>{listingId}</div>
  );
}