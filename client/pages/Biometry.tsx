import { useState } from "react";
import {
  Scale,
  TrendingUp,
  Target,
  BarChart3,
  Calculator,
  Plus,
  Calendar,
  Download,
  RefreshCw,
  Activity,
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
import { Textarea } from "@/components/ui/textarea";

export default function Biometry() {
  const [isAddMeasurementOpen, setIsAddMeasurementOpen] = useState(false);
  const [selectedNursery, setSelectedNursery] = useState("all");

  const currentBiometry = [
    {
      nursery: "Viveiro A-1",
      farm: "Fazenda São João",
      population: 148500,
      averageWeight: 16.8,
      biomass: 2495,
      uniformity: 85,
      lastMeasurement: "2024-01-12",
      weeklyGrowth: 0.8, // g/week
      estimatedHarvest: "2024-03-15",
      target: 35.0, // g
    },
    {
      nursery: "Viveiro A-2",
      farm: "Fazenda São João",
      population: 95600,
      averageWeight: 12.4,
      biomass: 1185,
      uniformity: 92,
      lastMeasurement: "2024-01-14",
      weeklyGrowth: 1.2,
      estimatedHarvest: "2024-03-28",
      target: 30.0,
    },
    {
      nursery: "Viveiro B-1",
      farm: "Fazenda Santa Maria",
      population: 175200,
      averageWeight: 28.3,
      biomass: 4959,
      uniformity: 78,
      lastMeasurement: "2024-01-13",
      weeklyGrowth: 0.6,
      estimatedHarvest: "2024-02-20",
      target: 35.0,
    },
    {
      nursery: "Viveiro C-1",
      farm: "Fazenda Boa Vista",
      population: 142800,
      averageWeight: 22.1,
      biomass: 3156,
      uniformity: 88,
      lastMeasurement: "2024-01-11",
      weeklyGrowth: 0.9,
      estimatedHarvest: "2024-03-05",
      target: 32.0,
    },
  ];

  const measurementHistory = [
    {
      id: 1,
      nursery: "Viveiro A-1",
      date: "2024-01-12",
      week: 8,
      sampleSize: 250,
      averageWeight: 16.8,
      weightRange: "14.2 - 19.5",
      uniformity: 85,
      biomass: 2495,
      operator: "Dr. Ana Costa",
      notes: "Crescimento dentro do esperado. Boa uniformidade.",
    },
    {
      id: 2,
      nursery: "Viveiro B-1",
      date: "2024-01-13",
      week: 12,
      sampleSize: 300,
      averageWeight: 28.3,
      weightRange: "24.1 - 32.8",
      uniformity: 78,
      biomass: 4959,
      operator: "Dr. Ana Costa",
      notes: "Variação de peso acima do ideal. Considerar classificação.",
    },
    {
      id: 3,
      nursery: "Viveiro A-2",
      date: "2024-01-14",
      week: 6,
      sampleSize: 200,
      averageWeight: 12.4,
      weightRange: "10.8 - 14.2",
      uniformity: 92,
      biomass: 1185,
      operator: "Maria Santos",
      notes: "Excelente uniformidade. Crescimento acelerado.",
    },
    {
      id: 4,
      nursery: "Viveiro C-1",
      date: "2024-01-11",
      week: 10,
      sampleSize: 280,
      averageWeight: 22.1,
      weightRange: "19.5 - 25.2",
      uniformity: 88,
      biomass: 3156,
      operator: "Pedro Costa",
      notes: "Crescimento consistente. Boa resposta ao manejo nutricional.",
    },
  ];

  const growthProjections = [
    {
      nursery: "Viveiro A-1",
      currentWeight: 16.8,
      targetWeight: 35.0,
      weeksRemaining: 11,
      requiredGrowth: 1.7, // g/week
      currentGrowth: 0.8,
      status: "Abaixo do esperado",
    },
    {
      nursery: "Viveiro A-2",
      currentWeight: 12.4,
      targetWeight: 30.0,
      weeksRemaining: 10,
      requiredGrowth: 1.8,
      currentGrowth: 1.2,
      status: "Abaixo do esperado",
    },
    {
      nursery: "Viveiro B-1",
      currentWeight: 28.3,
      targetWeight: 35.0,
      weeksRemaining: 5,
      requiredGrowth: 1.3,
      currentGrowth: 0.6,
      status: "Crítico",
    },
    {
      nursery: "Viveiro C-1",
      currentWeight: 22.1,
      targetWeight: 32.0,
      weeksRemaining: 7,
      requiredGrowth: 1.4,
      currentGrowth: 0.9,
      status: "Atenção",
    },
  ];

  const calculateBiomass = (population: number, averageWeight: number) => {
    return (population * averageWeight) / 1000; // Convert to kg
  };

  const getUniformityColor = (uniformity: number) => {
    if (uniformity >= 90) return "text-green-600";
    if (uniformity >= 80) return "text-blue-600";
    if (uniformity >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "No prazo":
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
      case "Atenção":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>
        );
      case "Abaixo do esperado":
        return (
          <Badge className="bg-orange-100 text-orange-800">{status}</Badge>
        );
      case "Crítico":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getProgressColor = (current: number, required: number) => {
    const ratio = current / required;
    if (ratio >= 1) return "bg-green-500";
    if (ratio >= 0.8) return "bg-blue-500";
    if (ratio >= 0.6) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Biometria</h1>
          <p className="text-muted-foreground">
            Controle de peso, uniformidade e cálculo automático de biomassa
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Dialog
            open={isAddMeasurementOpen}
            onOpenChange={setIsAddMeasurementOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Biometria
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Registrar Biometria</DialogTitle>
                <DialogDescription>
                  Registre os dados da medição biométrica do viveiro
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bio-nursery">Viveiro</Label>
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
                    <Label htmlFor="bio-date">Data da Medição</Label>
                    <Input
                      id="bio-date"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sample-size">Tamanho da Amostra</Label>
                    <Input id="sample-size" placeholder="250" type="number" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="avg-weight">Peso Médio (g)</Label>
                    <Input
                      id="avg-weight"
                      placeholder="16.8"
                      step="0.1"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="uniformity">Uniformidade (%)</Label>
                    <Input
                      id="uniformity"
                      placeholder="85"
                      type="number"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="min-weight">Peso Mínimo (g)</Label>
                    <Input
                      id="min-weight"
                      placeholder="14.2"
                      step="0.1"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="max-weight">Peso Máximo (g)</Label>
                    <Input
                      id="max-weight"
                      placeholder="19.5"
                      step="0.1"
                      type="number"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio-notes">Observações</Label>
                  <Textarea
                    id="bio-notes"
                    placeholder="Observações sobre a amostra, crescimento..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => setIsAddMeasurementOpen(false)}
                >
                  Registrar Biometria
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Recalcular Biomassa
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Relatório
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Biomassa Total
            </CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11.8 ton</div>
            <p className="text-xs text-muted-foreground">+280kg esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Peso Médio Geral
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20.1g</div>
            <p className="text-xs text-muted-foreground">
              +0.7g vs semana anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Uniformidade Média
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86%</div>
            <p className="text-xs text-muted-foreground">Dentro do aceitável</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa Crescimento
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.9g/sem</div>
            <p className="text-xs text-muted-foreground">Média dos viveiros</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Biometry Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Status Biométrico Atual</CardTitle>
          <CardDescription>
            Dados atualizados de peso, biomassa e uniformidade por viveiro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentBiometry.map((data, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Scale className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{data.nursery}</h4>
                      <p className="text-sm text-muted-foreground">
                        {data.farm}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Última medição
                    </p>
                    <p className="text-sm font-medium">
                      {data.lastMeasurement}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      População
                    </p>
                    <p className="text-lg font-medium">
                      {data.population.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Peso Médio
                    </p>
                    <p className="text-lg font-medium">{data.averageWeight}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Biomassa
                    </p>
                    <p className="text-lg font-medium">
                      {data.biomass.toLocaleString()}kg
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Uniformidade
                    </p>
                    <p
                      className={`text-lg font-medium ${getUniformityColor(data.uniformity)}`}
                    >
                      {data.uniformity}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Crescimento
                    </p>
                    <p className="text-lg font-medium">
                      {data.weeklyGrowth}g/sem
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso para meta ({data.target}g)</span>
                    <span>
                      {Math.round((data.averageWeight / data.target) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(data.averageWeight / data.target) * 100}
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Previsão de despesca: {data.estimatedHarvest}</span>
                    <span>Meta: {data.target}g</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="projections">Projeções</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Histórico de Medições</CardTitle>
                  <CardDescription>
                    Registro completo das biometrias realizadas
                  </CardDescription>
                </div>
                <Select
                  value={selectedNursery}
                  onValueChange={setSelectedNursery}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os viveiros</SelectItem>
                    <SelectItem value="a1">Viveiro A-1</SelectItem>
                    <SelectItem value="a2">Viveiro A-2</SelectItem>
                    <SelectItem value="b1">Viveiro B-1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Viveiro</TableHead>
                    <TableHead>Semana</TableHead>
                    <TableHead>Amostra</TableHead>
                    <TableHead>Peso Médio</TableHead>
                    <TableHead>Faixa de Peso</TableHead>
                    <TableHead>Uniformidade</TableHead>
                    <TableHead>Biomassa</TableHead>
                    <TableHead>Operador</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {measurementHistory.map((measurement) => (
                    <TableRow key={measurement.id}>
                      <TableCell className="text-sm">
                        {measurement.date}
                      </TableCell>
                      <TableCell className="font-medium">
                        {measurement.nursery}
                      </TableCell>
                      <TableCell>{measurement.week}</TableCell>
                      <TableCell>{measurement.sampleSize}</TableCell>
                      <TableCell className="font-medium">
                        {measurement.averageWeight}g
                      </TableCell>
                      <TableCell className="text-sm">
                        {measurement.weightRange}g
                      </TableCell>
                      <TableCell
                        className={getUniformityColor(measurement.uniformity)}
                      >
                        {measurement.uniformity}%
                      </TableCell>
                      <TableCell>
                        {measurement.biomass.toLocaleString()}kg
                      </TableCell>
                      <TableCell className="text-sm">
                        {measurement.operator}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projeções de Crescimento</CardTitle>
              <CardDescription>
                Análise de crescimento necessário para atingir metas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {growthProjections.map((projection, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Calculator className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{projection.nursery}</h4>
                          <p className="text-sm text-muted-foreground">
                            {projection.weeksRemaining} semanas para meta
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(projection.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Peso Atual
                        </p>
                        <p className="text-lg font-medium">
                          {projection.currentWeight}g
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Meta</p>
                        <p className="text-lg font-medium">
                          {projection.targetWeight}g
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Crescimento Atual
                        </p>
                        <p className="text-lg font-medium">
                          {projection.currentGrowth}g/sem
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Necessário
                        </p>
                        <p className="text-lg font-medium text-red-600">
                          {projection.requiredGrowth}g/sem
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso de crescimento</span>
                        <span>
                          {Math.round(
                            (projection.currentGrowth /
                              projection.requiredGrowth) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          (projection.currentGrowth /
                            projection.requiredGrowth) *
                          100
                        }
                        className="h-2"
                      />
                      <div className="text-xs text-muted-foreground">
                        {projection.currentGrowth < projection.requiredGrowth
                          ? `Déficit de ${(projection.requiredGrowth - projection.currentGrowth).toFixed(1)}g/sem`
                          : "Crescimento adequado"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Uniformidade</CardTitle>
                <CardDescription>
                  Distribuição de uniformidade entre viveiros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentBiometry.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{data.nursery}</span>
                        <span className={getUniformityColor(data.uniformity)}>
                          {data.uniformity}%
                        </span>
                      </div>
                      <Progress value={data.uniformity} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evolução da Biomassa</CardTitle>
                <CardDescription>
                  Crescimento da biomassa por viveiro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentBiometry.map((data, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{data.nursery}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.population.toLocaleString()} indivíduos
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium">
                          {data.biomass.toLocaleString()}kg
                        </p>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <TrendingUp className="h-3 w-3" />
                          <span>
                            +
                            {(
                              (data.weeklyGrowth * data.population) /
                              1000
                            ).toFixed(0)}
                            kg/sem
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
