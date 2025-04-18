import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { ProjectList } from "@/components/obras/project-list"

export default function ObrasPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Obras</h1>
        <Button asChild>
          <Link href="/obras/nova">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Obra
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Obras em Andamento</CardTitle>
          <CardDescription>Gerencie todas as suas obras ativas.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectList />
        </CardContent>
      </Card>
    </div>
  )
}
