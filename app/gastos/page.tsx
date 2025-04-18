import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { ExpenseList } from "@/components/gastos/expense-list"
import { ExpenseChart } from "@/components/gastos/expense-chart"

export default function GastosPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gastos</h1>
        <Button asChild>
          <Link href="/gastos/novo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Gasto
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-3">
          <CardHeader>
            <CardTitle>Gastos por Categoria</CardTitle>
            <CardDescription>Distribuição de gastos por categoria.</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseChart />
          </CardContent>
        </Card>

        <Card className="col-span-7 md:col-span-4">
          <CardHeader>
            <CardTitle>Histórico de Gastos</CardTitle>
            <CardDescription>Gerencie todos os seus gastos.</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
