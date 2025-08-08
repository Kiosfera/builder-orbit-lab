import { useState } from 'react'
import { 
  Building2, 
  MapPin, 
  Plus, 
  Edit,
  Trash2,
  MoreHorizontal,
  Fish,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function Farm() {
  const [isAddFarmOpen, setIsAddFarmOpen] = useState(false)
  const [isAddNurseryOpen, setIsAddNurseryOpen] = useState(false)

  const farms = [
    {
      id: 1,
      name: 'Fazenda São João',
      location: 'São João da Barra, RJ',
      area: '45 hectares',
      nurseries: 12,
      activeNurseries: 8,
      status: 'Ativa',
      manager: 'João Silva'
    },
    {
      id: 2,
      name: 'Fazenda Santa Maria',
      location: 'Campos dos Goytacazes, RJ',
      area: '32 hectares',
      nurseries: 8,
      activeNurseries: 6,
      status: 'Ativa',
      manager: 'Maria Santos'
    },
    {
      id: 3,
      name: 'Fazenda Boa Vista',
      location: 'Macaé, RJ',
      area: '67 hectares',
      nurseries: 15,
      activeNurseries: 10,
      status: 'Manutenção',
      manager: 'Pedro Costa'
    }
  ]

  const nurseries = [
    {
      id: 1,
      name: 'Viveiro A-1',
      farm: 'Fazenda São João',
      area: '2,5 hectares',
      depth: '1,8m',
      status: 'Em Cultivo',
      lotId: 'LT-2024-001',
      population: '150.000 PLs',
      hasActiveLot: true
    },
    {
      id: 2,
      name: 'Viveiro A-2',
      farm: 'Fazenda São João',
      area: '2,2 hectares',
      depth: '1,6m',
      status: 'Preparação',
      lotId: null,
      population: null,
      hasActiveLot: false
    },
    {
      id: 3,
      name: 'Viveiro B-1',
      farm: 'Fazenda Santa Maria',
      area: '3,0 hectares',
      depth: '2,0m',
      status: 'Em Cultivo',
      lotId: 'LT-2024-002',
      population: '180.000 PLs',
      hasActiveLot: true
    },
    {
      id: 4,
      name: 'Viveiro B-2',
      farm: 'Fazenda Santa Maria',
      area: '2,8 hectares',
      depth: '1,9m',
      status: 'Disponível',
      lotId: null,
      population: null,
      hasActiveLot: false
    },
    {
      id: 5,
      name: 'Viveiro C-1',
      farm: 'Fazenda Boa Vista',
      area: '4,2 hectares',
      depth: '2,2m',
      status: 'Manutenção',
      lotId: null,
      population: null,
      hasActiveLot: false
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Em Cultivo':
        return <Fish className="h-4 w-4 text-blue-600" />
      case 'Preparação':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'Disponível':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'Manutenção':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Em Cultivo':
        return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>
      case 'Preparação':
        return <Badge variant="secondary">{status}</Badge>
      case 'Disponível':
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>
      case 'Manutenção':
        return <Badge variant="destructive">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Minha Fazenda</h1>
          <p className="text-muted-foreground">
            Gerencie fazendas, viveiros e controle de status
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Dialog open={isAddNurseryOpen} onOpenChange={setIsAddNurseryOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Fish className="h-4 w-4 mr-2" />
                Novo Viveiro
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Viveiro</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo viveiro.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nursery-name">Nome do Viveiro</Label>
                  <Input id="nursery-name" placeholder="Ex: Viveiro A-3" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nursery-farm">Fazenda</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Selecione a fazenda</option>
                    {farms.map(farm => (
                      <option key={farm.id} value={farm.id}>{farm.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nursery-area">Área (hectares)</Label>
                    <Input id="nursery-area" placeholder="2,5" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nursery-depth">Profundidade (m)</Label>
                    <Input id="nursery-depth" placeholder="1,8" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nursery-notes">Observações</Label>
                  <Textarea id="nursery-notes" placeholder="Informações adicionais..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsAddNurseryOpen(false)}>
                  Cadastrar Viveiro
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddFarmOpen} onOpenChange={setIsAddFarmOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Fazenda
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Cadastrar Nova Fazenda</DialogTitle>
                <DialogDescription>
                  Preencha os dados da nova fazenda.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="farm-name">Nome da Fazenda</Label>
                  <Input id="farm-name" placeholder="Ex: Fazenda Águas Claras" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="farm-location">Localização</Label>
                  <Input id="farm-location" placeholder="Cidade, Estado" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="farm-area">Área Total (hectares)</Label>
                  <Input id="farm-area" placeholder="50" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="farm-manager">Responsável</Label>
                  <Input id="farm-manager" placeholder="Nome do responsável" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="farm-notes">Observações</Label>
                  <Textarea id="farm-notes" placeholder="Informações adicionais..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsAddFarmOpen(false)}>
                  Cadastrar Fazenda
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Fazendas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              144 hectares totais
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Viveiros Totais</CardTitle>
            <Fish className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35</div>
            <p className="text-xs text-muted-foreground">
              24 em produção
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              24 de 35 viveiros
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Manutenção</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Retorno previsto: 3 dias
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="farms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="farms">Fazendas</TabsTrigger>
          <TabsTrigger value="nurseries">Viveiros</TabsTrigger>
        </TabsList>

        <TabsContent value="farms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fazendas Cadastradas</CardTitle>
              <CardDescription>
                Gerencie as fazendas e suas informações básicas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fazenda</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Área</TableHead>
                    <TableHead>Viveiros</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {farms.map((farm) => (
                    <TableRow key={farm.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{farm.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Resp.: {farm.manager}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{farm.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>{farm.area}</TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {farm.activeNurseries}/{farm.nurseries} ativos
                        </span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(farm.status)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Fish className="h-4 w-4 mr-2" />
                              Ver Viveiros
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nurseries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Controle de Viveiros</CardTitle>
              <CardDescription>
                Gerencie viveiros, status e controle de bloqueio para edição
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Viveiro</TableHead>
                    <TableHead>Fazenda</TableHead>
                    <TableHead>Dimensões</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Lote/População</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nurseries.map((nursery) => (
                    <TableRow key={nursery.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getStatusIcon(nursery.status)}
                          <div>
                            <p className="font-medium">{nursery.name}</p>
                            {nursery.hasActiveLot && (
                              <div className="flex items-center gap-1 text-xs text-amber-600">
                                <Lock className="h-3 w-3" />
                                <span>Bloqueado para edição</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{nursery.farm}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{nursery.area}</p>
                          <p className="text-xs text-muted-foreground">
                            Prof.: {nursery.depth}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(nursery.status)}
                      </TableCell>
                      <TableCell>
                        {nursery.lotId ? (
                          <div className="text-sm">
                            <p className="font-medium">{nursery.lotId}</p>
                            <p className="text-xs text-muted-foreground">
                              {nursery.population}
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem disabled={nursery.hasActiveLot}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Fish className="h-4 w-4 mr-2" />
                              Historico
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              disabled={nursery.hasActiveLot}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
