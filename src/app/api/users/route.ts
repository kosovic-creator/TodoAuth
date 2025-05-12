
import { NextRequest, NextResponse } from 'next/server';
import {db} from '@/lib/db/db';

export async function GET() {
  const todos = await db.user.findMany();
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  try {
    const {  email, password, role } = await request.json();



    const newTodo = await db.user.create({
      data: {

        email,
        password,
        role,

      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Greška u kreiranju korisnika." },
      { status: 500 }
    );
  }
}