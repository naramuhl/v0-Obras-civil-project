import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { executeQuery } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function GET(request) {
  try {
    // Testar a conexão com o banco de dados
    const testConnection = await executeQuery({
      query: "SELECT 1 as test",
    })

    // Testar a busca de usuários
    const users = await executeQuery({
      query: "SELECT id, name, email, role FROM users LIMIT 3",
    })

    // Testar a verificação de senha
    const testUser = await executeQuery({
      query: "SELECT * FROM users WHERE email = ?",
      values: ["admin@construcao.com"],
    })

    let passwordTest = null
    if (testUser.length > 0) {
      // Testar com a senha correta
      const correctPassword = await bcrypt.compare("admin123", testUser[0].password)
      // Testar com a senha incorreta
      const wrongPassword = await bcrypt.compare("senha_errada", testUser[0].password)

      passwordTest = {
        correctPassword,
        wrongPassword,
        storedHash: testUser[0].password,
      }
    }

    // Verificar a sessão atual
    const session = await getServerSession(authOptions)

    return Response.json({
      dbConnection: testConnection.length > 0,
      users,
      passwordTest,
      session,
    })
  } catch (error) {
    console.error("Erro no teste de autenticação:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
