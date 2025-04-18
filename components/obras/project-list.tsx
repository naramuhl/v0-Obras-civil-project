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
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

const projects = [
  {
    id: "1",
    name: "Residencial Vila Nova",
    client: "João Pereira",
    size: 120,
    status: "Em andamento",
    budget: 264000,
    startDate: "2023-05-15",
    endDate: "2023-11-15",
  },
  {
    id: "2",
    name: "Comercial Centro",
    client: "Empresa ABC Ltda",
    size: 200,
    status: "Em andamento",
    budget: 480000,
    startDate: "2023-06-01",
    endDate: "2023-12-01",
  },
  {
    id: "3",
    name: "Residencial Jardins",
    client: "Maria Silva",
    size: 150,
    status: "Em andamento",
    budget: 330000,
    startDate: "2023-07-10",
    endDate: "2024-01-10",
  },
  {
    id: "4",
    name: "Pavilhão Industrial",
    client: "Indústrias XYZ",
    size: 500,
    status: "Em andamento",
    budget: 1100000,
    startDate: "2023-08-01",
    endDate: "2024-03-01",
  },
  {
    id: "5",
    name: "Residencial Parque Verde",
    client: "Carlos Mendes",
    size: 180,
    status: "Concluída",
    budget: 396000,
    startDate: "2023-01-15",
    endDate: "2023-07-15",
  },
]

export function ProjectList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Tamanho (m²)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Orçamento (R$)</TableHead>
          <TableHead>Data Início</TableHead>
          <TableHead>Data Fim</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>{project.client}</TableCell>
            <TableCell>{project.size} m²</TableCell>
            <TableCell>
              <Badge variant={project.status === "Em andamento" ? "default" : "secondary"}>{project.status}</Badge>
            </TableCell>
            <TableCell>{project.budget.toLocaleString("pt-BR")}</TableCell>
            <TableCell>{new Date(project.startDate).toLocaleDateString("pt-BR")}</TableCell>
            <TableCell>{new Date(project.endDate).toLocaleDateString("pt-BR")}</TableCell>
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
  )
}
