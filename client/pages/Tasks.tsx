import { useState } from 'react'
import { 
  CheckSquare, 
  Clock,
  AlertTriangle,
  User,
  Calendar,
  Plus,
  Filter,
  CheckCircle,
  Play,
  Pause
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Checkbox } from '@/components/ui/checkbox'

export default function Tasks() {
  const [filter, setFilter] = useState('all')

  const tasks = [
    {
      id: 1,
      title: 'Arraçoamento Viveiro A-1 - 18:00',
      type: 'automatic',
      priority: 'high',
      status: 'pending',
      dueTime: '18:00',
      nursery: 'Viveiro A-1',
      description: 'Fornecer 24.5kg de ração 35% proteína',
      assignedTo: 'Maria Santos',
      estimated: '15 min',
      source: 'Sistema de Alimentação'
    },
    {
      id: 2,
      title: 'Coleta de Qualidade da Água - Manhã',
      type: 'automatic',
      priority: 'medium',
      status: 'pending',
      dueTime: '08:00',
      nursery: 'Todos os viveiros',
      description: 'Medir oxigênio, pH e temperatura',
      assignedTo: 'João Silva',
      estimated: '45 min',
      source: 'Programa de Monitoramento'
    },
    {
      id: 3,
      title: 'Inspeção Visual - Viveiro C-1',
      type: 'manual',
      priority: 'high',
      status: 'in_progress',
      dueTime: '16:30',
      nursery: 'Viveiro C-1',
      description: 'Verificar comportamento ap��s alta mortalidade',
      assignedTo: 'Dr. Ana Costa',
      estimated: '30 min',
      source: 'Alerta de Saúde'
    },
    {
      id: 4,
      title: 'Biometria Semanal - Viveiro B-1',
      type: 'automatic',
      priority: 'medium',
      status: 'completed',
      dueTime: '09:00',
      nursery: 'Viveiro B-1',
      description: 'Coletar 300 amostras para pesagem',
      assignedTo: 'Dr. Ana Costa',
      estimated: '60 min',
      source: 'Cronograma de Biometria'
    },
    {
      id: 5,
      title: 'Ajuste de Aeração - Viveiro B-1',
      type: 'manual',
      priority: 'medium',
      status: 'pending',
      dueTime: '20:00',
      nursery: 'Viveiro B-1',
      description: 'Aumentar aeração devido baixo oxigênio',
      assignedTo: 'Pedro Costa',
      estimated: '20 min',
      source: 'Alerta de Qualidade'
    },
    {
      id: 6,
      title: 'Reposição de Estoque - Ração 32%',
      type: 'automatic',
      priority: 'low',
      status: 'pending',
      dueTime: '10:00',
      nursery: 'Almoxarifado',
      description: 'Estoque baixo - solicitar 2 toneladas',
      assignedTo: 'João Silva',
      estimated: '30 min',
      source: 'Controle de Estoque'
    }
  ]

  const getTaskBadge = (type: string) => {
    return type === 'automatic' 
      ? <Badge variant="outline">Automática</Badge>
      : <Badge className="bg-blue-100 text-blue-800">Manual</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">Alta</Badge>
      case 'medium': return <Badge className="bg-yellow-100 text-yellow-800">Média</Badge>
      case 'low': return <Badge variant="secondary">Baixa</Badge>
      default: return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="outline">Pendente</Badge>
      case 'in_progress': return <Badge className="bg-blue-100 text-blue-800">Em Andamento</Badge>
      case 'completed': return <Badge className="bg-green-100 text-green-800">Concluída</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.type === filter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Painel de Tarefas</h1>
          <p className="text-muted-foreground">
            Gestão de tarefas automáticas e manuais do sistema
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Tarefa
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              2 alta prioridade
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Dr. Ana Costa
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas Hoje</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Taxa: 75%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automáticas</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Sistema gerenciado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="automatic">Automáticas</TabsTrigger>
          <TabsTrigger value="manual">Manuais</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Tarefas</CardTitle>
              <CardDescription>
                Tarefas pendentes, em andamento e concluídas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Status</TableHead>
                    <TableHead>Tarefa</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Tempo Est.</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <Checkbox 
                          checked={task.status === 'completed'} 
                          disabled={task.status === 'completed'}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {task.nursery} • {task.source}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTaskBadge(task.type)}
                      </TableCell>
                      <TableCell>
                        {getPriorityBadge(task.priority)}
                      </TableCell>
                      <TableCell className="font-medium">{task.dueTime}</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          {task.assignedTo}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{task.estimated}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {task.status === 'pending' && (
                            <Button size="sm" variant="outline">
                              Iniciar
                            </Button>
                          )}
                          {task.status === 'in_progress' && (
                            <Button size="sm">
                              Concluir
                            </Button>
                          )}
                          {task.status === 'completed' && (
                            <Button size="sm" variant="ghost" disabled>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automatic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tarefas Automáticas</CardTitle>
              <CardDescription>
                Tarefas geradas automaticamente pelo sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.filter(task => task.type === 'automatic').map((task) => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{task.title}</h4>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(task.priority)}
                        {getStatusBadge(task.status)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span>Origem: {task.source}</span>
                      <div className="flex items-center gap-4">
                        <span>Horário: {task.dueTime}</span>
                        <span>Responsável: {task.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tarefas Manuais</CardTitle>
              <CardDescription>
                Tarefas criadas manualmente pelos usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.filter(task => task.type === 'manual').map((task) => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{task.title}</h4>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(task.priority)}
                        {getStatusBadge(task.status)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span>Local: {task.nursery}</span>
                      <div className="flex items-center gap-4">
                        <span>Horário: {task.dueTime}</span>
                        <span>Responsável: {task.assignedTo}</span>
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
  )
}
