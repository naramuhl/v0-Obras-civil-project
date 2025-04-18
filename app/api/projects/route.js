import { getProjects, createProject } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return Response.json({ error: "Não autorizado" }, { status: 401 })
    }

    const projects = await getProjects()
    return Response.json(projects)
  } catch (error) {
    console.error("Erro ao buscar projetos:", error)
    return Response.json({ error: "Erro ao buscar projetos" }, { status: 500 })
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
    if (!data.name || !data.client || !data.size || !data.startDate) {
      return Response.json({ error: "Dados incompletos" }, { status: 400 })
    }

    await createProject(data)
    return Response.json({ success: true })
  } catch (error) {
    console.error("Erro ao criar projeto:", error)
    return Response.json({ error: "Erro ao criar projeto" }, { status: 500 })
  }
}
