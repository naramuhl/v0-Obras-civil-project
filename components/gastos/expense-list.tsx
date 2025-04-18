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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

const expenses = [
  {
    id: "1",
    category: "Material",
    description: "Cimento CP-II",
    project: "Residencial Vila Nova",
    amount: 2450,
    date: "2023-05-15",
  },
  {
    id: "2",
    category: "Transporte",
    description: "Transporte de Areia",
    project: "Comercial Centro",
    amount: 850,
    date: "2023-05-16",
  },
  {
    id: "3",
    category: "Material",
    description: "Tijolos 9x19x19",
    project: "Residencial Jardins",
    amount: 3150,
    date: "2023-05-17",
  },
  {
    id: "4",
    category: "Material",
    description: "Vergalhão 10mm",
    project: "Residencial Vila Nova",
    amount: 1750,
    date: "2023-05-18",
  },
  {
    id: "5",
    category: "Transporte",
    description: "Transporte de Equipamentos",
    project: "Comercial Centro",
    amount: 650,
    date: "2023-05-19",
  },
]

export function ExpenseList() {
  const [filter, setFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [projectFilter, setProjectFilter] = useState("")

  const filteredExpenses = expenses.filter((expense) => {
    const matchesDescription = expense.description.toLowerCase().includes(filter.toLowerCase())
    const matchesCategory = categoryFilter === "" || expense.category === categoryFilter
    const matchesProject = projectFilter === "" || expense.project === projectFilter
    return matchesDescription && matchesCategory && matchesProject
  })

  const categories = [...new Set(expenses.map((expense) => expense.category))]
  const projects = [...new Set(expenses.map((expense) => expense.project))]

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <Input placeholder="Filtrar por descrição..." value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            <TableHead>Categoria</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Obra</TableHead>
            <TableHead>Valor (R$)</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>
                <Badge
                  variant={
                    expense.category === "Material"
                      ? "default"
                      : expense.category === "Transporte"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {expense.category}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{expense.description}</TableCell>
              <TableCell>{expense.project}</TableCell>
              <TableCell>{expense.amount.toLocaleString("pt-BR")}</TableCell>
              <TableCell>{new Date(expense.date).toLocaleDateString("pt-BR")}</TableCell>
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
