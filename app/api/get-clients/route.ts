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

export async function POST(request: Request) {
    const sql = neon(process.env.DATABASE_URL!);

    // Obtener la fecha y hora actual en formato ISO para la columna created_at de la tabla "clients"
    const timestampzNow = new Date().toISOString();

    // Marcar cliente como active = TRUE al crearlo
    const isActive = true;

    // Recibir los datos del cliente desde el cuerpo de la solicitud
    const { client_name, client_key } = await request.json();

    // Validar que los datos estén presentes
    if (!client_name || !client_key) {
        return NextResponse.json(
            { error: "Client name or Client key are required"},
            { status: 400 }
        );
    }

    // Hacer el insert en la tabla
    const result = await sql`
        INSERT INTO clients (client_name, client_key, created_at, active)
        VALUES (${client_name}, ${client_key}, ${timestampzNow}, ${isActive})
        RETURNING *;
    `;

    // Devolver la respuesta con el nuevo cliente creado
    return NextResponse.json(result[0], { status: 201 });
}