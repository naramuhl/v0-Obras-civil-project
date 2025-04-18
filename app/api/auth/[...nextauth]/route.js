import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { executeQuery } from "@/lib/db"

// Função para obter usuário por email
async function getUserByEmail(email) {
  try {
    const users = await executeQuery({
      query: "SELECT * FROM users WHERE email = ?",
      values: [email],
    })
    return users.length > 0 ? users[0] : null
  } catch (error) {
    console.error("Erro ao buscar usuário:", error)
    return null
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Credenciais incompletas")
            return null
          }

          console.log("Buscando usuário com email:", credentials.email)
          const user = await getUserByEmail(credentials.email)

          if (!user) {
            console.log("Usuário não encontrado")
            return null
          }

          console.log("Verificando senha para usuário:", user.email)
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            console.log("Senha inválida")
            return null
          }

          console.log("Login bem-sucedido para:", user.email)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        } catch (error) {
          console.error("Erro durante autenticação:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
