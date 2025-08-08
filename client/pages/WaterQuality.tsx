import { useState } from "react";
import {
  Droplets,
  Thermometer,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Plus,
  Calendar,
  Clock,
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
import { Progress } from "@/components/ui/progress";

export default function WaterQuality() {
  const [isAddReadingOpen, setIsAddReadingOpen] = useState(false);
  const [selectedNursery, setSelectedNursery] = useState("all");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const parameters = [
    {
      name: "Oxigênio Dissolvido",
      unit: "mg/L",
      min: 5.0,
      max: 8.0,
      optimal: "6.0-7.5",
      icon: Activity,
    },
    {
      name: "pH",
      unit: "",
      min: 7.0,
      max: 8.5,
      optimal: "7.5-8.0",
      icon: Droplets,
    },
    {
      name: "Temperatura",
      unit: "°C",
      min: 26,
      max: 30,
      optimal: "27-29",
      icon: Thermometer,
    },
    {
      name: "Amônia Total",
      unit: "mg/L",
      min: 0,
      max: 0.5,
      optimal: "< 0.25",
      icon: Droplets,
    },
    {
      name: "Nitrito",
      unit: "mg/L",
      min: 0,
      max: 0.3,
      optimal: "< 0.15",
      icon: Droplets,
    },
    {
      name: "Alcalinidade",
      unit: "mg/L CaCO3",
      min: 80,
      max: 200,
      optimal: "100-150",
      icon: Droplets,
    },
  ];

  const currentReadings = [
    {
      nursery: "Viveiro A-1",
      farm: "Fazenda São João",
      oxygen: 6.8,
      ph: 7.8,
      temperature: 28.2,
      ammonia: 0.15,
      nitrite: 0.08,
      alkalinity: 125,
      timestamp: "2024-01-15 08:30",
      status: "Normal",
    },
    {
      nursery: "Viveiro A-2",
      farm: "Fazenda São João",
      oxygen: 5.2,
      ph: 7.6,
      temperature: 29.8,
      ammonia: 0.28,
      nitrite: 0.12,
      alkalinity: 110,
      timestamp: "2024-01-15 08:45",
      status: "Atenção",
    },
    {
      nursery: "Viveiro B-1",
      farm: "Fazenda Santa Maria",
      oxygen: 7.2,
      ph: 8.1,
      temperature: 27.5,
      ammonia: 0.08,
      nitrite: 0.05,
      alkalinity: 135,
      timestamp: "2024-01-15 09:00",
      status: "Excelente",
    },
    {
      nursery: "Viveiro C-1",
      farm: "Fazenda Boa Vista",
      oxygen: 4.8,
      ph: 7.2,
      temperature: 30.5,
      ammonia: 0.45,
      nitrite: 0.25,
      alkalinity: 85,
      timestamp: "2024-01-15 09:15",
      status: "Crítico",
    },
  ];

  const historyReadings = [
    {
      id: 1,
      nursery: "Viveiro A-1",
      parameter: "Oxigênio Dissolvido",
      value: 6.8,
      unit: "mg/L",
      timestamp: "2024-01-15 08:30",
      operator: "Maria Santos",
      status: "Normal",
    },
    {
      id: 2,
      nursery: "Viveiro A-1",
      parameter: "pH",
      value: 7.8,
      unit: "",
      timestamp: "2024-01-15 08:30",
      operator: "Maria Santos",
      status: "Normal",
    },
    {
      id: 3,
      nursery: "Viveiro A-2",
      parameter: "Amônia Total",
      value: 0.28,
      unit: "mg/L",
      timestamp: "2024-01-15 08:45",
      operator: "João Silva",
      status: "Atenção",
    },
    {
      id: 4,
      nursery: "Viveiro C-1",
      parameter: "Oxigênio Dissolvido",
      value: 4.8,
      unit: "mg/L",
      timestamp: "2024-01-15 09:15",
      operator: "Pedro Costa",
      status: "Crítico",
    },
  ];

  const checkParameterStatus = (value: number, parameter: any) => {
    if (value < parameter.min || value > parameter.max) {
      return "Crítico";
    } else if (parameter.name === "Oxigênio Dissolvido") {
      if (value >= 6.0 && value <= 7.5) return "Excelente";
      else if (value >= 5.0 && value <= 8.0) return "Normal";
      else return "Atenção";
    } else if (parameter.name === "pH") {
      if (value >= 7.5 && value <= 8.0) return "Excelente";
      else if (value >= 7.0 && value <= 8.5) return "Normal";
      else return "Atenção";
    } else if (parameter.name === "Temperatura") {
      if (value >= 27 && value <= 29) return "Excelente";
      else if (value >= 26 && value <= 30) return "Normal";
      else return "Atenção";
    }
    return "Normal";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Excelente":
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
      case "Normal":
        return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
      case "Atenção":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>
        );
      case "Crítico":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Excelente":
      case "Normal":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Atenção":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "Crítico":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTrendIcon = () => {
    const trend = Math.random() > 0.5 ? "up" : "down";
    return trend === "up" ? (
      <TrendingUp className="h-3 w-3 text-green-600" />
    ) : (
      <TrendingDown className="h-3 w-3 text-red-600" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Qualidade da Água
          </h1>
          <p className="text-muted-foreground">
            Monitoramento de parâmetros físico-químicos dos viveiros
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Dialog open={isAddReadingOpen} onOpenChange={setIsAddReadingOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Leitura
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Registrar Leitura de Qualidade</DialogTitle>
                <DialogDescription>
                  Insira os parâmetros coletados no viveiro
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="reading-nursery">Viveiro</Label>
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
                    <Label htmlFor="reading-time">Data/Hora</Label>
                    <Input
                      id="reading-time"
                      type="datetime-local"
                      defaultValue={new Date().toISOString().slice(0, 16)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="oxygen">Oxigênio (mg/L)</Label>
                    <Input
                      id="oxygen"
                      placeholder="6.8"
                      step="0.1"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ph">pH</Label>
                    <Input id="ph" placeholder="7.8" step="0.1" type="number" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="temperature">Temperatura (°C)</Label>
                    <Input
                      id="temperature"
                      placeholder="28.2"
                      step="0.1"
                      type="number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="ammonia">Amônia (mg/L)</Label>
                    <Input
                      id="ammonia"
                      placeholder="0.15"
                      step="0.01"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="nitrite">Nitrito (mg/L)</Label>
                    <Input
                      id="nitrite"
                      placeholder="0.08"
                      step="0.01"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="alkalinity">Alcalinidade (mg/L)</Label>
                    <Input id="alkalinity" placeholder="125" type="number" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => setIsAddReadingOpen(false)}
                >
                  Registrar Leitura
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar Dados
          </Button>
        </div>
      </div>

      {/* Parameter Standards */}
      <Card>
        <CardHeader>
          <CardTitle>Parâmetros de Referência</CardTitle>
          <CardDescription>
            Faixas ideais para cultivo de camarão marinho
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parameters.map((param, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <param.icon className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">{param.name}</h4>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    Mínimo: {param.min} {param.unit}
                  </p>
                  <p>
                    Máximo: {param.max} {param.unit}
                  </p>
                  <p className="font-medium text-foreground">
                    Ideal: {param.optimal} {param.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Viveiros Monitorados
            </CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Última leitura: hoje
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status Geral</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">
              Dentro dos parâmetros
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Alertas Ativos
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              1 crítico, 1 atenção
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Temperatura Média
            </CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.5°C</div>
            <p className="text-xs text-muted-foreground">Variação: ±1.2°C</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Leituras Atuais</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Status Atual dos Viveiros</CardTitle>
                  <CardDescription>
                    Últimas leituras de qualidade da água por viveiro
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
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
                      <SelectItem value="c1">Viveiro C-1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentReadings.map((reading, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(reading.status)}
                        <div>
                          <h4 className="font-medium">{reading.nursery}</h4>
                          <p className="text-sm text-muted-foreground">
                            {reading.farm}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(reading.status)}
                        <span className="text-xs text-muted-foreground">
                          {reading.timestamp}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Activity className="h-3 w-3 text-blue-600" />
                          <span className="text-xs text-muted-foreground">
                            O₂
                          </span>
                        </div>
                        <p className="text-lg font-medium">{reading.oxygen}</p>
                        <p className="text-xs text-muted-foreground">mg/L</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Droplets className="h-3 w-3 text-purple-600" />
                          <span className="text-xs text-muted-foreground">
                            pH
                          </span>
                        </div>
                        <p className="text-lg font-medium">{reading.ph}</p>
                        <p className="text-xs text-muted-foreground">-</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Thermometer className="h-3 w-3 text-red-600" />
                          <span className="text-xs text-muted-foreground">
                            Temp
                          </span>
                        </div>
                        <p className="text-lg font-medium">
                          {reading.temperature}
                        </p>
                        <p className="text-xs text-muted-foreground">°C</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Droplets className="h-3 w-3 text-amber-600" />
                          <span className="text-xs text-muted-foreground">
                            NH₃
                          </span>
                        </div>
                        <p className="text-lg font-medium">{reading.ammonia}</p>
                        <p className="text-xs text-muted-foreground">mg/L</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Droplets className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-muted-foreground">
                            NO₂
                          </span>
                        </div>
                        <p className="text-lg font-medium">{reading.nitrite}</p>
                        <p className="text-xs text-muted-foreground">mg/L</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Droplets className="h-3 w-3 text-cyan-600" />
                          <span className="text-xs text-muted-foreground">
                            Alc
                          </span>
                        </div>
                        <p className="text-lg font-medium">
                          {reading.alkalinity}
                        </p>
                        <p className="text-xs text-muted-foreground">mg/L</p>
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
                  <CardTitle>Histórico de Leituras</CardTitle>
                  <CardDescription>
                    Registro completo de medições por parâmetro
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                  <Input
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
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Viveiro</TableHead>
                    <TableHead>Parâmetro</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Operador</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historyReadings.map((reading) => (
                    <TableRow key={reading.id}>
                      <TableCell className="text-sm">
                        {reading.timestamp}
                      </TableCell>
                      <TableCell className="font-medium">
                        {reading.nursery}
                      </TableCell>
                      <TableCell>{reading.parameter}</TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {reading.value} {reading.unit}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(reading.status)}</TableCell>
                      <TableCell className="text-sm">
                        {reading.operator}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Tendências</CardTitle>
              <CardDescription>
                Evolução dos parâmetros ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parameters.map((param, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <param.icon className="h-4 w-4 text-primary" />
                        <h4 className="font-medium">{param.name}</h4>
                      </div>
                      {getTrendIcon()}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Média (7 dias)</span>
                        <span className="font-medium">
                          {param.name === "Oxigênio Dissolvido" && "6.2 mg/L"}
                          {param.name === "pH" && "7.7"}
                          {param.name === "Temperatura" && "28.5°C"}
                          {param.name === "Amônia Total" && "0.18 mg/L"}
                          {param.name === "Nitrito" && "0.09 mg/L"}
                          {param.name === "Alcalinidade" && "118 mg/L"}
                        </span>
                      </div>
                      <Progress value={Math.random() * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Min: {param.min}</span>
                        <span>Max: {param.max}</span>
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
