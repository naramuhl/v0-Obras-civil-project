import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentPayments() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">João da Silva</p>
          <p className="text-sm text-muted-foreground">Pagamento semanal - Obra Residencial Vila Nova</p>
        </div>
        <div className="ml-auto font-medium">R$ 1.250,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Maria Santos</p>
          <p className="text-sm text-muted-foreground">Pagamento semanal - Obra Comercial Centro</p>
        </div>
        <div className="ml-auto font-medium">R$ 1.350,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>PO</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Pedro Oliveira</p>
          <p className="text-sm text-muted-foreground">Pagamento semanal - Obra Residencial Jardins</p>
        </div>
        <div className="ml-auto font-medium">R$ 1.150,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ana Martins</p>
          <p className="text-sm text-muted-foreground">Pagamento semanal - Obra Residencial Vila Nova</p>
        </div>
        <div className="ml-auto font-medium">R$ 1.250,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Carlos Souza</p>
          <p className="text-sm text-muted-foreground">Pagamento semanal - Obra Comercial Centro</p>
        </div>
        <div className="ml-auto font-medium">R$ 1.350,00</div>
      </div>
    </div>
  )
}
