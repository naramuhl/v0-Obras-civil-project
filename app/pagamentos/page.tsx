import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { PaymentList } from "@/components/pagamentos/payment-list"

export default function PagamentosPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pagamentos</h1>
        <Button asChild>
          <Link href="/pagamentos/novo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Pagamento
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
          <CardDescription>Gerencie todos os pagamentos realizados.</CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentList />
        </CardContent>
      </Card>
    </div>
  )
}
