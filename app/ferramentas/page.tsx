import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { ToolList } from "@/components/ferramentas/tool-list"

export default function FerramentasPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Ferramentas</h1>
        <Button asChild>
          <Link href="/ferramentas/nova">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Ferramenta
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Inventário de Ferramentas</CardTitle>
          <CardDescription>Gerencie todas as suas ferramentas.</CardDescription>
        </CardHeader>
        <CardContent>
          <ToolList />
        </CardContent>
      </Card>
    </div>
  )
}
