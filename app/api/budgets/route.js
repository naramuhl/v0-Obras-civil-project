import { getBudgets, createBudget } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return Response.json({ error: "Não autorizado" }, { status: 401 })
    }

    const budgets = await getBudgets()
    return Response.json(budgets)
  } catch (error) {
    console.error("Erro ao buscar orçamentos:", error)
    return Response.json({ error: "Erro ao buscar orçamentos" }, { status: 500 })
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
    if (!data.projectId || !data.pricePerSquareMeter || !data.totalBudget || !data.date) {
      return Response.json({ error: "Dados incompletos" }, { status: 400 })
    }

    await createBudget(data)
    return Response.json({ success: true })
  } catch (error) {
    console.error("Erro ao criar orçamento:", error)
    return Response.json({ error: "Erro ao criar orçamento" }, { status: 500 })
  }
}
