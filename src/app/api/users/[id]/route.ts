import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: "Nevalidan JSON u telu zahteva." }, { status: 400 });
  }

  const { name, email, password, role } = body;

  const user = await db.user.update({
    where: { id: id }, // koristi string ili broj prema modelu
    data: { name, email, password, role },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
const { id } = await params; // <--- OBAVEZNO




  await db.user.delete({ where: { id: id.toString() } });
  return NextResponse.json({ message: 'Deleted' });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
const { id } = await params; // <--- OBAVEZNO


  const user = await db.user.findUnique({
    where: { id: id.toString() },
  });

  if (!user) {
    return NextResponse.json({ message: 'Korisnik nije nađen' }, { status: 404 });
  }

  return NextResponse.json(user);
}
