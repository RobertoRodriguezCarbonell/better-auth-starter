"use client"

import { useEffect, useState } from "react"

interface Client {
  id: string | number
  client_name: string
  client_key: string
  created_at: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadClients() {
      try {
        const res = await fetch('/api/get-clients')
        const data = await res.json()
        setClients(data)
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    }

    loadClients();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <div>
          <ul>
            {clients.map((c) => (
              <li key={c.id}>
                {c.client_key} | {c.client_name} | {new Date(c.created_at).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}