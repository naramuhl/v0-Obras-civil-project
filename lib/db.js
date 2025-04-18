import mysql from "mysql2/promise"

// Configuração da conexão com o banco de dados
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "construcao_civil",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Pool de conexões para reutilização
const pool = mysql.createPool(dbConfig)

// Função para executar queries
export async function executeQuery({ query, values = [] }) {
  try {
    const [results] = await pool.execute(query, values)
    return results
  } catch (error) {
    console.error("Database query error:", error)
    throw new Error("Erro ao executar consulta no banco de dados")
  }
}

// Função para gerar um UUID v4
export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// Funções específicas para cada entidade

// Funcionários
export async function getEmployees() {
  return executeQuery({ query: "SELECT * FROM employees ORDER BY name" })
}

export async function getEmployeeById(id) {
  return executeQuery({
    query: "SELECT * FROM employees WHERE id = ?",
    values: [id],
  })
}

export async function createEmployee(employee) {
  const id = generateUUID()
  return executeQuery({
    query: `
      INSERT INTO employees (id, name, role, salary, hire_date)
      VALUES (?, ?, ?, ?, ?)
    `,
    values: [id, employee.name, employee.role, employee.salary, employee.hireDate],
  })
}

// Projetos
export async function getProjects() {
  return executeQuery({ query: "SELECT * FROM projects ORDER BY start_date DESC" })
}

export async function getProjectById(id) {
  return executeQuery({
    query: "SELECT * FROM projects WHERE id = ?",
    values: [id],
  })
}

export async function createProject(project) {
  const id = generateUUID()
  return executeQuery({
    query: `
      INSERT INTO projects (id, name, client, size, status, budget, start_date, end_date, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    values: [
      id,
      project.name,
      project.client,
      project.size,
      project.status,
      project.budget,
      project.startDate,
      project.endDate || null,
      project.description || null,
    ],
  })
}

// Pagamentos
export async function getPayments() {
  return executeQuery({
    query: `
      SELECT p.*, e.name as employee_name, e.role as employee_role, pr.name as project_name
      FROM payments p
      JOIN employees e ON p.employee_id = e.id
      JOIN projects pr ON p.project_id = pr.id
      ORDER BY p.date DESC
    `,
  })
}

export async function createPayment(payment) {
  const id = generateUUID()
  return executeQuery({
    query: `
      INSERT INTO payments (id, employee_id, project_id, amount, date, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    values: [id, payment.employeeId, payment.projectId, payment.amount, payment.date, payment.description || null],
  })
}

// Gastos
export async function getExpenses() {
  return executeQuery({
    query: `
      SELECT e.*, p.name as project_name
      FROM expenses e
      JOIN projects p ON e.project_id = p.id
      ORDER BY e.date DESC
    `,
  })
}

export async function createExpense(expense) {
  const id = generateUUID()
  return executeQuery({
    query: `
      INSERT INTO expenses (id, category, project_id, amount, date, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    values: [id, expense.category, expense.projectId, expense.amount, expense.date, expense.description || null],
  })
}

// Ferramentas
export async function getTools() {
  return executeQuery({
    query: `
      SELECT t.*, p.name as location_name
      FROM tools t
      LEFT JOIN projects p ON t.location = p.id
      ORDER BY t.name
    `,
  })
}

export async function createTool(tool) {
  const id = generateUUID()
  return executeQuery({
    query: `
      INSERT INTO tools (id, name, quantity, status, location, acquisition_date)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    values: [id, tool.name, tool.quantity, tool.status, tool.location || null, tool.acquisitionDate],
  })
}

// Orçamentos
export async function getBudgets() {
  return executeQuery({
    query: `
      SELECT b.*, p.name as project_name, p.client as client_name
      FROM budgets b
      JOIN projects p ON b.project_id = p.id
      ORDER BY b.date DESC
    `,
  })
}

export async function createBudget(budget) {
  const id = generateUUID()
  return executeQuery({
    query: `
      INSERT INTO budgets (id, project_id, price_per_square_meter, extra_costs, total_budget, status, date, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    values: [
      id,
      budget.projectId,
      budget.pricePerSquareMeter,
      budget.extraCosts,
      budget.totalBudget,
      budget.status,
      budget.date,
      budget.notes || null,
    ],
  })
}

// Autenticação
export async function getUserByEmail(email) {
  const users = await executeQuery({
    query: "SELECT * FROM users WHERE email = ?",
    values: [email],
  })

  return users.length > 0 ? users[0] : null
}
