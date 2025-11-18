"use client"

import * as React from "react"
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from "react"
import { toast } from "sonner"
import { Switch } from './ui/switch'
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

interface ClientProjectsSectionProps {
    clientId: string
    userId: string
}

function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

export default function ClientProjectsSection({ clientId, userId }: ClientProjectsSectionProps) {
    const [open, setOpen] = useState(false)

    const [projectName, setProjectName] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [projectMaintenance, setProjectMaintenance] = useState(false)
    const [monthlyMaintenancePrice, setMonthlyMaintenancePrice] = useState(0)
    const [maintenanceStartDate, setMaintenanceStartDate] = useState("")
    const [activeProject, setActiveProject] = useState(true)
    const [initialPayment, setInitialPayment] = useState(0)
    const [finalPayment, setFinalPayment] = useState(0)
    const [totalPayment, setTotalPayment] = useState(0)

    const [calendarOpen, setCalendarOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(
        new Date()
    )
    const [month, setMonth] = React.useState<Date | undefined>(date)
    const [value, setValue] = React.useState(formatDate(date))

    async function testCreateProject() {
        console.log("Client ID:", clientId)
        console.log("Project Name:", projectName)
        console.log("Project Description:", projectDescription)
        console.log("Project Maintenance:", projectMaintenance)
        console.log("Monthly Maintenance Price:", monthlyMaintenancePrice)
        console.log("Maintenance Start Date:", maintenanceStartDate)
        console.log("Active Project:", activeProject)
        console.log("Created By:", userId)
        console.log("Initial Payment:", initialPayment)
        console.log("Final Payment:", finalPayment)
        console.log("Total Payment:", totalPayment)
    }

    async function createProject() {
        if (!projectName.trim() || !projectMaintenance) {
            toast.error("Please fill in all fields")
            return
        }

        try {
            // Aquí irá tu lógica para crear un proyecto
            const res = await fetch("/api/create-project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    client_id: clientId,
                    project_name: projectName,
                    project_description: projectDescription,
                    project_maintenance: projectMaintenance,
                    monthly_maintenance_price: monthlyMaintenancePrice,
                    maintenance_start_date: maintenanceStartDate,
                    active_project: activeProject,
                    created_by: userId,
                    initial_payment: initialPayment,
                    final_payment: finalPayment,
                    total_payment: totalPayment,
                })
            })

            if (!res.ok) {
                throw new Error("Failed to create project")
            }

            const data = await res.json()
            console.log("Project created:", data)

            toast.success("Project created successfully!")

            setOpen(false)
            setProjectName("")
            setProjectDescription("")
            setProjectMaintenance(false)
            setMonthlyMaintenancePrice(0)
            setMaintenanceStartDate("")
            setActiveProject(true)
            setInitialPayment(0)
            setFinalPayment(0)
            setTotalPayment(0)
        } catch (error) {
            console.error('Error creating project:', error)
            toast.error("Failed to create project")
        }
    }

    return (
        <div className="grid gap-4">
            <div className="border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Client Projects</h2>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>Create Project</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create Project</DialogTitle>
                                <DialogDescription>
                                    Fill in the project details below.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="project-name">Project Name</Label>
                                    <Input
                                        id="project-name"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        placeholder="Enter project name"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="project-description">Project Description</Label>
                                    <Input
                                        id="project-description"
                                        value={projectDescription}
                                        onChange={(e) => setProjectDescription(e.target.value)}
                                        placeholder="Enter project description"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="project-maintenance">Project Maintenance</Label>
                                    <Switch
                                        id="project-maintenance"
                                        checked={projectMaintenance}
                                        onCheckedChange={(checked) => setProjectMaintenance(checked === true)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="monthly-maintenance-price">Monthly Maintenance Price</Label>
                                    <Input
                                        id="monthly-maintenance-price"
                                        value={monthlyMaintenancePrice}
                                        onChange={(e) => setMonthlyMaintenancePrice(Number(e.target.value))}
                                        placeholder="Enter monthly maintenance price"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="date" className="px-1">
                                        Maintenance Start Date
                                    </Label>
                                    <div className="relative flex gap-2">
                                        <Input
                                            id="date"
                                            value={value}
                                            className="bg-background pr-10"
                                            onChange={(e) => {
                                                const newDate = new Date(e.target.value)
                                                setValue(e.target.value)
                                                if (isValidDate(newDate)) {
                                                    setDate(newDate)
                                                    setMonth(newDate)
                                                    // ✅ Guarda la fecha en formato ISO
                                                    setMaintenanceStartDate(newDate.toISOString())
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "ArrowDown") {
                                                    e.preventDefault()
                                                    setCalendarOpen(true)
                                                }
                                            }}
                                        />
                                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="date-picker"
                                                    variant="ghost"
                                                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                                                >
                                                    <CalendarIcon className="size-3.5" />
                                                    <span className="sr-only">Select date</span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto overflow-hidden p-0"
                                                align="end"
                                                alignOffset={-8}
                                                sideOffset={10}
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    captionLayout="dropdown"
                                                    month={month}
                                                    onMonthChange={setMonth}
                                                    onSelect={(date) => {
                                                        setDate(date)
                                                        setValue(formatDate(date))
                                                        // ✅ Guarda la fecha en formato ISO
                                                        setMaintenanceStartDate(date?.toISOString() || "")
                                                        setCalendarOpen(false)
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="active-project">Active Project</Label>
                                    <Switch
                                        id="active-project"
                                        checked={activeProject}
                                        onCheckedChange={(checked) => setActiveProject(checked === true)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="initial-payment">Initial Payment</Label>
                                    <Input
                                        id="initial-payment"
                                        value={initialPayment}
                                        onChange={(e) => setInitialPayment(Number(e.target.value))}
                                        placeholder="Enter initial payment"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="final-payment">Final Payment</Label>
                                    <Input
                                        id="final-payment"
                                        value={finalPayment}
                                        onChange={(e) => setFinalPayment(Number(e.target.value))}
                                        placeholder="Enter final payment"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="total-payment">Total Payment</Label>
                                    <Input
                                        id="total-payment"
                                        value={totalPayment}
                                        onChange={(e) => setTotalPayment(Number(e.target.value))}
                                        placeholder="Enter total payment"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button onClick={testCreateProject}>Test Console</Button>
                                <Button onClick={createProject}>Create Project</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <p className="text-sm text-muted-foreground">No projects yet. Create your first project!</p>
            </div>
        </div>
    )
}