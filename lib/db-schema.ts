// Este arquivo define o esquema do banco de dados para a aplicação

// Tabela de Funcionários
export type Employee = {
  id: string
  name: string
  role: string
  salary: number
  hireDate: Date
}

// Tabela de Pagamentos
export type Payment = {
  id: string
  employeeId: string
  amount: number
  date: Date
  description: string
  projectId: string
}

// Tabela de Gastos
export type Expense = {
  id: string
  category: string
  amount: number
  date: Date
  description: string
  projectId: string
}

// Tabela de Ferramentas
export type Tool = {
  id: string
  name: string
  quantity: number
  status: "Novo" | "Usado" | "Danificado"
  location: string // projectId
  acquisitionDate: Date
}

// Tabela de Obras
export type Project = {
  id: string
  name: string
  client: string
  size: number // em metros quadrados
  status: "Planejamento" | "Em andamento" | "Concluída"
  budget: number
  startDate: Date
  endDate?: Date
  description?: string
}

// Tabela de Orçamentos
export type Budget = {
  id: string
  projectId: string
  pricePerSquareMeter: number
  extraCosts: number
  totalBudget: number
  status: "Pendente" | "Aprovado" | "Rejeitado"
  date: Date
  notes?: string
}
