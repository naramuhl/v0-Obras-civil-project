import { executeQuery, generateUUID } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import bcrypt from "bcryptjs"

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)

    // Verificar se o usuário está autenticado e é administrador
    if (!session || session.user.role !== "admin") {
      return Response.json({ error: "Não autorizado" }, { status: 401 })
    }

    const users = await executeQuery({
      query: "SELECT id, name, email, role, created_at FROM users ORDER BY name",
    })

    return Response.json(users)
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    return Response.json({ error: "Erro ao buscar usuários" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    // Verificar se o usuário está autenticado e é administrador
    if (!session || session.user.role !== "admin") {
      return Response.json({ error: "Não autorizado" }, { status: 401 })
    }

    const data = await request.json()

    // Validação básica
    if (!data.name || !data.email || !data.password || !data.role) {
      return Response.json({ error: "Dados incompletos" }, { status: 400 })
    }

    // Verificar se o email já está em uso
    const existingUser = await executeQuery({
      query: "SELECT id FROM users WHERE email = ?",
      values: [data.email],
    })

    if (existingUser.length > 0) {
      return Response.json({ error: "Email já está em uso" }, { status: 400 })
    }

    // Hash da senha usando bcryptjs
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // Criar novo usuário
    const id = generateUUID()
    await executeQuery({
      query: `
        INSERT INTO users (id, name, email, password, role)
        VALUES (?, ?, ?, ?, ?)
      `,
      values: [id, data.name, data.email, hashedPassword, data.role],
    })

    return Response.json({ success: true, id })
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    return Response.json({ error: "Erro ao criar usuário" }, { status: 500 })
  }
}
