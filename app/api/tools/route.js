import { getTools, createTool } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return Response.json({ error: "Não autorizado" }, { status: 401 })
    }

    const tools = await getTools()
    return Response.json(tools)
  } catch (error) {
    console.error("Erro ao buscar ferramentas:", error)
    return Response.json({ error: "Erro ao buscar ferramentas" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return Response.json({ error: "Não autorizado" }, { status: 401 })
    }

    const data = await request.json()

    // Validação básica
    if (!data.name || !data.quantity || !data.status || !data.acquisitionDate) {
      return Response.json({ error: "Dados incompletos" }, { status: 400 })
    }

    await createTool(data)
    return Response.json({ success: true })
  } catch (error) {
    console.error("Erro ao criar ferramenta:", error)
    return Response.json({ error: "Erro ao criar ferramenta" }, { status: 500 })
  }
}
