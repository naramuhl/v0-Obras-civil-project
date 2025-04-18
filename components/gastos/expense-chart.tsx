"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Materiais", value: 25000, color: "#3b82f6" },
  { name: "Transporte", value: 8000, color: "#f59e0b" },
  { name: "Mão de obra", value: 15000, color: "#10b981" },
  { name: "Equipamentos", value: 5000, color: "#6366f1" },
  { name: "Outros", value: 2000, color: "#8b5cf6" },
]

export function ExpenseChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR")}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
