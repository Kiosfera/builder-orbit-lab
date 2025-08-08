import { useState } from "react";
import {
  Utensils,
  Clock,
  Calendar,
  Calculator,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Settings,
  Plus,
  Edit,
  Play,
  Pause,
  RefreshCw,
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

export default function Feeding() {
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const feedingPlans = [
    {
      id: 1,
      name: "Plano Padrão - Juvenil",
      nursery: "Viveiro A-1",
      farm: "Fazenda São João",
      feedType: "Ração 35% Proteína",
      feedingsPerDay: 4,
      biomass: 2450, // kg
      averageWeight: 16.5, // g
      status: "Ativo",
      lastFeeding: "14:30",
      nextFeeding: "18:00",
    },
    {
      id: 2,
      name: "Plano Intensivo - Engorda",
      nursery: "Viveiro B-1",
      farm: "Fazenda Santa Maria",
      feedType: "Ração 32% Proteína",
      feedingsPerDay: 3,
      biomass: 3820, // kg
      averageWeight: 28.2, // g
      status: "Ativo",
      lastFeeding: "12:00",
      nextFeeding: "17:00",
    },
    {
      id: 3,
      name: "Plano Reduzido - Pré-despesca",
      nursery: "Viveiro C-2",
      farm: "Fazenda Boa Vista",
      feedType: "Ração 30% Proteína",
      feedingsPerDay: 2,
      biomass: 4150, // kg
      averageWeight: 35.8, // g
      status: "Pausado",
      lastFeeding: "08:00",
      nextFeeding: "16:00",
    },
  ];

  const dailyFeedings = [
    {
      id: 1,
      time: "06:00",
      nursery: "Viveiro A-1",
      plannedAmount: 24.5, // kg
      actualAmount: 24.2, // kg
      status: "Executado",
      operatorConfirmed: true,
      operator: "Maria Santos",
      notes: "",
    },
    {
      id: 2,
      time: "10:00",
      nursery: "Viveiro A-1",
      plannedAmount: 24.5,
      actualAmount: 24.5,
      status: "Executado",
      operatorConfirmed: true,
      operator: "João Silva",
      notes: "",
    },
    {
      id: 3,
      time: "14:30",
      nursery: "Viveiro A-1",
      plannedAmount: 24.5,
      actualAmount: 23.8,
      status: "Executado",
      operatorConfirmed: true,
      operator: "Maria Santos",
      notes: "Reduzido por baixo consumo",
    },
    {
      id: 4,
      time: "18:00",
      nursery: "Viveiro A-1",
      plannedAmount: 24.5,
      actualAmount: null,
      status: "Pendente",
      operatorConfirmed: false,
      operator: null,
      notes: "",
    },
    {
      id: 5,
      time: "07:00",
      nursery: "Viveiro B-1",
      plannedAmount: 38.2,
      actualAmount: 38.2,
      status: "Executado",
      operatorConfirmed: true,
      operator: "Pedro Costa",
      notes: "",
    },
    {
      id: 6,
      time: "12:00",
      nursery: "Viveiro B-1",
      plannedAmount: 38.2,
      actualAmount: 38.2,
      status: "Executado",
      operatorConfirmed: true,
      operator: "Pedro Costa",
      notes: "",
    },
    {
      id: 7,
      time: "17:00",
      nursery: "Viveiro B-1",
      plannedAmount: 38.2,
      actualAmount: null,
      status: "Pendente",
      operatorConfirmed: false,
      operator: null,
      notes: "",
    },
  ];

  const stockIntegration = [
    {
      feedType: "Ração 35% Proteína",
      currentStock: 2850, // kg
      dailyConsumption: 98, // kg
      daysRemaining: 29,
      status: "Normal",
    },
    {
      feedType: "Ração 32% Proteína",
      currentStock: 1240, // kg
      dailyConsumption: 115, // kg
      daysRemaining: 11,
      status: "Baixo",
    },
    {
      feedType: "Ração 30% Proteína",
      currentStock: 890, // kg
      dailyConsumption: 83, // kg
      daysRemaining: 11,
      status: "Baixo",
    },
  ];

  const calculateFeedAmount = (biomass: number, averageWeight: number) => {
    // Simplified feeding rate calculation based on weight
    let feedingRate = 0.03; // 3% default
    if (averageWeight < 10)
      feedingRate = 0.05; // 5% for small fish
    else if (averageWeight < 20)
      feedingRate = 0.04; // 4% for medium fish
    else if (averageWeight < 30)
      feedingRate = 0.03; // 3% for large fish
    else feedingRate = 0.025; // 2.5% for very large fish

    return biomass * feedingRate;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
      case "Pausado":
        return <Badge variant="secondary">{status}</Badge>;
      case "Executado":
        return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
      case "Pendente":
        return <Badge variant="outline">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStockStatus = (status: string) => {
    switch (status) {
      case "Normal":
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
      case "Baixo":
        return <Badge variant="destructive">{status}</Badge>;
      case "Crítico":
        return <Badge className="bg-red-100 text-red-800">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Arraçoamento Automatizado
          </h1>
          <p className="text-muted-foreground">
            Configuração de planos, cálculos automáticos e painel diário
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Dialog open={isAddPlanOpen} onOpenChange={setIsAddPlanOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Plano
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Criar Plano de Alimentação</DialogTitle>
                <DialogDescription>
                  Configure um novo plano automatizado de alimentação
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="plan-name">Nome do Plano</Label>
                    <Input id="plan-name" placeholder="Ex: Plano Juvenil A-1" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="plan-nursery">Viveiro</Label>
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="feed-type">Tipo de Ração</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a ração" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="35">Ração 35% Proteína</SelectItem>
                        <SelectItem value="32">Ração 32% Proteína</SelectItem>
                        <SelectItem value="30">Ração 30% Proteína</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="feedings-day">Refeições por Dia</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Número de refeições" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 refeições</SelectItem>
                        <SelectItem value="3">3 refeições</SelectItem>
                        <SelectItem value="4">4 refeições</SelectItem>
                        <SelectItem value="5">5 refeições</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="biomass">Biomassa Atual (kg)</Label>
                    <Input id="biomass" placeholder="2450" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="avg-weight">Peso Médio (g)</Label>
                    <Input id="avg-weight" placeholder="16.5" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="feeding-rate">Taxa Alimentar (%)</Label>
                    <Input id="feeding-rate" placeholder="3.0" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsAddPlanOpen(false)}>
                  Criar Plano
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Recalcular Todos
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planos Ativos</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 pausado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consumo Diário
            </CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">296 kg</div>
            <p className="text-xs text-muted-foreground">+12% vs ontem</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Refeições Hoje
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5/7</div>
            <p className="text-xs text-muted-foreground">2 pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eficiência</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97%</div>
            <p className="text-xs text-muted-foreground">Taxa de execução</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">Planos de Alimentação</TabsTrigger>
          <TabsTrigger value="daily">Painel Diário</TabsTrigger>
          <TabsTrigger value="stock">Integração Estoque</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Planos de Alimentação Configurados</CardTitle>
              <CardDescription>
                Gerencie planos automáticos com cálculo baseado em biometria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plano</TableHead>
                    <TableHead>Viveiro</TableHead>
                    <TableHead>Ração</TableHead>
                    <TableHead>Biomassa</TableHead>
                    <TableHead>Refeições/Dia</TableHead>
                    <TableHead>Próxima Refeição</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedingPlans.map((plan) => {
                    const dailyAmount = calculateFeedAmount(
                      plan.biomass,
                      plan.averageWeight,
                    );
                    const perFeedingAmount = dailyAmount / plan.feedingsPerDay;

                    return (
                      <TableRow key={plan.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{plan.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {plan.farm}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{plan.nursery}</TableCell>
                        <TableCell className="text-sm">
                          {plan.feedType}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{plan.biomass.toLocaleString()} kg</p>
                            <p className="text-xs text-muted-foreground">
                              {dailyAmount.toFixed(1)} kg/dia
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{plan.feedingsPerDay}x</p>
                            <p className="text-xs text-muted-foreground">
                              {perFeedingAmount.toFixed(1)} kg/refeição
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {plan.nextFeeding}
                        </TableCell>
                        <TableCell>{getStatusBadge(plan.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              {plan.status === "Ativo" ? (
                                <Pause className="h-3 w-3" />
                              ) : (
                                <Play className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Painel Diário de Arraçoamento</CardTitle>
                  <CardDescription>
                    Acompanhe e confirme as refeições do dia
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="date-picker">Data:</Label>
                  <Input
                    id="date-picker"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-40"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Horário</TableHead>
                    <TableHead>Viveiro</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Executado</TableHead>
                    <TableHead>Operador</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Observações</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailyFeedings.map((feeding) => (
                    <TableRow key={feeding.id}>
                      <TableCell className="font-medium">
                        {feeding.time}
                      </TableCell>
                      <TableCell>{feeding.nursery}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>Planejado: {feeding.plannedAmount} kg</p>
                          {feeding.actualAmount && (
                            <p className="text-xs text-muted-foreground">
                              Executado: {feeding.actualAmount} kg
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {feeding.actualAmount ? (
                          <div className="flex items-center gap-1">
                            {feeding.actualAmount === feeding.plannedAmount ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            )}
                            <span className="text-sm">
                              {feeding.actualAmount} kg
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Pendente
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {feeding.operator || "-"}
                      </TableCell>
                      <TableCell>{getStatusBadge(feeding.status)}</TableCell>
                      <TableCell className="text-sm max-w-[200px] truncate">
                        {feeding.notes || "-"}
                      </TableCell>
                      <TableCell>
                        {feeding.status === "Pendente" && (
                          <Button size="sm" className="h-8">
                            Confirmar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integração com Controle de Estoque</CardTitle>
              <CardDescription>
                Monitoramento automático do consumo e estoque de ração
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockIntegration.map((stock, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{stock.feedType}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>
                            Estoque: {stock.currentStock.toLocaleString()} kg
                          </span>
                          <span>
                            Consumo diário: {stock.dailyConsumption} kg
                          </span>
                        </div>
                      </div>
                      {getStockStatus(stock.status)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Dias restantes</span>
                        <span className="font-medium">
                          {stock.daysRemaining} dias
                        </span>
                      </div>
                      <Progress
                        value={(stock.daysRemaining / 30) * 100}
                        className="h-2"
                      />
                      {stock.daysRemaining <= 15 && (
                        <div className="flex items-center gap-2 text-sm text-amber-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Recomendado reabastecer em breve</span>
                        </div>
                      )}
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
