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
import { ArrowRightLeft, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

const tools = [
  {
    id: "1",
    name: "Furadeira",
    quantity: 3,
    status: "Novo",
    location: "Residencial Vila Nova",
    acquisitionDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Serra Circular",
    quantity: 2,
    status: "Usado",
    location: "Comercial Centro",
    acquisitionDate: "2022-11-10",
  },
  {
    id: "3",
    name: "Betoneira",
    quantity: 1,
    status: "Usado",
    location: "Residencial Jardins",
    acquisitionDate: "2022-08-05",
  },
  {
    id: "4",
    name: "Martelo Demolidor",
    quantity: 2,
    status: "Novo",
    location: "Residencial Vila Nova",
    acquisitionDate: "2023-02-20",
  },
  {
    id: "5",
    name: "Lixadeira",
    quantity: 3,
    status: "Danificado",
    location: "Comercial Centro",
    acquisitionDate: "2022-10-15",
  },
  {
    id: "6",
    name: "Andaime",
    quantity: 10,
    status: "Usado",
    location: "Residencial Jardins",
    acquisitionDate: "2022-09-01",
  },
  {
    id: "7",
    name: "Escada",
    quantity: 5,
    status: "Usado",
    location: "Residencial Vila Nova",
    acquisitionDate: "2022-12-10",
  },
]

export function ToolList() {
  const [filter, setFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")

  const filteredTools = tools.filter((tool) => {
    const matchesName = tool.name.toLowerCase().includes(filter.toLowerCase())
    const matchesStatus = statusFilter === "" || tool.status === statusFilter
    const matchesLocation = locationFilter === "" || tool.location === locationFilter
    return matchesName && matchesStatus && matchesLocation
  })

  const statuses = [...new Set(tools.map((tool) => tool.status))]
  const locations = [...new Set(tools.map((tool) => tool.location))]

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <Input placeholder="Filtrar por nome..." value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os estados</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por localização" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as localizações</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Localização</TableHead>
            <TableHead>Data de Aquisição</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTools.map((tool) => (
            <TableRow key={tool.id}>
              <TableCell className="font-medium">{tool.name}</TableCell>
              <TableCell>{tool.quantity}</TableCell>
              <TableCell>
                <Badge
                  variant={tool.status === "Novo" ? "default" : tool.status === "Usado" ? "secondary" : "destructive"}
                >
                  {tool.status}
                </Badge>
              </TableCell>
              <TableCell>{tool.location}</TableCell>
              <TableCell>{new Date(tool.acquisitionDate).toLocaleDateString("pt-BR")}</TableCell>
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
                      <ArrowRightLeft className="mr-2 h-4 w-4" />
                      Transferir
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
