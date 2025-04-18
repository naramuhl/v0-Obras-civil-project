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
import { Badge } from "@/components/ui/badge"
import { FileText, MoreHorizontal, Pencil, Printer, Trash2 } from "lucide-react"

const budgets = [
  {
    id: "1",
    project: "Residencial Vila Nova",
    client: "João Pereira",
    size: 120,
    pricePerSquareMeter: 2200,
    extraCosts: 10000,
    totalBudget: 274000,
    status: "Aprovado",
    date: "2023-05-10",
  },
  {
    id: "2",
    project: "Comercial Centro",
    client: "Empresa ABC Ltda",
    size: 200,
    pricePerSquareMeter: 2300,
    extraCosts: 20000,
    totalBudget: 480000,
    status: "Aprovado",
    date: "2023-05-25",
  },
  {
    id: "3",
    project: "Residencial Jardins",
    client: "Maria Silva",
    size: 150,
    pricePerSquareMeter: 2200,
    extraCosts: 15000,
    totalBudget: 345000,
    status: "Pendente",
    date: "2023-06-05",
  },
  {
    id: "4",
    project: "Pavilhão Industrial",
    client: "Indústrias XYZ",
    size: 500,
    pricePerSquareMeter: 2200,
    extraCosts: 50000,
    totalBudget: 1150000,
    status: "Aprovado",
    date: "2023-07-15",
  },
  {
    id: "5",
    project: "Residencial Parque Verde",
    client: "Carlos Mendes",
    size: 180,
    pricePerSquareMeter: 2400,
    extraCosts: 12000,
    totalBudget: 444000,
    status: "Rejeitado",
    date: "2023-01-10",
  },
]

export function BudgetList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Projeto</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Tamanho (m²)</TableHead>
          <TableHead>Valor por m² (R$)</TableHead>
          <TableHead>Custos Extras (R$)</TableHead>
          <TableHead>Orçamento Total (R$)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {budgets.map((budget) => (
          <TableRow key={budget.id}>
            <TableCell className="font-medium">{budget.project}</TableCell>
            <TableCell>{budget.client}</TableCell>
            <TableCell>{budget.size}</TableCell>
            <TableCell>{budget.pricePerSquareMeter.toLocaleString("pt-BR")}</TableCell>
            <TableCell>{budget.extraCosts.toLocaleString("pt-BR")}</TableCell>
            <TableCell>{budget.totalBudget.toLocaleString("pt-BR")}</TableCell>
            <TableCell>
              <Badge
                variant={
                  budget.status === "Aprovado" ? "default" : budget.status === "Pendente" ? "secondary" : "destructive"
                }
              >
                {budget.status}
              </Badge>
            </TableCell>
            <TableCell>{new Date(budget.date).toLocaleDateString("pt-BR")}</TableCell>
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
                    Ver Detalhes
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimir
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
  )
}
