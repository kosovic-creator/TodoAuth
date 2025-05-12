/* eslint-disable @typescript-eslint/no-unused-vars */
// filepath: /todo-app/todo-app/app/update/page.tsx
'use client';
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import usersSchema  from '@/types/usersSchema';
import { Input } from "@/components/ui/input";
import { useParams } from 'next/navigation';
export default function UpdatePage() {
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPaswword] = useState<string>('');
    const [role, setRole] = useState('USER');
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
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/users/${id}`, {
                    method: "GET",
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setMessage(errorData.message || "Greška u učitavanji podataka.");
                    return;
                }

                const data = await response.json();
                setName(data.name);
                setEmail(data.email);
                setPaswword(String(data.password));
                setRole(data.role);
            } catch (err) {
                setMessage("Greška.");
                console.error(err);
            }
        };

        if (id) {
            fetchUsers();
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
        const result = usersSchema.safeParse({ name, email, password, role });

        if (!result.success) {
            // Map errors to display them
            const errorMessages = result.error.errors.map((err) => err.message).join(', ');
            setError(errorMessages);
            return;
        }

        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, role  }),
            });

            if (response.ok) {
                const updatedTodo = await response.json();
                setMessage('Izmena je uspešno dodata!');
                setTimeout(() => router.push('/admin/users'), 2000);
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.error || 'Greška pri izmjeni.'}`);
                setTimeout(() => router.push('/admin/users'), 2000);
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
                    <label htmlFor="ime" className="block text-sm font-medium text-gray-700">Ime:</label>
                    <Input
                        type="text"
                        id="ime"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        // required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Unesite ime"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <Input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Unesite email"

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <Input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(e) => setPaswword(e.target.value)}
                        // required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Unesite password"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
                    <Input
                        type="text"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        // required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Unesite role"
                    />
                </div>

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

