import { useState } from "react";
import {
  Archive,
  Clock,
  TrendingUp,
  Download,
  Search,
  Calendar,
  Fish,
  Scale,
  DollarSign,
  BarChart3,
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
import { Progress } from "@/components/ui/progress";

export default function CycleHistory() {
  const [isCloseCycleOpen, setIsCloseCycleOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const activeCycles = [
    {
      id: "LT-2024-001",
      nursery: "Viveiro A-1",
      farm: "Fazenda São João",
      startDate: "2023-10-15",
      currentDay: 92,
      estimatedDays: 120,
      initialPopulation: 150000,
      currentPopulation: 148500,
      initialWeight: 0.8,
      currentWeight: 16.8,
      biomass: 2495,
      status: "Em Cultivo",
      performance: 85,
    },
    {
      id: "LT-2024-002",
      nursery: "Viveiro B-1",
      farm: "Fazenda Santa Maria",
      startDate: "2023-09-20",
      currentDay: 117,
      estimatedDays: 125,
      initialPopulation: 180000,
      currentPopulation: 175200,
      initialWeight: 0.9,
      currentWeight: 28.3,
      biomass: 4959,
      status: "Pré-despesca",
      performance: 92,
    },
    {
      id: "LT-2024-003",
      nursery: "Viveiro A-2",
      farm: "Fazenda São João",
      startDate: "2023-11-28",
      currentDay: 48,
      estimatedDays: 110,
      initialPopulation: 120000,
      currentPopulation: 95600,
      initialWeight: 0.7,
      currentWeight: 12.4,
      biomass: 1185,
      status: "Em Cultivo",
      performance: 78,
    },
  ];

  const closedCycles = [
    {
      id: "LT-2023-098",
      nursery: "Viveiro C-2",
      farm: "Fazenda Boa Vista",
      startDate: "2023-06-10",
      endDate: "2023-11-15",
      duration: 158,
      initialPopulation: 160000,
      finalPopulation: 152800,
      survivalRate: 95.5,
      initialWeight: 0.8,
      finalWeight: 32.5,
      totalHarvest: 4966,
      averagePrice: 28.5,
      revenue: 141530,
      performance: 94,
      status: "Finalizado",
    },
    {
      id: "LT-2023-097",
      nursery: "Viveiro A-3",
      farm: "Fazenda São João",
      startDate: "2023-05-20",
      endDate: "2023-10-25",
      duration: 158,
      initialPopulation: 140000,
      finalPopulation: 134600,
      survivalRate: 96.1,
      initialWeight: 0.9,
      finalWeight: 30.2,
      totalHarvest: 4065,
      averagePrice: 26.8,
      revenue: 108942,
      performance: 89,
      status: "Finalizado",
    },
    {
      id: "LT-2023-096",
      nursery: "Viveiro B-2",
      farm: "Fazenda Santa Maria",
      startDate: "2023-04-15",
      endDate: "2023-09-20",
      duration: 158,
      initialPopulation: 170000,
      finalPopulation: 159650,
      survivalRate: 93.9,
      initialWeight: 0.8,
      finalWeight: 28.8,
      totalHarvest: 4598,
      averagePrice: 27.2,
      revenue: 125066,
      performance: 91,
      status: "Finalizado",
    },
  ];

  const performanceMetrics = {
    totalCycles: 48,
    averageDuration: 152,
    averageSurvival: 94.2,
    averageWeight: 29.8,
    totalProduction: 186.5, // tons
    averagePerformance: 89,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Em Cultivo":
        return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
      case "Pré-despesca":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>
        );
      case "Finalizado":
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-green-600";
    if (performance >= 80) return "text-blue-600";
    if (performance >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredClosedCycles = closedCycles.filter(
    (cycle) =>
      cycle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cycle.nursery.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Fechamento de Ciclo e Histórico
          </h1>
          <p className="text-muted-foreground">
            Gestão de despesca, arquivo de dados e histórico de lotes
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Dialog open={isCloseCycleOpen} onOpenChange={setIsCloseCycleOpen}>
            <DialogTrigger asChild>
              <Button>
                <Archive className="h-4 w-4 mr-2" />
                Fechar Ciclo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Fechar Ciclo de Cultivo</DialogTitle>
                <DialogDescription>
                  Registre os dados finais da despesca
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cycle-id">Lote</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o lote" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lt1">
                          LT-2024-001 (Viveiro A-1)
                        </SelectItem>
                        <SelectItem value="lt2">
                          LT-2024-002 (Viveiro B-1)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="harvest-date">Data da Despesca</Label>
                    <Input
                      id="harvest-date"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="final-population">População Final</Label>
                    <Input
                      id="final-population"
                      placeholder="148500"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="final-weight">Peso Final Médio (g)</Label>
                    <Input
                      id="final-weight"
                      placeholder="35.2"
                      step="0.1"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="total-harvest">Total Despescado (kg)</Label>
                    <Input
                      id="total-harvest"
                      placeholder="5224"
                      type="number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sale-price">Preço de Venda (R$/kg)</Label>
                    <Input
                      id="sale-price"
                      placeholder="28.50"
                      step="0.01"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="buyer">Comprador</Label>
                    <Input id="buyer" placeholder="Frigorífico ABC" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => setIsCloseCycleOpen(false)}
                >
                  Finalizar Ciclo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Relatório Geral
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ciclos Realizados
            </CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceMetrics.totalCycles}
            </div>
            <p className="text-xs text-muted-foreground">
              Duração média: {performanceMetrics.averageDuration} dias
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sobrevivência Média
            </CardTitle>
            <Fish className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceMetrics.averageSurvival}%
            </div>
            <p className="text-xs text-muted-foreground">
              Peso final: {performanceMetrics.averageWeight}g
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Produção Total
            </CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceMetrics.totalProduction} ton
            </div>
            <p className="text-xs text-muted-foreground">Últimos 12 meses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Performance Geral
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceMetrics.averagePerformance}%
            </div>
            <p className="text-xs text-muted-foreground">
              Índice de eficiência
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Ciclos Ativos</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ciclos em Andamento</CardTitle>
              <CardDescription>
                Lotes atualmente em cultivo e próximos à despesca
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCycles.map((cycle) => (
                  <div key={cycle.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Fish className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{cycle.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            {cycle.nursery} - {cycle.farm}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(cycle.status)}
                        <span
                          className={`text-sm font-medium ${getPerformanceColor(cycle.performance)}`}
                        >
                          {cycle.performance}% performance
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Dias de Cultivo
                        </p>
                        <p className="font-medium">
                          {cycle.currentDay}/{cycle.estimatedDays}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          População
                        </p>
                        <p className="font-medium">
                          {cycle.currentPopulation.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Peso Médio
                        </p>
                        <p className="font-medium">{cycle.currentWeight}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Biomassa
                        </p>
                        <p className="font-medium">
                          {cycle.biomass.toLocaleString()}kg
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Sobrevivência
                        </p>
                        <p className="font-medium">
                          {(
                            (cycle.currentPopulation /
                              cycle.initialPopulation) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso do ciclo</span>
                        <span>
                          {Math.round(
                            (cycle.currentDay / cycle.estimatedDays) * 100,
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={(cycle.currentDay / cycle.estimatedDays) * 100}
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Início: {cycle.startDate}</span>
                        <span>
                          Previsão de despesca:{" "}
                          {
                            new Date(
                              new Date(cycle.startDate).getTime() +
                                cycle.estimatedDays * 24 * 60 * 60 * 1000,
                            )
                              .toISOString()
                              .split("T")[0]
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Histórico de Ciclos</CardTitle>
                  <CardDescription>
                    Registro completo de ciclos finalizados
                  </CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar lote..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lote</TableHead>
                    <TableHead>Viveiro</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead>Sobrevivência</TableHead>
                    <TableHead>Peso Final</TableHead>
                    <TableHead>Produção</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClosedCycles.map((cycle) => (
                    <TableRow key={cycle.id}>
                      <TableCell className="font-medium">{cycle.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{cycle.nursery}</p>
                          <p className="text-xs text-muted-foreground">
                            {cycle.farm}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {cycle.startDate} a {cycle.endDate}
                      </TableCell>
                      <TableCell>{cycle.duration} dias</TableCell>
                      <TableCell className="font-medium">
                        {cycle.survivalRate}%
                      </TableCell>
                      <TableCell>{cycle.finalWeight}g</TableCell>
                      <TableCell>
                        {cycle.totalHarvest.toLocaleString()}kg
                      </TableCell>
                      <TableCell className="text-green-600 font-medium">
                        R$ {cycle.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={getPerformanceColor(cycle.performance)}
                        >
                          {cycle.performance}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance por Viveiro</CardTitle>
                <CardDescription>
                  Análise de performance dos últimos ciclos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Viveiro A-1</span>
                      <span className="text-green-600">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Viveiro A-2</span>
                      <span className="text-blue-600">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Viveiro B-1</span>
                      <span className="text-green-600">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Viveiro C-1</span>
                      <span className="text-yellow-600">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendências de Produção</CardTitle>
                <CardDescription>
                  Evolução da produtividade ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sobrevivência Média</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-green-600 font-medium">+2.1%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Peso Final Médio</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-green-600 font-medium">+1.8g</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Duração Média</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-red-600" />
                      <span className="text-red-600 font-medium">+3 dias</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Receita por Ciclo</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-green-600 font-medium">+8.5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
