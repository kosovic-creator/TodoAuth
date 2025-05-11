'use client';
import { useParams } from 'next/navigation';

export default function MyComponent() {
  const params = useParams();
  const id = params?.id;

  return (
    <div>
      <p>param: {id}</p>
    </div>
  );
}
