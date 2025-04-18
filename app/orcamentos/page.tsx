import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { BudgetList } from "@/components/orcamentos/budget-list"

export default function OrcamentosPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orçamentos</h1>
        <Button asChild>
          <Link href="/orcamentos/novo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Orçamento
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Orçamentos</CardTitle>
          <CardDescription>Gerencie todos os seus orçamentos.</CardDescription>
        </CardHeader>
        <CardContent>
          <BudgetList />
        </CardContent>
      </Card>
    </div>
  )
}
