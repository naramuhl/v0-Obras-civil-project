import { getPayments, createPayment } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return Response.json({ error: "Não autorizado" }, { status: 401 })
    }

    const payments = await getPayments()
    return Response.json(payments)
  } catch (error) {
    console.error("Erro ao buscar pagamentos:", error)
    return Response.json({ error: "Erro ao buscar pagamentos" }, { status: 500 })
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
    if (!data.employeeId || !data.projectId || !data.amount || !data.date) {
      return Response.json({ error: "Dados incompletos" }, { status: 400 })
    }

    await createPayment(data)
    return Response.json({ success: true })
  } catch (error) {
    console.error("Erro ao criar pagamento:", error)
    return Response.json({ error: "Erro ao criar pagamento" }, { status: 500 })
  }
}
