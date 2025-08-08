import { useState } from "react";
import {
  Monitor,
  Activity,
  Thermometer,
  Droplets,
  Fish,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Eye,
  RefreshCw,
  Settings,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Monitoring() {
  const [selectedFarm, setSelectedFarm] = useState("all");
  const [autoRefresh, setAutoRefresh] = useState(true);

  const nurseryData = [
    {
      id: "a1",
      name: "Viveiro A-1",
      farm: "Fazenda São João",
      status: "Normal",
      population: 148500,
      biomass: 2495,
      averageWeight: 16.8,
      waterQuality: {
        oxygen: 6.8,
        ph: 7.8,
        temperature: 28.2,
        status: "Normal",
      },
      feeding: {
        lastFeed: "14:30",
        nextFeed: "18:00",
        dailyAmount: 98.0,
        consumed: 96.2,
        efficiency: 98,
      },
      health: {
        mortality24h: 450,
        mortalityRate: 0.3,
        healthStatus: "Bom",
        alerts: 0,
      },
      alerts: [],
    },
    {
      id: "a2",
      name: "Viveiro A-2",
      farm: "Fazenda São João",
      status: "Excelente",
      population: 95600,
      biomass: 1185,
      averageWeight: 12.4,
      waterQuality: {
        oxygen: 7.2,
        ph: 7.9,
        temperature: 27.8,
        status: "Excelente",
      },
      feeding: {
        lastFeed: "14:30",
        nextFeed: "18:00",
        dailyAmount: 47.2,
        consumed: 47.2,
        efficiency: 100,
      },
      health: {
        mortality24h: 120,
        mortalityRate: 0.12,
        healthStatus: "Excelente",
        alerts: 0,
      },
      alerts: [],
    },
    {
      id: "b1",
      name: "Viveiro B-1",
      farm: "Fazenda Santa Maria",
      status: "Atenção",
      population: 175200,
      biomass: 4959,
      averageWeight: 28.3,
      waterQuality: {
        oxygen: 5.2,
        ph: 7.6,
        temperature: 29.8,
        status: "Atenção",
      },
      feeding: {
        lastFeed: "12:00",
        nextFeed: "17:00",
        dailyAmount: 148.8,
        consumed: 142.1,
        efficiency: 95,
      },
      health: {
        mortality24h: 890,
        mortalityRate: 0.51,
        healthStatus: "Atenção",
        alerts: 1,
      },
      alerts: [
        {
          type: "water",
          message: "Oxigênio abaixo do ideal",
          severity: "medium",
        },
      ],
    },
    {
      id: "c1",
      name: "Viveiro C-1",
      farm: "Fazenda Boa Vista",
      status: "Crítico",
      population: 142800,
      biomass: 3156,
      averageWeight: 22.1,
      waterQuality: {
        oxygen: 4.8,
        ph: 7.2,
        temperature: 30.5,
        status: "Crítico",
      },
      feeding: {
        lastFeed: "08:00",
        nextFeed: "16:00",
        dailyAmount: 126.2,
        consumed: 89.5,
        efficiency: 71,
      },
      health: {
        mortality24h: 1250,
        mortalityRate: 0.87,
        healthStatus: "Crítico",
        alerts: 3,
      },
      alerts: [
        { type: "water", message: "Temperatura muito alta", severity: "high" },
        { type: "water", message: "Oxigênio crítico", severity: "high" },
        { type: "health", message: "Mortalidade elevada", severity: "high" },
      ],
    },
  ];

  const farmSummary = {
    total: {
      nurseries: 4,
      population: 562100,
      biomass: 11795,
      averageWeight: 21.0,
    },
    status: {
      excellent: 1,
      normal: 1,
      attention: 1,
      critical: 1,
    },
    alerts: {
      high: 3,
      medium: 1,
      low: 0,
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excelente":
        return "bg-green-100 text-green-800 border-green-200";
      case "Normal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Atenção":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Crítico":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "water":
        return <Droplets className="h-3 w-3" />;
      case "health":
        return <Activity className="h-3 w-3" />;
      case "feeding":
        return <Fish className="h-3 w-3" />;
      default:
        return <AlertTriangle className="h-3 w-3" />;
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return "text-green-600";
    if (efficiency >= 85) return "text-blue-600";
    if (efficiency >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Dashboard de Monitoramento
          </h1>
          <p className="text-muted-foreground">
            Visão em tempo real de todos os viveiros e indicadores
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Select value={selectedFarm} onValueChange={setSelectedFarm}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as fazendas</SelectItem>
              <SelectItem value="sao-joao">Fazenda São João</SelectItem>
              <SelectItem value="santa-maria">Fazenda Santa Maria</SelectItem>
              <SelectItem value="boa-vista">Fazenda Boa Vista</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? "bg-green-50 border-green-200" : ""}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`}
            />
            {autoRefresh ? "Atualização Ativa" : "Atualização Manual"}
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Farm Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Viveiros Monitorados
            </CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {farmSummary.total.nurseries}
            </div>
            <p className="text-xs text-muted-foreground">
              {farmSummary.status.excellent} excelente,{" "}
              {farmSummary.status.critical} crítico
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              População Total
            </CardTitle>
            <Fish className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(farmSummary.total.population / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">
              Biomassa: {(farmSummary.total.biomass / 1000).toFixed(1)} ton
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Peso Médio Geral
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {farmSummary.total.averageWeight}g
            </div>
            <p className="text-xs text-muted-foreground">
              Variação entre viveiros
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
            <div className="text-2xl font-bold">
              {farmSummary.alerts.high + farmSummary.alerts.medium}
            </div>
            <p className="text-xs text-muted-foreground">
              {farmSummary.alerts.high} críticos, {farmSummary.alerts.medium}{" "}
              médios
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Nursery Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {nurseryData.map((nursery) => (
          <Card
            key={nursery.id}
            className={`border-2 ${getStatusColor(nursery.status)}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(nursery.status)}
                  <div>
                    <CardTitle className="text-lg">{nursery.name}</CardTitle>
                    <CardDescription>{nursery.farm}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(nursery.status)}>
                    {nursery.status}
                  </Badge>
                  {nursery.alerts.length > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {nursery.alerts.length}
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">População</p>
                  <p className="font-medium">
                    {nursery.population.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Biomassa</p>
                  <p className="font-medium">
                    {nursery.biomass.toLocaleString()}kg
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Peso Médio</p>
                  <p className="font-medium">{nursery.averageWeight}g</p>
                </div>
              </div>

              {/* Water Quality */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-600" />
                    Qualidade da Água
                  </h4>
                  <Badge
                    className={getStatusColor(nursery.waterQuality.status)}
                    variant="outline"
                  >
                    {nursery.waterQuality.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-1 sm:gap-2 text-xs">
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-muted-foreground">O₂</p>
                    <p className="font-medium">{nursery.waterQuality.oxygen}</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-muted-foreground">pH</p>
                    <p className="font-medium">{nursery.waterQuality.ph}</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-muted-foreground">Temp</p>
                    <p className="font-medium">
                      {nursery.waterQuality.temperature}°C
                    </p>
                  </div>
                </div>
              </div>

              {/* Feeding */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Fish className="h-4 w-4 text-green-600" />
                    Alimentação
                  </h4>
                  <span
                    className={`text-xs font-medium ${getEfficiencyColor(nursery.feeding.efficiency)}`}
                  >
                    {nursery.feeding.efficiency}% eficiência
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Última: {nursery.feeding.lastFeed}</span>
                    <span>Próxima: {nursery.feeding.nextFeed}</span>
                  </div>
                  <Progress
                    value={nursery.feeding.efficiency}
                    className="h-1"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Planejado: {nursery.feeding.dailyAmount}kg</span>
                    <span>Consumido: {nursery.feeding.consumed}kg</span>
                  </div>
                </div>
              </div>

              {/* Health */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4 text-purple-600" />
                    Saúde
                  </h4>
                  <Badge
                    className={getStatusColor(nursery.health.healthStatus)}
                    variant="outline"
                  >
                    {nursery.health.healthStatus}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Mortalidade 24h</p>
                    <p className="font-medium">
                      {nursery.health.mortality24h.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Taxa</p>
                    <p className="font-medium">
                      {nursery.health.mortalityRate}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {nursery.alerts.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-red-600">
                    Alertas Ativos
                  </h4>
                  <div className="space-y-1">
                    {nursery.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs bg-red-50 p-2 rounded"
                      >
                        {getAlertIcon(alert.type)}
                        <span>{alert.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="alerts">Central de Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Status Geral por Fazenda</CardTitle>
                <CardDescription>
                  Distribuição de status entre os viveiros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Excelente</span>
                      <span>{farmSummary.status.excellent} viveiro(s)</span>
                    </div>
                    <Progress
                      value={
                        (farmSummary.status.excellent /
                          farmSummary.total.nurseries) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Normal</span>
                      <span>{farmSummary.status.normal} viveiro(s)</span>
                    </div>
                    <Progress
                      value={
                        (farmSummary.status.normal /
                          farmSummary.total.nurseries) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Atenção</span>
                      <span>{farmSummary.status.attention} viveiro(s)</span>
                    </div>
                    <Progress
                      value={
                        (farmSummary.status.attention /
                          farmSummary.total.nurseries) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Crítico</span>
                      <span>{farmSummary.status.critical} viveiro(s)</span>
                    </div>
                    <Progress
                      value={
                        (farmSummary.status.critical /
                          farmSummary.total.nurseries) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance de Alimentação</CardTitle>
                <CardDescription>
                  Eficiência de consumo por viveiro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nurseryData.map((nursery, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{nursery.name}</span>
                        <span
                          className={getEfficiencyColor(
                            nursery.feeding.efficiency,
                          )}
                        >
                          {nursery.feeding.efficiency}%
                        </span>
                      </div>
                      <Progress
                        value={nursery.feeding.efficiency}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendências dos Indicadores</CardTitle>
              <CardDescription>
                Evolução dos principais parâmetros nas últimas 24 horas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Qualidade da Água</h4>
                  {nurseryData.map((nursery, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{nursery.name}</span>
                      <div className="flex items-center gap-1">
                        {Math.random() > 0.5 ? (
                          <TrendingUp className="h-3 w-3 text-green-600" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-600" />
                        )}
                        <span>O₂: {nursery.waterQuality.oxygen}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Biomassa</h4>
                  {nurseryData.map((nursery, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{nursery.name}</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span>{nursery.biomass}kg</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Mortalidade</h4>
                  {nurseryData.map((nursery, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{nursery.name}</span>
                      <div className="flex items-center gap-1">
                        {nursery.health.mortalityRate < 0.5 ? (
                          <TrendingDown className="h-3 w-3 text-green-600" />
                        ) : (
                          <TrendingUp className="h-3 w-3 text-red-600" />
                        )}
                        <span>{nursery.health.mortalityRate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Central de Alertas</CardTitle>
              <CardDescription>
                Todos os alertas ativos do sistema de monitoramento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nurseryData.map((nursery) =>
                  nursery.alerts.map((alert, alertIndex) => (
                    <div
                      key={`${nursery.id}-${alertIndex}`}
                      className="flex items-center justify-between p-3 border rounded-lg bg-red-50 border-red-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-full">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div>
                          <p className="font-medium text-red-800">
                            {alert.message}
                          </p>
                          <p className="text-sm text-red-600">
                            {nursery.name} - {nursery.farm}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">
                          {alert.severity === "high" ? "Alto" : "Médio"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )),
                )}
                {nurseryData.every((n) => n.alerts.length === 0) && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <p className="text-green-600 font-medium">
                      Nenhum alerta ativo
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Todos os sistemas funcionando normalmente
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
