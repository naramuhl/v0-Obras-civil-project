"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona automaticamente para o dashboard
    router.push("/")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Autenticação Desativada</h1>
        <p>Redirecionando para o dashboard...</p>
      </div>
    </div>
  )
}
