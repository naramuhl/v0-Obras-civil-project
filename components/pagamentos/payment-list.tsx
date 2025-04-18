"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FileText, MoreHorizontal, Pencil, Printer, Trash2 } from "lucide-react"
import { useState } from "react"

const payments = [
  {
    id: "1",
    employee: "João da Silva",
    role: "Pedreiro",
    project: "Residencial Vila Nova",
    amount: 1250,
    date: "2023-05-15",
    description: "Pagamento semanal",
  },
  {
    id: "2",
    employee: "Maria Santos",
    role: "Ajudante",
    project: "Comercial Centro",
    amount: 950,
    date: "2023-05-15",
    description: "Pagamento semanal",
  },
  {
    id: "3",
    employee: "Pedro Oliveira",
    role: "Eletricista",
    project: "Residencial Jardins",
    amount: 1350,
    date: "2023-05-15",
    description: "Pagamento semanal",
  },
  {
    id: "4",
    employee: "Ana Martins",
    role: "Pintora",
    project: "Residencial Vila Nova",
    amount: 1150,
    date: "2023-05-15",
    description: "Pagamento semanal",
  },
  {
    id: "5",
    employee: "Carlos Souza",
    role: "Pedreiro",
    project: "Comercial Centro",
    amount: 1250,
    date: "2023-05-15",
    description: "Pagamento semanal",
  },
  {
    id: "6",
    employee: "João da Silva",
    role: "Pedreiro",
    project: "Residencial Vila Nova",
    amount: 1250,
    date: "2023-05-22",
    description: "Pagamento semanal",
  },
  {
    id: "7",
    employee: "Maria Santos",
    role: "Ajudante",
    project: "Comercial Centro",
    amount: 950,
    date: "2023-05-22",
    description: "Pagamento semanal",
  },
]

export function PaymentList() {
  const [filter, setFilter] = useState("")
  const [projectFilter, setProjectFilter] = useState("")

  const filteredPayments = payments.filter((payment) => {
    const matchesEmployee = payment.employee.toLowerCase().includes(filter.toLowerCase())
    const matchesProject = projectFilter === "" || payment.project === projectFilter
    return matchesEmployee && matchesProject
  })

  const projects = [...new Set(payments.map((payment) => payment.project))]

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <Input placeholder="Filtrar por funcionário..." value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por obra" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as obras</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project} value={project}>
                  {project}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Funcionário</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Obra</TableHead>
            <TableHead>Valor (R$)</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.employee}</TableCell>
              <TableCell>{payment.role}</TableCell>
              <TableCell>{payment.project}</TableCell>
              <TableCell>{payment.amount.toLocaleString("pt-BR")}</TableCell>
              <TableCell>{new Date(payment.date).toLocaleDateString("pt-BR")}</TableCell>
              <TableCell>{payment.description}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Ver Recibo
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Printer className="mr-2 h-4 w-4" />
                      Imprimir Recibo
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
