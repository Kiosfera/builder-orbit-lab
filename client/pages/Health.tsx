import { useState } from 'react'
import { 
  Heart, 
  AlertTriangle,
  TrendingDown,
  Eye,
  Activity,
  Skull,
  FileText,
  Calendar,
  Plus,
  Search,
  Filter,
  Download
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'

export default function Health() {
  const [isAddObservationOpen, setIsAddObservationOpen] = useState(false)
  const [isAddMortalityOpen, setIsAddMortalityOpen] = useState(false)
  const [selectedNursery, setSelectedNursery] = useState('all')

  const healthOverview = [
    {
      nursery: 'Viveiro A-1',
      farm: 'Fazenda São João',
      population: 148500,
      lastMortality: 450,
      mortalityRate: 0.3, // %
      healthStatus: 'Bom',
      lastObservation: '2024-01-15 14:30',
      alerts: 0
    },
    {
      nursery: 'Viveiro A-2', 
      farm: 'Fazenda São João',
      population: 95600,
      lastMortality: 120,
      mortalityRate: 0.12,
      healthStatus: 'Excelente',
      lastObservation: '2024-01-15 08:45',
      alerts: 0
    },
    {
      nursery: 'Viveiro B-1',
      farm: 'Fazenda Santa Maria', 
      population: 175200,
      lastMortality: 890,
      mortalityRate: 0.51,
      healthStatus: 'Atenção',
      lastObservation: '2024-01-15 16:20',
      alerts: 1
    },
    {
      nursery: 'Viveiro C-1',
      farm: 'Fazenda Boa Vista',
      population: 142800,
      lastMortality: 1250,
      mortalityRate: 0.87,
      healthStatus: 'Crítico',
      lastObservation: '2024-01-15 12:15',
      alerts: 3
    }
  ]

  const clinicalObservations = [
    {
      id: 1,
      nursery: 'Viveiro B-1',
      timestamp: '2024-01-15 16:20',
      operator: 'Dr. Ana Costa',
      type: 'Inspeção Visual',
      observations: 'Comportamento lento em alguns indivíduos. Presença de organismos em superfície.',
      severity: 'Atenção',
      actions: 'Aumentar aeração. Coletar amostras para análise.',
      followUp: '2024-01-16'
    },
    {
      id: 2,
      nursery: 'Viveiro C-1',
      timestamp: '2024-01-15 12:15',
      operator: 'Dr. Ana Costa',
      type: 'Exame Clínico',
      observations: 'Sinais de estresse. Coloração alterada. Possível início de doença.',
      severity: 'Crítico',
      actions: 'Isolamento de amostra. Tratamento preventivo. Monitoramento intensivo.',
      followUp: '2024-01-15'
    },
    {
      id: 3,
      nursery: 'Viveiro A-1',
      timestamp: '2024-01-15 14:30',
      operator: 'Maria Santos',
      type: 'Rotina',
      observations: 'Comportamento normal. Boa atividade alimentar. Sem sinais aparentes.',
      severity: 'Normal',
      actions: 'Manter monitoramento rotineiro.',
      followUp: '2024-01-17'
    }
  ]

  const mortalityRecords = [
    {
      id: 1,
      nursery: 'Viveiro C-1',
      date: '2024-01-15',
      time: '09:00',
      quantity: 1250,
      cause: 'Doença (Suspeita)',
      operator: 'Pedro Costa',
      weight: 28.5, // g average
      biomassImpact: 35.6, // kg
      observations: 'Mortalidade concentrada em uma área específica do viveiro.'
    },
    {
      id: 2,
      nursery: 'Viveiro B-1', 
      date: '2024-01-15',
      time: '14:00',
      quantity: 890,
      cause: 'Estresse',
      operator: 'João Silva',
      weight: 22.3,
      biomassImpact: 19.8,
      observations: 'Relacionado à mudança brusca de temperatura.'
    },
    {
      id: 3,
      nursery: 'Viveiro A-1',
      date: '2024-01-15',
      time: '06:30',
      quantity: 450,
      cause: 'Natural',
      operator: 'Maria Santos',
      weight: 16.8,
      biomassImpact: 7.6,
      observations: 'Mortalidade dentro dos parâmetros normais.'
    }
  ]

  const diseases = [
    {
      name: 'Vibriose',
      risk: 'Alto',
      symptoms: 'Letargia, falta de apetite, coloração alterada',
      prevention: 'Controle de qualidade da água, probióticos'
    },
    {
      name: 'Síndrome da Mancha Branca',
      risk: 'Médio',
      symptoms: 'Manchas brancas no exoesqueleto, mortalidade súbita',
      prevention: 'Biossegurança, controle de vetores'
    },
    {
      name: 'Necrose Hepatopancreática',
      risk: 'Médio',
      symptoms: 'Crescimento lento, hepatopâncreas pálido',
      prevention: 'Qualidade da ração, probióticos'
    }
  ]

  const getHealthBadge = (status: string) => {
    switch (status) {
      case 'Excelente':
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>
      case 'Bom':
        return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>
      case 'Atenção':
        return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>
      case 'Crítico':
        return <Badge variant="destructive">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Normal':
        return <Badge className="bg-green-100 text-green-800">{severity}</Badge>
      case 'Atenção':
        return <Badge className="bg-yellow-100 text-yellow-800">{severity}</Badge>
      case 'Crítico':
        return <Badge variant="destructive">{severity}</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'Baixo':
        return <Badge className="bg-green-100 text-green-800">{risk}</Badge>
      case 'Médio':
        return <Badge className="bg-yellow-100 text-yellow-800">{risk}</Badge>
      case 'Alto':
        return <Badge variant="destructive">{risk}</Badge>
      default:
        return <Badge variant="outline">{risk}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Saúde Animal</h1>
          <p className="text-muted-foreground">
            Observações clínicas, mortalidade e monitoramento sanitário
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Dialog open={isAddMortalityOpen} onOpenChange={setIsAddMortalityOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Skull className="h-4 w-4 mr-2" />
                Registrar Mortalidade
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Registrar Mortalidade</DialogTitle>
                <DialogDescription>
                  Registre a mortalidade observada no viveiro
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mort-nursery">Viveiro</Label>
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
                    <Label htmlFor="mort-time">Data/Hora</Label>
                    <Input 
                      id="mort-time" 
                      type="datetime-local" 
                      defaultValue={new Date().toISOString().slice(0, 16)} 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mort-quantity">Quantidade</Label>
                    <Input id="mort-quantity" placeholder="1250" type="number" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mort-weight">Peso Médio (g)</Label>
                    <Input id="mort-weight" placeholder="28.5" step="0.1" type="number" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mort-cause">Causa Provável</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a causa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="natural">Natural</SelectItem>
                      <SelectItem value="stress">Estresse</SelectItem>
                      <SelectItem value="disease">Doença (Suspeita)</SelectItem>
                      <SelectItem value="water">Qualidade da Água</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mort-obs">Observações</Label>
                  <Textarea id="mort-obs" placeholder="Descreva as circunstâncias..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsAddMortalityOpen(false)}>
                  Registrar Mortalidade
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddObservationOpen} onOpenChange={setIsAddObservationOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Observação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Registrar Observação Clínica</DialogTitle>
                <DialogDescription>
                  Documente observações sobre a saúde dos animais
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="obs-nursery">Viveiro</Label>
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
                    <Label htmlFor="obs-type">Tipo de Inspeção</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Rotina</SelectItem>
                        <SelectItem value="visual">Inspeção Visual</SelectItem>
                        <SelectItem value="clinical">Exame Clínico</SelectItem>
                        <SelectItem value="emergency">Emergência</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="obs-severity">Severidade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Nível de severidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="attention">Atenção</SelectItem>
                      <SelectItem value="critical">Crítico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="observations">Observações</Label>
                  <Textarea 
                    id="observations" 
                    placeholder="Descreva o comportamento, sinais clínicos, aparência..." 
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="actions">Ações Tomadas</Label>
                  <Textarea 
                    id="actions" 
                    placeholder="Medidas tomadas ou recomendações..." 
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="followup">Próximo Acompanhamento</Label>
                  <Input id="followup" type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsAddObservationOpen(false)}>
                  Registrar Observação
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
            <CardTitle className="text-sm font-medium">Taxa Mortalidade</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.46%</div>
            <p className="text-xs text-muted-foreground">
              Últimas 24h
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Viveiros Saudáveis</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/4</div>
            <p className="text-xs text-muted-foreground">
              50% em condições ideais
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Requer atenção
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Observações Hoje</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              1 crítica
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Nursery Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Status de Saúde por Viveiro</CardTitle>
          <CardDescription>
            Visão geral da condição sanitária de cada viveiro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthOverview.map((nursery, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{nursery.nursery}</h4>
                      <p className="text-sm text-muted-foreground">{nursery.farm}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getHealthBadge(nursery.healthStatus)}
                    {nursery.alerts > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {nursery.alerts} alerta{nursery.alerts > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">População</p>
                    <p className="text-lg font-medium">{nursery.population.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mortalidade 24h</p>
                    <p className="text-lg font-medium">{nursery.lastMortality.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Taxa Mortalidade</p>
                    <p className="text-lg font-medium">{nursery.mortalityRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Última Observação</p>
                    <p className="text-sm">{nursery.lastObservation}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Saúde Geral</span>
                    <span>{nursery.healthStatus}</span>
                  </div>
                  <Progress 
                    value={
                      nursery.healthStatus === 'Excelente' ? 95 :
                      nursery.healthStatus === 'Bom' ? 80 :
                      nursery.healthStatus === 'Atenção' ? 60 : 30
                    } 
                    className="h-2" 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="observations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="observations">Observações Clínicas</TabsTrigger>
          <TabsTrigger value="mortality">Mortalidade</TabsTrigger>
          <TabsTrigger value="diseases">Doenças</TabsTrigger>
        </TabsList>

        <TabsContent value="observations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Observações Clínicas</CardTitle>
                  <CardDescription>
                    Registro de inspeções e observações sanitárias
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Viveiro</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Observações</TableHead>
                    <TableHead>Severidade</TableHead>
                    <TableHead>Próximo Acompanhamento</TableHead>
                    <TableHead>Operador</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clinicalObservations.map((obs) => (
                    <TableRow key={obs.id}>
                      <TableCell className="text-sm">{obs.timestamp}</TableCell>
                      <TableCell className="font-medium">{obs.nursery}</TableCell>
                      <TableCell>{obs.type}</TableCell>
                      <TableCell className="max-w-[300px]">
                        <p className="text-sm truncate">{obs.observations}</p>
                        {obs.actions && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Ações: {obs.actions}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        {getSeverityBadge(obs.severity)}
                      </TableCell>
                      <TableCell className="text-sm">{obs.followUp}</TableCell>
                      <TableCell className="text-sm">{obs.operator}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mortality" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registro de Mortalidade</CardTitle>
                  <CardDescription>
                    Controle de mortalidade com impacto automático na biomassa
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Viveiro</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Peso Médio</TableHead>
                    <TableHead>Impacto Biomassa</TableHead>
                    <TableHead>Causa</TableHead>
                    <TableHead>Operador</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mortalityRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="text-sm">
                        {record.date} {record.time}
                      </TableCell>
                      <TableCell className="font-medium">{record.nursery}</TableCell>
                      <TableCell>{record.quantity.toLocaleString()}</TableCell>
                      <TableCell>{record.weight}g</TableCell>
                      <TableCell className="text-red-600 font-medium">
                        -{record.biomassImpact}kg
                      </TableCell>
                      <TableCell>{record.cause}</TableCell>
                      <TableCell className="text-sm">{record.operator}</TableCell>
                      <TableCell className="max-w-[200px] text-sm truncate">
                        {record.observations}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diseases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Principais Doenças</CardTitle>
              <CardDescription>
                Referência de doenças comuns na aquicultura de camarão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {diseases.map((disease, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{disease.name}</h4>
                      {getRiskBadge(disease.risk)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Sintomas:</p>
                        <p>{disease.symptoms}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Prevenção:</p>
                        <p>{disease.prevention}</p>
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
