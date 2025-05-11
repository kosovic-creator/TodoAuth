import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db/db';

export async function GET() {
  const todos = await db.todo.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  try {
    const { title, priority, details,korisnik } = await request.json();

    if (!title || typeof priority !== "number") {
      return NextResponse.json(
        { message: "Invalid data provided." },
        { status: 400 }
      );
    }

    const newTodo = await db.todo.create({
      data: {
        title,
        priority,
        korisnik,
        details: details || "",
        done: false, // Default value for `done`
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create todo." },
      { status: 500 }
    );
  }
}