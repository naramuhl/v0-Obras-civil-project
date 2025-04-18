import { getExpenses, createExpense } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return Response.json({ error: "Não autorizado" }, { status: 401 })
    }

    const expenses = await getExpenses()
    return Response.json(expenses)
  } catch (error) {
    console.error("Erro ao buscar gastos:", error)
    return Response.json({ error: "Erro ao buscar gastos" }, { status: 500 })
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
    if (!data.category || !data.projectId || !data.amount || !data.date) {
      return Response.json({ error: "Dados incompletos" }, { status: 400 })
    }

    await createExpense(data)
    return Response.json({ success: true })
  } catch (error) {
    console.error("Erro ao criar gasto:", error)
    return Response.json({ error: "Erro ao criar gasto" }, { status: 500 })
  }
}
