"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    gastos: 4000,
    receitas: 2400,
  },
  {
    name: "Fev",
    gastos: 3000,
    receitas: 1398,
  },
  {
    name: "Mar",
    gastos: 2000,
    receitas: 9800,
  },
  {
    name: "Abr",
    gastos: 2780,
    receitas: 3908,
  },
  {
    name: "Mai",
    gastos: 1890,
    receitas: 4800,
  },
  {
    name: "Jun",
    gastos: 2390,
    receitas: 3800,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="gastos" fill="#ef4444" name="Gastos" />
        <Bar dataKey="receitas" fill="#22c55e" name="Receitas" />
      </BarChart>
    </ResponsiveContainer>
  )
}
