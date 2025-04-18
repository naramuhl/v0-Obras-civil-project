"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  BarChart3,
  Briefcase,
  Calculator,
  CreditCard,
  Home,
  LogOut,
  Menu,
  Package,
  Receipt,
  Truck,
  User,
  Wrench,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSession } from "next-auth/react"

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Obras",
    icon: Briefcase,
    href: "/obras",
    color: "text-violet-500",
  },
  {
    label: "Orçamentos",
    icon: Calculator,
    href: "/orcamentos",
    color: "text-pink-700",
  },
  {
    label: "Pagamentos",
    icon: CreditCard,
    href: "/pagamentos",
    color: "text-orange-500",
  },
  {
    label: "Recibos",
    icon: Receipt,
    href: "/recibos",
    color: "text-emerald-500",
  },
  {
    label: "Gastos",
    icon: BarChart3,
    href: "/gastos",
    color: "text-red-500",
  },
  {
    label: "Materiais",
    icon: Package,
    href: "/materiais",
    color: "text-yellow-500",
  },
  {
    label: "Transporte",
    icon: Truck,
    href: "/transporte",
    color: "text-indigo-500",
  },
  {
    label: "Ferramentas",
    icon: Wrench,
    href: "/ferramentas",
    color: "text-green-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <MobileNav pathname={pathname} />
      </SheetContent>
      <div className="hidden border-r bg-gray-100/40 md:block dark:bg-gray-800/40">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Briefcase className="h-6 w-6" />
              <span>Construtor Civil</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    pathname === route.href ? "bg-muted text-primary" : "text-muted-foreground",
                  )}
                >
                  <route.icon className={cn("h-4 w-4", route.color)} />
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto border-t p-2">
            {session?.user && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 px-3 py-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{session.user.name || session.user.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Sheet>
  )
}

function MobileNav({ pathname }: { pathname: string }) {
  const { data: session } = useSession()

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Briefcase className="h-6 w-6" />
          <span>Construtor Civil</span>
        </Link>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <X className="h-5 w-5" />
          </Button>
        </SheetTrigger>
      </div>
      <nav className="grid gap-1 overflow-auto p-4 text-sm font-medium">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
              pathname === route.href ? "bg-muted text-primary" : "text-muted-foreground",
            )}
          >
            <route.icon className={cn("h-4 w-4", route.color)} />
            {route.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto border-t p-4">
        {session?.user && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-3 py-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{session.user.name || session.user.email}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
