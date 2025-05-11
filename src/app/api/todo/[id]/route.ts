import { NextRequest, NextResponse } from 'next/server';
import db  from '@/lib/db/db';

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split('/').pop() || '', 10); // Parse `id` as a number

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID nije prosleđen.' }, { status: 400 });
  }

  const { title, priority, details,korisnik, done } = await request.json();

  const todo = await db.todo.update({
    where: { id },
    data: { title, priority, details,korisnik, done },
  });

  return NextResponse.json(todo);
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split('/').pop() || '', 10); // Parse `id` as a number

  if (isNaN(id)) {
    return NextResponse.json({ message: 'ID nije prosleđen ili nije validan broj.' }, { status: 400 });
  }

  await db.todo.delete({ where: { id } }); // Use `id` as a number
  return NextResponse.json({ message: 'Deleted' });
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = parseInt(url.pathname.split('/').pop() || '', 10); // Parse `id` as a number

  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  const todo = await db.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
  }

  return NextResponse.json(todo);
}