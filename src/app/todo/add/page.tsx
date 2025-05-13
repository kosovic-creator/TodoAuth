/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useSession } from "next-auth/react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TodoSchema  from '@/types/index';
import { Label } from "@/components/ui/label";
import Toast from '@/components/ui/Toast';

export default function AddTodoForm() {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<number | ''>('');
  const [details, setDetails] = useState('');
  const [korisnik, setKorisnik] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession()
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (session?.user?.email) {
      setKorisnik(session.user.email || '');
    }
  }, [session]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Validate form data using Zod
    const result = TodoSchema.safeParse({ title, priority, details, korisnik });
    function showToast(message: string) {
      setToast(message);
      setTimeout(() => setToast(null), 1500); // Toast nestaje posle 2.5s
    }
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message).join(', ');
      setError(errorMessages);
      return;
    }
    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data), // Use validated data
      });
      if (response.ok) {
        setTitle('');
        setPriority('');
        setDetails('');
        setKorisnik('');
        setToast('Napomena je uspešno obrisan!');
        setTimeout(() => router.push('/todo'), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Greška u dodavanju napomene.');
      }
    } catch (err) {
      setError('Greška prilikom slanja podataka.');
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className=" w-full max-w-md mx-auto p-4 bg-white  border-gray-100 rounded">
        <h1 className="text-2xl font-bold-3 p-6 text-center">Dodaj Napomenu</h1>
        <div>
          <Label htmlFor="title" className="block font-medium p-2 border-gray-100">Zadatak</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2 w-full form-control form-control-lg"
            placeholder="Unesite naziv napomene"
          />
        </div>
        <div>
          <Label htmlFor="priority" className="block font-medium p-2  border-gray-100">Prioritet</Label>
          <Input
            id="priority"
            type="number"
            value={priority}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPriority(Number(e.target.value));
            }}
            className="border rounded p-2 w-full"
            placeholder="Unesite prioritet (1-5)"
            min={1}
            max={5}
          />
        </div>
        <div>
          <Label htmlFor="details" className="block font-medium p-2  border-gray-100">Detalji</Label>
          <Textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="Unesite detalje napomene"
            rows={4}
            maxLength={200} // Optional: Limit the number of characters
            minLength={3} // Optional: Minimum length for the details
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-black-700"
        // onClick={()=>setKorisnik(session?.user.name || '')}
        >
          Dodaj Napomenu
        </Button>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </form>

      <Toast message={toast} />
    </>
  );
}
