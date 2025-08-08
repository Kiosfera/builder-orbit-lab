import { useState } from "react";
import {
  Fish,
  Plus,
  Calculator,
  DollarSign,
  Users,
  Droplets,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Edit,
  Eye,
  MoreHorizontal,
  Download,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

export default function Stocking() {
  const [isAddLotOpen, setIsAddLotOpen] = useState(false);
  const [isDistributePLOpen, setIsDistributePLOpen] = useState(false);
  const [selectedLot, setSelectedLot] = useState("");

  const stockingLots = [
    {
      id: "LT-2024-001",
      nursery: "Viveiro A-1",
      farm: "Fazenda São João",
      stockingDate: "2023-10-15",
      plSupplier: "Larvicultura XYZ",
      initialPLs: 150000,
      plCost: 0.08, // R$ per PL
      totalPLCost: 12000,
      preparationCost: 2500,
      totalCost: 14500,
      survivalRate: 95,
      currentPopulation: 142500,
      currentDay: 92,
      status: "Em Cultivo",
      plQuality: "Excelente",
      notes: "PLs de boa qualidade, uniformes",
    },
    {
      id: "LT-2024-002",
      nursery: "Viveiro B-1",
      farm: "Fazenda Santa Maria",
      stockingDate: "2023-09-20",
      plSupplier: "Aqua Larvae Ltd",
      initialPLs: 180000,
      plCost: 0.075,
      totalPLCost: 13500,
      preparationCost: 3200,
      totalCost: 16700,
      survivalRate: 97,
      currentPopulation: 174600,
      currentDay: 117,
      status: "Pré-despesca",
      plQuality: "Boa",
      notes: "Adaptação rápida ao ambiente",
    },
    {
      id: "LT-2024-003",
      nursery: "Viveiro A-2",
      farm: "Fazenda São João",
      stockingDate: "2023-11-28",
      plSupplier: "Larvicultura ABC",
      initialPLs: 120000,
      plCost: 0.085,
      totalPLCost: 10200,
      preparationCost: 1800,
      totalCost: 12000,
      survivalRate: 88,
      currentPopulation: 105600,
      currentDay: 48,
      status: "Em Cultivo",
      plQuality: "Regular",
      notes: "Mortalidade inicial acima do esperado",
    },
  ];

  const plDistribution = [
    {
      id: 1,
      lotId: "LT-2024-004",
      totalPLs: 200000,
      distributions: [
        { nursery: "Viveiro C-1", quantity: 80000, percentage: 40 },
        { nursery: "Viveiro C-2", quantity: 70000, percentage: 35 },
        { nursery: "Viveiro C-3", quantity: 50000, percentage: 25 },
      ],
      distributionDate: "2024-01-20",
      status: "Planejado",
      supplier: "Larvicultura XYZ",
    },
  ];

  const preparationCosts = [
    {
      nursery: "Viveiro A-1",
      farm: "Fazenda São João",
      preparationItems: [
        {
          item: "Calcário",
          quantity: 500,
          unit: "kg",
          unitCost: 0.45,
          total: 225,
        },
        {
          item: "Fertilizante orgânico",
          quantity: 300,
          unit: "kg",
          unitCost: 2.8,
          total: 840,
        },
        {
          item: "Probiótico",
          quantity: 50,
          unit: "kg",
          unitCost: 28.0,
          total: 1400,
        },
        {
          item: "Mão de obra",
          quantity: 8,
          unit: "horas",
          unitCost: 15.0,
          total: 120,
        },
      ],
      totalCost: 2585,
      date: "2023-10-10",
    },
  ];

  const suppliers = [
    {
      name: "Larvicultura XYZ",
      location: "Natal, RN",
      specialties: ["Litopenaeus vannamei"],
      avgPrice: 0.08,
      quality: "Excelente",
      reliability: 95,
      lastOrder: "2024-01-15",
    },
    {
      name: "Aqua Larvae Ltd",
      location: "Fortaleza, CE",
      specialties: ["Litopenaeus vannamei", "Penaeus monodon"],
      avgPrice: 0.075,
      quality: "Boa",
      reliability: 92,
      lastOrder: "2024-01-10",
    },
    {
      name: "Larvicultura ABC",
      location: "João Pessoa, PB",
      specialties: ["Litopenaeus vannamei"],
      avgPrice: 0.085,
      quality: "Regular",
      reliability: 88,
      lastOrder: "2024-01-05",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Em Cultivo":
        return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
      case "Pré-despesca":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>
        );
      case "Planejado":
        return <Badge variant="outline">{status}</Badge>;
      case "Finalizado":
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case "Excelente":
        return <Badge className="bg-green-100 text-green-800">{quality}</Badge>;
      case "Boa":
        return <Badge className="bg-blue-100 text-blue-800">{quality}</Badge>;
      case "Regular":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">{quality}</Badge>
        );
      default:
        return <Badge variant="outline">{quality}</Badge>;
    }
  };

  const calculateSurvivalImpact = (initial: number, survival: number) => {
    return Math.round(initial * (survival / 100));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Povoamento de Lotes
          </h1>
          <p className="text-muted-foreground">
            Registro de lotes, distribuição de PLs e controle de custos
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Dialog
            open={isDistributePLOpen}
            onOpenChange={setIsDistributePLOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Distribuir PLs
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Distribuição Manual de PLs</DialogTitle>
                <DialogDescription>
                  Distribua as pós-larvas entre os viveiros disponíveis
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="total-pls">Total de PLs</Label>
                    <Input id="total-pls" placeholder="200000" type="number" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="supplier">Fornecedor</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o fornecedor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xyz">Larvicultura XYZ</SelectItem>
                        <SelectItem value="aqua">Aqua Larvae Ltd</SelectItem>
                        <SelectItem value="abc">Larvicultura ABC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Distribuição por Viveiro</Label>
                  <div className="grid gap-3">
                    <div className="grid grid-cols-4 gap-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Viveiro" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="c1">Viveiro C-1</SelectItem>
                          <SelectItem value="c2">Viveiro C-2</SelectItem>
                          <SelectItem value="c3">Viveiro C-3</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="Quantidade" type="number" />
                      <Input placeholder="%" type="number" />
                      <Button variant="outline" size="sm">
                        Remover
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Viveiro" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="c1">Viveiro C-1</SelectItem>
                          <SelectItem value="c2">Viveiro C-2</SelectItem>
                          <SelectItem value="c3">Viveiro C-3</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="Quantidade" type="number" />
                      <Input placeholder="%" type="number" />
                      <Button variant="outline" size="sm">
                        Remover
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Viveiro
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => setIsDistributePLOpen(false)}
                >
                  Confirmar Distribuição
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddLotOpen} onOpenChange={setIsAddLotOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Lote
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Registrar Novo Lote</DialogTitle>
                <DialogDescription>
                  Registre o povoamento de um novo lote no viveiro
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="lot-nursery">Viveiro</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o viveiro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a1">Viveiro A-1</SelectItem>
                        <SelectItem value="a2">Viveiro A-2</SelectItem>
                        <SelectItem value="b1">Viveiro B-1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stocking-date">Data do Povoamento</Label>
                    <Input
                      id="stocking-date"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="pl-supplier">Fornecedor de PLs</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o fornecedor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="xyz">Larvicultura XYZ</SelectItem>
                        <SelectItem value="aqua">Aqua Larvae Ltd</SelectItem>
                        <SelectItem value="abc">Larvicultura ABC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="pl-quality">Qualidade dos PLs</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Avalie a qualidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excelente</SelectItem>
                        <SelectItem value="good">Boa</SelectItem>
                        <SelectItem value="regular">Regular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="initial-pls">Número de PLs</Label>
                    <Input
                      id="initial-pls"
                      placeholder="150000"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="pl-cost">Custo por PL (R$)</Label>
                    <Input
                      id="pl-cost"
                      placeholder="0.08"
                      step="0.001"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="total-pl-cost">Custo Total PLs</Label>
                    <Input
                      id="total-pl-cost"
                      placeholder="12000"
                      type="number"
                      disabled
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="preparation-cost">
                      Custo de Preparação (R$)
                    </Label>
                    <Input
                      id="preparation-cost"
                      placeholder="2500"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="survival-estimate">
                      Sobrevivência Estimada (%)
                    </Label>
                    <Input
                      id="survival-estimate"
                      placeholder="95"
                      type="number"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lot-notes">Observações</Label>
                  <Textarea
                    id="lot-notes"
                    placeholder="Notas sobre qualidade, transporte, condições..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsAddLotOpen(false)}>
                  Registrar Lote
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
            <CardTitle className="text-sm font-medium">Lotes Ativos</CardTitle>
            <Fish className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">450K PLs totais</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Investimento Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 43.2K</div>
            <p className="text-xs text-muted-foreground">
              Custo médio: R$ 0.096/PL
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sobrevivência Média
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93.3%</div>
            <p className="text-xs text-muted-foreground">
              422.7K população atual
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Fornecedores Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Qualidade média: Boa
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="lots" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lots">Lotes Registrados</TabsTrigger>
          <TabsTrigger value="distribution">Distribuição PLs</TabsTrigger>
          <TabsTrigger value="costs">Custos de Preparação</TabsTrigger>
          <TabsTrigger value="suppliers">Fornecedores</TabsTrigger>
        </TabsList>

        <TabsContent value="lots" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Lotes de Povoamento</CardTitle>
                  <CardDescription>
                    Controle de lotes, custos e população atual
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lote</TableHead>
                    <TableHead>Viveiro</TableHead>
                    <TableHead>Data Povoamento</TableHead>
                    <TableHead>PLs Iniciais</TableHead>
                    <TableHead>População Atual</TableHead>
                    <TableHead>Sobrevivência</TableHead>
                    <TableHead>Custo Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockingLots.map((lot) => (
                    <TableRow key={lot.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{lot.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {lot.plSupplier}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{lot.nursery}</p>
                          <p className="text-xs text-muted-foreground">
                            {lot.farm}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {lot.stockingDate}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {lot.initialPLs.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            R$ {lot.plCost.toFixed(3)}/PL
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {lot.currentPopulation.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Dia {lot.currentDay}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {lot.survivalRate}%
                          </span>
                          {lot.survivalRate >= 95 ? (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          ) : lot.survivalRate >= 90 ? (
                            <AlertTriangle className="h-3 w-3 text-yellow-600" />
                          ) : (
                            <AlertTriangle className="h-3 w-3 text-red-600" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            R$ {lot.totalCost.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {getQualityBadge(lot.plQuality)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(lot.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calculator className="h-4 w-4 mr-2" />
                              Calcular Custos
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

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição Manual de PLs</CardTitle>
              <CardDescription>
                Planejamento e execução da distribuição entre viveiros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {plDistribution.map((dist) => (
                  <div key={dist.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">Lote {dist.lotId}</h4>
                        <p className="text-sm text-muted-foreground">
                          {dist.totalPLs.toLocaleString()} PLs - {dist.supplier}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(dist.status)}
                        <span className="text-sm text-muted-foreground">
                          {dist.distributionDate}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {dist.distributions.map((nurseryDist, index) => (
                        <div key={index} className="border rounded p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">
                              {nurseryDist.nursery}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {nurseryDist.percentage}%
                            </span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg font-bold">
                              {nurseryDist.quantity.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PLs designados
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custos de Preparação</CardTitle>
              <CardDescription>
                Detalhamento dos custos de preparação por viveiro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {preparationCosts.map((cost, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">{cost.nursery}</h4>
                        <p className="text-sm text-muted-foreground">
                          {cost.farm}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          R$ {cost.totalCost.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {cost.date}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {cost.preparationItems.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center justify-between text-sm"
                        >
                          <span>{item.item}</span>
                          <div className="flex items-center gap-4 text-muted-foreground">
                            <span>
                              {item.quantity} {item.unit}
                            </span>
                            <span>
                              R$ {item.unitCost.toFixed(2)}/{item.unit}
                            </span>
                            <span className="font-medium text-foreground">
                              R$ {item.total}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fornecedores de PLs</CardTitle>
              <CardDescription>
                Gestão de fornecedores e histórico de qualidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suppliers.map((supplier, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{supplier.name}</h4>
                      {getQualityBadge(supplier.quality)}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Localização:
                        </span>
                        <span>{supplier.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Preço médio:
                        </span>
                        <span>R$ {supplier.avgPrice.toFixed(3)}/PL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Confiabilidade:
                        </span>
                        <span>{supplier.reliability}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Último pedido:
                        </span>
                        <span>{supplier.lastOrder}</span>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs text-muted-foreground mb-1">
                          Especialidades:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {supplier.specialties.map((specialty, specIndex) => (
                            <Badge
                              key={specIndex}
                              variant="outline"
                              className="text-xs"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
