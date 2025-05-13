/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import TodoUpdateSchema  from '@/types/todo_update';
import { Input } from "@/components/ui/input";

import { useParams } from 'next/navigation';
export default function UpdatePage() {
    const [id, setId] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [details, seDetails] = useState('');
    const [priority, setPriority] = useState(1);
    const [done, setDone] = useState(false);
    const [message, setMessage] = useState('');
    const [toast, setToast] = useState<string | null>(null);
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const params = useParams();
    const idd = params?.id;

    useEffect(() => {
        if (typeof idd === 'string') {
            setId(idd);
        } else {
            setId(null); // Handle the case where idd is not a string
        }
    }, [idd]);
    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await fetch(`/api/todo/${id}`, {
                    method: "GET",
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    setMessage(errorData.message || "Greška u učitavanji podataka.");
                    return;
                }
                const data = await response.json();
                setTitle(data.title);
                seDetails(data.details);

                setPriority(data.priority);
                setDone(data.done);
            } catch (err) {
                setMessage("Greška.");
                console.error(err);
            }
        };

        if (id) {
            fetchTodo();
        }
    }, [id]);
    function showToast(message: string) {
        setToast(message);
        setTimeout(() => setToast(null), 1500); // Toast nestaje posle 2.5s
      }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate form data using Zod
        const result = TodoUpdateSchema.safeParse({ title, priority, details });

        if (!result.success) {
            // Map errors to display them
            const errorMessages = result.error.errors.map((err) => err.message).join(', ');
            setError(errorMessages);
            return;
        }

        try {
            const response = await fetch(`/api/todo/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, priority, details, done }),
            });

            if (response.ok) {
                const updatedTodo = await response.json();
                setMessage('Izmena je uspešno dodata!');
                showToast('Napomena je uspešno izmjenjena!');
                console.log('Updated Todo:', updatedTodo);
                setTimeout(() => router.push('/todo'), 2000);
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.error || 'Greška pri izmjeni.'}`);
                setTimeout(() => router.push('/todo'), 2000);
            }
        } catch (error) {
            setMessage('An unexpected error occurred.');
            console.error(error);
        }
    };
    return (
        <div className=" w-full max-w-md mx-auto p-4 bg-white  rounded">
            <h4  className="text-2xl font-bold-3 p-6 text-center ">Izmjeni</h4>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-2 border-gray-100 rounded pl-4 pr-4">
                <div className="mb-4 ">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Zadatak:</label>
                    <Input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Unesite naziv napomene"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700">Detailji:</label>
                    <Input
                        type="text"
                        id="details"
                        value={details}
                        onChange={(e) => seDetails(e.target.value)}
                        // required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Unesite detalje napomene"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prioritet:</label>
                    <Input
                        type="number"
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                        min="1"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Unesite prioritet (1-5)"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="done" className="block text-sm font-medium text-gray-700">Završeno:</label>
                    <Input
                        type="checkbox"
                        id="done"
                        checked={done}
                        onChange={(e) => setDone(e.target.checked)}
                        className="mt-1 ml-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                </div>

               {/* {message && (
                    <p className={`
                        ${message.includes('Izmena je uspešno dodata') ? 'text-green-500' : 'text-red-500'}
                        mb-4 text-sm font-medium
                    `}>
                        {message}
                    </p>
                )} */}
                <Button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-black-700">
                    Izmjeni
                </Button>
               {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2">{success}</p>}
            </form>
    {toast && (
<div
  style={{
    position: 'fixed',
    top: 60,
    right: 20,
    background: 'white',
    color: 'black',
    padding: '12px 24px',
    borderRadius: 6,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 9999,
  }}
>
  {toast}
</div>
    )}
</div>
);
}

