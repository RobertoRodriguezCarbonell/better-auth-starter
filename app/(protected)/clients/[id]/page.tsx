import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import ClientProjectsSection from '@/components/client-projects-section'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

interface ClientDetailPageProps {
  params: Promise<{ id: string }>
}

interface Client {
  id: string
  client_name: string
  client_key: string
  created_at: string
  active: boolean
}

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = await params

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    notFound()
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL
    const res = await fetch(`${baseUrl}/api/get-clients/${id}`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      notFound()
    }

    const client: Client = await res.json()

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/clients">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center justify-between flex-1">
            <h1 className="text-3xl font-bold">{client.client_name}</h1>
            <Badge variant={client.active ? "default" : "destructive"}>
              {client.active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Client Details</h2>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Client ID</dt>
                <dd className="mt-1 text-sm">{client.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Client Key</dt>
                <dd className="mt-1">
                  <Badge variant="outline">{client.client_key}</Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                <dd className="mt-1 text-sm">
                  {client.active ? 'Active' : 'Inactive'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Created At</dt>
                <dd className="mt-1 text-sm">
                  {new Date(client.created_at).toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Componente Cliente para interactividad */}
        <ClientProjectsSection 
          clientId={client.id} 
          userId={session.user.id}
        />
      </div>
    )
  } catch (error) {
    console.error('Error loading client:', error)
    notFound()
  }
}