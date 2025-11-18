import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  const sql = neon(process.env.DATABASE_URL!);

  // Consulta la tabla "clients"
  const clients = await sql`
    SELECT * FROM clients;
  `;

  return NextResponse.json(clients);
}