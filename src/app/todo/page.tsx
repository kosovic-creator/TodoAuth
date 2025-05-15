/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import LoadingDots from '@/components/loading-dots';
import { useSession } from "next-auth/react";
import { Todo } from '@/types/todo';
import NextError from 'next/error';
import { Button } from '@/components/ui/button';


export default function TodoTable() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [isPending, startTransition] = useTransition();
  const { data: session, status } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 5;
  const korisnik = (session?.user?.email ?? '').split('@')[0];

useEffect(() => {
     if (status === "authenticated" && session) {
       startTransition(() => {
         fetch('/api/todo')
           .then(res => {
             if (!res.ok) throw new Error("Greška prilikom učitavanja zadataka");
             return res.json();
           })
           .then(setTodos)
           .catch(setError);
       });
     }
   }, [status, session]);

  // Loader dok traje učitavanje sesije
  if (status === "loading") {
    return <LoadingDots />;
  }
  // Ako nije ulogovan, možeš preusmjeriti ili prikazati poruku
  if (status === "unauthenticated") {
    return (
      <div className="text-center mt-8">
         <Button onClick={() => window.location.reload()}>Reload</Button>
        Morate biti prijavljeni da biste vidjeli ovu stranicu.
korisnik je : {korisnik}
      </div>
    );


  }


  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        {"Došlo je do greške prilikom učitavanja zadataka."}
      </div>
    );
  }
  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }

  const updateTodo = async (id: string, data: Partial<Todo>) => {
    const res = await fetch(`/api/todo/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const updated = await res.json();
    setTodos(todos.map(t => (t.id === Number(id) ? updated : t)));
    showToast('Napomena je uspešno izmjenjena!');
  };

  const filteredTodos = session
    ? todos.filter(todo =>
        todo.korisnik.includes(korisnik) && todo.title.includes(filter)
      )
    : [];

  // Pagination logic
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTodos = filteredTodos.slice(startIndex, startIndex + itemsPerPage);

  const brojZapisa = filteredTodos.length;
  const brojKompletiranih = todos.filter(todo => todo.done).length;
  const procenatKompletiranih = brojZapisa === 0 ? 0 : Math.round((brojKompletiranih / brojZapisa) * 100);

  return (
    <>

      <div className="flex justify-end items-center p-4">
        <div className="relative w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-500" />
          </span>
          <Input
            type="search"
            placeholder="Pretraga..."
            className="pl-10 w-full h-10 border border-gray-300 rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <Link href="/todo/add" className='mr-0 p-3'>
          <button className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition p-4">Dodaj</button>
        </Link>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead className="bg-gray-600 text-white font-thin">
          <tr className='border-b border-gray-300 text-white'>
            <th className='p-3 text-center'>Naslov</th>
            <th className='p-3 text-center'>Detalji</th>
            <th className="p-3 text-center">Prioritet</th>
            <th className="p-3 text-left">Završeno</th>
            <th></th>
          </tr>
        </thead>
        <tbody className='text-sm text-gray-700 bg-white divide-y divide-gray-300'>
          {currentTodos.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center"> <LoadingDots /> </td>
            </tr>
          ) : (
            currentTodos.map(todo => (
              <tr key={todo.id}>
                <td className='p-2 text-center'>{todo.title}</td>
                <td className='p-2 text-center'>{todo.details}</td>
                <td className='text-center'>{todo.priority}</td>
                <td>
                  <input
                    className='ml-5'
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => updateTodo(String(todo.id), { done: !todo.done })}
                  />
                </td>
                <td>
                  <div className="flex gap-2 flex-row-reverse w-full">
                    <Link href={`/todo/${todo.id}`} >
                      <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition">Pregled</button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400 transition"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prethodna
        </button>
        <span>Stranica {currentPage} od {totalPages}</span>
        <button
          className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400 transition"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Sledeća
        </button>
      </div>

      <footer className="flex justify-center items-center p-4 bg-gray-100">
        <a>
          Procenat završenih obaveza: {procenatKompletiranih}%
        </a>
      </footer>
    </>
  );
}
