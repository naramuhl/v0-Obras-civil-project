import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Package, Truck } from "lucide-react"

export function RecentExpenses() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9 bg-muted">
          <AvatarFallback>
            <Package className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Cimento CP-II</p>
          <p className="text-sm text-muted-foreground">Material - Obra Residencial Vila Nova</p>
        </div>
        <div className="ml-auto font-medium">R$ 2.450,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9 bg-muted">
          <AvatarFallback>
            <Truck className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Transporte de Areia</p>
          <p className="text-sm text-muted-foreground">Transporte - Obra Comercial Centro</p>
        </div>
        <div className="ml-auto font-medium">R$ 850,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9 bg-muted">
          <AvatarFallback>
            <Package className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Tijolos 9x19x19</p>
          <p className="text-sm text-muted-foreground">Material - Obra Residencial Jardins</p>
        </div>
        <div className="ml-auto font-medium">R$ 3.150,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9 bg-muted">
          <AvatarFallback>
            <Package className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Vergalhão 10mm</p>
          <p className="text-sm text-muted-foreground">Material - Obra Residencial Vila Nova</p>
        </div>
        <div className="ml-auto font-medium">R$ 1.750,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9 bg-muted">
          <AvatarFallback>
            <Truck className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Transporte de Equipamentos</p>
          <p className="text-sm text-muted-foreground">Transporte - Obra Comercial Centro</p>
        </div>
        <div className="ml-auto font-medium">R$ 650,00</div>
      </div>
    </div>
  )
}
