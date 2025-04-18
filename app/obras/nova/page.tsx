"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome da obra deve ter pelo menos 2 caracteres.",
  }),
  client: z.string().min(2, {
    message: "O nome do cliente deve ter pelo menos 2 caracteres.",
  }),
  size: z.coerce.number().min(1, {
    message: "O tamanho deve ser maior que 0.",
  }),
  status: z.string({
    required_error: "Por favor selecione um status.",
  }),
  pricePerSquareMeter: z.coerce
    .number()
    .min(2000, {
      message: "O valor por m² deve ser pelo menos R$ 2.000,00.",
    })
    .max(2500, {
      message: "O valor por m² deve ser no máximo R$ 2.500,00.",
    }),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string().optional(),
})

export default function NovaObraPage() {
  const router = useRouter()
  const [calculatedBudget, setCalculatedBudget] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      client: "",
      size: 0,
      status: "em-andamento",
      pricePerSquareMeter: 2000,
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      description: "",
    },
  })

  function calculateBudget(size: number, pricePerSquareMeter: number) {
    return size * pricePerSquareMeter
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Aqui você implementaria a lógica para salvar no banco de dados
    console.log(values)

    // Redireciona para a lista de obras
    router.push("/obras")
  }

  // Recalcula o orçamento quando o tamanho ou preço por m² mudam
  form.watch((data) => {
    if (data.size && data.pricePerSquareMeter) {
      setCalculatedBudget(calculateBudget(Number(data.size), Number(data.pricePerSquareMeter)))
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Nova Obra</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cadastro de Nova Obra</CardTitle>
          <CardDescription>Preencha os dados para cadastrar uma nova obra.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Obra</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Residencial Vila Nova" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do cliente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tamanho (m²)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="em-andamento">Em andamento</SelectItem>
                          <SelectItem value="concluida">Concluída</SelectItem>
                          <SelectItem value="planejamento">Planejamento</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pricePerSquareMeter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor por m² (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Valor entre R$ 2.000,00 e R$ 2.500,00</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between p-4 border rounded-md bg-muted">
                  <span className="font-medium">Orçamento Calculado:</span>
                  <span className="text-xl font-bold">R$ {calculatedBudget.toLocaleString("pt-BR")}</span>
                </div>

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Início</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Término Prevista</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Detalhes adicionais sobre a obra" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-end gap-2 px-0">
                <Button variant="outline" type="button" onClick={() => router.push("/obras")}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
