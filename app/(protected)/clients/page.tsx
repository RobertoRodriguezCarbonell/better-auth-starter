"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Client {
  id: string | number
  client_name: string
  client_key: string
  created_at: string
  active: boolean
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  // Estados para el formulario
  const [clientName, setClientName] = useState("")
  const [clientKey, setClientKey] = useState("")

  useEffect(() => {
    async function loadClients() {
      try {
        const res = await fetch('/api/get-clients')
        const data = await res.json()
        setClients(data)
        // console.log("Fetched clients:", data)
      } catch (error) {
        console.error('Error fetching clients:', error)
        toast.error("Failed to load clients")
      } finally {
        setLoading(false)
      }
    }

    loadClients()
  }, [])

  async function createClient() {
    // Validación básica
    if (!clientName.trim() || !clientKey.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      const res = await fetch("/api/get-clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_name: clientName,
          client_key: clientKey
        })
      })

      if (!res.ok) {
        throw new Error("Failed to create client")
      }

      const data = await res.json()
      // console.log("Created client:", data)

      // Actualizar la lista de clientes
      setClients([...clients, data])

      // Mostrar toast de éxito
      toast.success("Client created successfully!")

      // Cerrar el diálogo y resetear el formulario
      setOpen(false)
      setClientName("")
      setClientKey("")
    } catch (error) {
      console.error('Error creating client:', error)
      toast.error("Failed to create client")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading clients...</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Clients</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Create Client</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Client</DialogTitle>
                <DialogDescription>
                  Fill in the client details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-3">
                  <Label htmlFor="client-name">Client Name</Label>
                  <Input
                    id="client-name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter client name"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="client-key">Client Key</Label>
                  <Input
                    id="client-key"
                    value={clientKey}
                    onChange={(e) => setClientKey(e.target.value)}
                    placeholder="Enter client key"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={createClient}>Create Client</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="">
          {clients.length === 0 ? (
            <p className="text-muted-foreground">No clients yet. Create your first client!</p>
          ) : (
            <ul className="space-y-2">
              {clients.map((c) => (
                <li key={c.id} className="p-3 border hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <p className={`text-sm px-2 ${c.active
                          ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-950'
                          : 'text-accent bg-muted-foreground'
                        }`}>
                        {c.client_key}
                      </p>
                      <p className="font-medium">{c.client_name}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(c.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}