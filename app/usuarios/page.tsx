"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Trash2, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Tipo para usuários
type User = {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "user"
  createdAt: string
}

// Dados de exemplo - em produção, estes viriam da API
const mockUsers: User[] = [
  {
    id: "u1",
    name: "Administrador",
    email: "admin@construcao.com",
    role: "admin",
    createdAt: "2023-01-01T00:00:00.000Z",
  },
  {
    id: "u2",
    name: "Gerente",
    email: "gerente@construcao.com",
    role: "manager",
    createdAt: "2023-01-02T00:00:00.000Z",
  },
  {
    id: "u3",
    name: "Usuário",
    email: "usuario@construcao.com",
    role: "user",
    createdAt: "2023-01-03T00:00:00.000Z",
  },
]

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([])

  // Carregar usuários de exemplo para testes
  useEffect(() => {
    setUsers(mockUsers)
  }, [])

  // Tradução dos papéis
  const roleTranslation = {
    admin: "Administrador",
    manager: "Gerente",
    user: "Usuário",
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
        <Button asChild>
          <Link href="/usuarios/novo">
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Usuários</CardTitle>
          <CardDescription>Gerencie os usuários do sistema e suas permissões.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "admin" ? "default" : user.role === "manager" ? "secondary" : "outline"}
                    >
                      {roleTranslation[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString("pt-BR")}</TableCell>
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
        </CardContent>
      </Card>
    </div>
  )
}
