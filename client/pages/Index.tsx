import { Link } from "react-router-dom";
import {
  Fish,
  Users,
  Building2,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Droplets,
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
import { Progress } from "@/components/ui/progress";

export default function Index() {
  const stats = [
    {
      title: "Fazendas Ativas",
      value: "12",
      change: "+2 este mês",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Viveiros em Produção",
      value: "48",
      change: "85% ocupação",
      icon: Fish,
      color: "text-primary",
    },
    {
      title: "Lotes Ativos",
      value: "34",
      change: "6 novos esta semana",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Estoque Total",
      value: "R$ 2.4M",
      change: "+12% vs mês anterior",
      icon: Package,
      color: "text-purple-600",
    },
  ];

  const recentActivity = [
    {
      action: "Novo lote povoado",
      detail: "Viveiro A1 - 150K PLs",
      time: "2h atrás",
      status: "success",
    },
    {
      action: "Alerta de qualidade água",
      detail: "Fazenda São João - Viveiro B3",
      time: "4h atrás",
      status: "warning",
    },
    {
      action: "Entrada de estoque",
      detail: "Ração Premium - 2,5 toneladas",
      time: "6h atrás",
      status: "info",
    },
    {
      action: "Despesca programada",
      detail: "Viveiro C2 - Amanhã 08:00",
      time: "1 dia",
      status: "pending",
    },
  ];

  const nurseryStatus = [
    { name: "Fazenda São João", active: 8, total: 12, performance: 85 },
    { name: "Fazenda Santa Maria", active: 6, total: 8, performance: 92 },
    { name: "Fazenda Boa Vista", active: 10, total: 15, performance: 78 },
    { name: "Fazenda Águas Claras", active: 5, total: 6, performance: 95 },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-responsive-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-responsive-sm">
              Visão geral das operações aquícolas
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/feeding" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">
                <Fish className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Novo Plano Alimentação</span>
                <span className="sm:hidden">Alimentação</span>
              </Button>
            </Link>
            <Link to="/monitoring" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                <TrendingUp className="h-4 w-4 mr-2" />
                Monitoramento
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Farm Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status das Fazendas</CardTitle>
            <CardDescription>
              Performance e ocupação dos viveiros
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {nurseryStatus.map((farm, index) => (
              <div key={index} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                  <span className="text-sm font-medium">{farm.name}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {farm.active}/{farm.total} viveiros
                  </span>
                </div>
                <Progress value={farm.performance} className="h-2" />
                <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-muted-foreground gap-1">
                  <span>Performance: {farm.performance}%</span>
                  <span>
                    Ocupação: {Math.round((farm.active / farm.total) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Últimas ações e alertas do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <div
                    className={`mt-1 p-1 rounded-full ${
                      activity.status === "success"
                        ? "bg-green-100 text-green-600"
                        : activity.status === "warning"
                          ? "bg-yellow-100 text-yellow-600"
                          : activity.status === "info"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {activity.status === "success" && (
                      <CheckCircle className="h-3 w-3" />
                    )}
                    {activity.status === "warning" && (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                    {activity.status === "info" && (
                      <Package className="h-3 w-3" />
                    )}
                    {activity.status === "pending" && (
                      <Clock className="h-3 w-3" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {activity.detail}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesso direto às principais funcionalidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Link to="/feeding" className="block">
              <Button variant="outline" className="w-full h-16 sm:h-20 flex-col gap-1 sm:gap-2 p-2">
                <Fish className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm text-center leading-tight">Arraçoamento</span>
              </Button>
            </Link>
            <Link to="/water-quality" className="block">
              <Button variant="outline" className="w-full h-16 sm:h-20 flex-col gap-1 sm:gap-2 p-2">
                <Droplets className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm text-center leading-tight">Qualidade Água</span>
              </Button>
            </Link>
            <Link to="/health" className="block">
              <Button variant="outline" className="w-full h-16 sm:h-20 flex-col gap-1 sm:gap-2 p-2">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm text-center leading-tight">Saúde Animal</span>
              </Button>
            </Link>
            <Link to="/biometry" className="block">
              <Button variant="outline" className="w-full h-16 sm:h-20 flex-col gap-1 sm:gap-2 p-2">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-xs sm:text-sm text-center leading-tight">Biometria</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
