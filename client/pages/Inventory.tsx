import { useState } from "react";
import {
  Package,
  Plus,
  Minus,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Download,
  BarChart3,
  Edit,
  Eye,
  MoreHorizontal,
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
import { Progress } from "@/components/ui/progress";

export default function Inventory() {
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isLinkUsageOpen, setIsLinkUsageOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    {
      id: "feed",
      name: "Ração",
      icon: "🐟",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "medicine",
      name: "Medicamentos",
      icon: "💊",
      color: "bg-red-100 text-red-800",
    },
    {
      id: "supplements",
      name: "Suplementos",
      icon: "🧪",
      color: "bg-green-100 text-green-800",
    },
    {
      id: "equipment",
      name: "Equipamentos",
      icon: "⚙️",
      color: "bg-gray-100 text-gray-800",
    },
    {
      id: "chemicals",
      name: "Produtos Químicos",
      icon: "🧊",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "maintenance",
      name: "Manutenção",
      icon: "🔧",
      color: "bg-yellow-100 text-yellow-800",
    },
  ];

  const inventoryItems = [
    {
      id: 1,
      name: "Ração 35% Proteína",
      category: "feed",
      brand: "AquaNutri Pro",
      currentStock: 2850,
      unit: "kg",
      unitCost: 4.25,
      totalValue: 12112.5,
      minStock: 500,
      maxStock: 5000,
      lastEntry: "2024-01-10",
      lastUsage: "2024-01-15",
      supplier: "Nutrição Aquícola Ltd",
      location: "Galpão A - Setor 1",
      expiryDate: "2024-06-15",
      status: "Normal",
    },
    {
      id: 2,
      name: "Ração 32% Proteína",
      category: "feed",
      brand: "AquaNutri Pro",
      currentStock: 1240,
      unit: "kg",
      unitCost: 3.85,
      totalValue: 4774.0,
      minStock: 800,
      maxStock: 4000,
      lastEntry: "2024-01-08",
      lastUsage: "2024-01-15",
      supplier: "Nutrição Aquícola Ltd",
      location: "Galpão A - Setor 2",
      expiryDate: "2024-05-20",
      status: "Baixo",
    },
    {
      id: 3,
      name: "Probiótico Aqua Plus",
      category: "supplements",
      brand: "BioAqua",
      currentStock: 45,
      unit: "kg",
      unitCost: 28.0,
      totalValue: 1260.0,
      minStock: 20,
      maxStock: 100,
      lastEntry: "2024-01-12",
      lastUsage: "2024-01-14",
      supplier: "BioAqua Suplementos",
      location: "Galpão B - Prateleira 3",
      expiryDate: "2024-12-30",
      status: "Normal",
    },
    {
      id: 4,
      name: "Oxitetraciclina 500mg",
      category: "medicine",
      brand: "AquaHealth",
      currentStock: 8,
      unit: "kg",
      unitCost: 145.0,
      totalValue: 1160.0,
      minStock: 5,
      maxStock: 50,
      lastEntry: "2023-12-15",
      lastUsage: "2024-01-05",
      supplier: "Farmácia Veterinária Aqua",
      location: "Farmácia - Refrigerado",
      expiryDate: "2025-03-15",
      status: "Crítico",
    },
    {
      id: 5,
      name: "Calcário Agrícola",
      category: "chemicals",
      brand: "CalBrasil",
      currentStock: 1500,
      unit: "kg",
      unitCost: 0.45,
      totalValue: 675.0,
      minStock: 200,
      maxStock: 2000,
      lastEntry: "2024-01-05",
      lastUsage: "2024-01-10",
      supplier: "Minerais do Nordeste",
      location: "Galpão C - Área Externa",
      expiryDate: null,
      status: "Normal",
    },
    {
      id: 6,
      name: "Aerador Paddle Wheel 1HP",
      category: "equipment",
      brand: "AquaTech",
      currentStock: 2,
      unit: "un",
      unitCost: 2800.0,
      totalValue: 5600.0,
      minStock: 1,
      maxStock: 10,
      lastEntry: "2023-11-20",
      lastUsage: null,
      supplier: "Equipamentos Aqua Tech",
      location: "Almoxarifado - Setor Equipamentos",
      expiryDate: null,
      status: "Baixo",
    },
  ];

  const stockEntries = [
    {
      id: 1,
      date: "2024-01-15",
      item: "Ração 35% Proteína",
      category: "feed",
      quantity: 1000,
      unit: "kg",
      unitCost: 4.25,
      totalCost: 4250.0,
      supplier: "Nutrição Aquícola Ltd",
      invoice: "NF-2024-0156",
      operator: "João Silva",
      notes: "Entrega conforme programado",
    },
    {
      id: 2,
      date: "2024-01-12",
      item: "Probiótico Aqua Plus",
      category: "supplements",
      quantity: 25,
      unit: "kg",
      unitCost: 28.0,
      totalCost: 700.0,
      supplier: "BioAqua Suplementos",
      invoice: "NF-2024-0143",
      operator: "Maria Santos",
      notes: "Produto novo, teste de qualidade aprovado",
    },
    {
      id: 3,
      date: "2024-01-10",
      item: "Calcário Agrícola",
      category: "chemicals",
      quantity: 500,
      unit: "kg",
      unitCost: 0.45,
      totalCost: 225.0,
      supplier: "Minerais do Nordeste",
      invoice: "NF-2024-0138",
      operator: "Pedro Costa",
      notes: "Para preparação dos viveiros",
    },
  ];

  const usageLinkedToNurseries = [
    {
      id: 1,
      date: "2024-01-15",
      item: "Ração 35% Proteína",
      nursery: "Viveiro A-1",
      lot: "LT-2024-001",
      quantity: 24.5,
      unit: "kg",
      unitCost: 4.25,
      totalCost: 104.13,
      operator: "Maria Santos",
      purpose: "Arraçoamento diário - 18:00",
      notes: "Consumo total conforme planejado",
    },
    {
      id: 2,
      date: "2024-01-15",
      item: "Ração 32% Proteína",
      nursery: "Viveiro B-1",
      lot: "LT-2024-002",
      quantity: 38.2,
      unit: "kg",
      unitCost: 3.85,
      totalCost: 147.07,
      operator: "Pedro Costa",
      purpose: "Arraçoamento diário - 17:00",
      notes: "Reduzido por baixo consumo",
    },
    {
      id: 3,
      date: "2024-01-14",
      item: "Probiótico Aqua Plus",
      nursery: "Viveiro A-2",
      lot: "LT-2024-003",
      quantity: 2.5,
      unit: "kg",
      unitCost: 28.0,
      totalCost: 70.0,
      operator: "Dr. Ana Costa",
      purpose: "Tratamento preventivo",
      notes: "Aplicação após detecção de estresse",
    },
    {
      id: 4,
      date: "2024-01-10",
      item: "Calcário Agrícola",
      nursery: "Viveiro C-1",
      lot: "LT-2024-004",
      quantity: 150,
      unit: "kg",
      unitCost: 0.45,
      totalCost: 67.5,
      operator: "João Silva",
      purpose: "Preparação do viveiro",
      notes: "Correção de pH antes do povoamento",
    },
  ];

  const getStatusBadge = (status: string, stock: number, minStock: number) => {
    let statusText = status;
    let variant = "outline";

    if (stock <= minStock * 0.5) {
      statusText = "Crítico";
      variant = "destructive";
    } else if (stock <= minStock) {
      statusText = "Baixo";
      variant = "secondary";
    } else {
      statusText = "Normal";
      variant = "default";
    }

    return <Badge variant={variant as any}>{statusText}</Badge>;
  };

  const getCategoryBadge = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return <Badge variant="outline">N/A</Badge>;

    return (
      <Badge className={category.color}>
        <span className="mr-1">{category.icon}</span>
        {category.name}
      </Badge>
    );
  };

  const getStockLevel = (current: number, min: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalInventoryValue = inventoryItems.reduce(
    (sum, item) => sum + item.totalValue,
    0,
  );
  const lowStockItems = inventoryItems.filter(
    (item) => item.currentStock <= item.minStock,
  ).length;
  const criticalItems = inventoryItems.filter(
    (item) => item.currentStock <= item.minStock * 0.5,
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Controle de Estoque
          </h1>
          <p className="text-muted-foreground">
            Gestão de categorias, entradas e vinculação de uso aos viveiros
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Dialog open={isLinkUsageOpen} onOpenChange={setIsLinkUsageOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Vincular Uso
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Vincular Uso de Insumo</DialogTitle>
                <DialogDescription>
                  Registre o uso de insumos vinculado a viveiros/lotes
                  específicos
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="usage-item">Produto</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o produto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feed35">
                          Ração 35% Proteína
                        </SelectItem>
                        <SelectItem value="feed32">
                          Ração 32% Proteína
                        </SelectItem>
                        <SelectItem value="probiotic">
                          Probiótico Aqua Plus
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="usage-date">Data de Uso</Label>
                    <Input
                      id="usage-date"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="usage-nursery">Viveiro</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o viveiro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a1">
                          Viveiro A-1 (LT-2024-001)
                        </SelectItem>
                        <SelectItem value="a2">
                          Viveiro A-2 (LT-2024-003)
                        </SelectItem>
                        <SelectItem value="b1">
                          Viveiro B-1 (LT-2024-002)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="usage-purpose">Finalidade</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a finalidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feeding">Arraçoamento</SelectItem>
                        <SelectItem value="treatment">Tratamento</SelectItem>
                        <SelectItem value="prevention">Prevenção</SelectItem>
                        <SelectItem value="preparation">Preparação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="usage-quantity">Quantidade Usada</Label>
                    <Input
                      id="usage-quantity"
                      placeholder="24.5"
                      step="0.1"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="usage-unit">Unidade</Label>
                    <Input id="usage-unit" value="kg" disabled />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="usage-notes">Observações</Label>
                  <Textarea
                    id="usage-notes"
                    placeholder="Notas sobre o uso, condições, resultados..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsLinkUsageOpen(false)}>
                  Registrar Uso
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Nova Categoria
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Criar Nova Categoria</DialogTitle>
                <DialogDescription>
                  Adicione uma nova categoria de estoque
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="cat-name">Nome da Categoria</Label>
                  <Input id="cat-name" placeholder="Ex: Fertilizantes" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cat-icon">Ícone (Emoji)</Label>
                  <Input id="cat-icon" placeholder="🌱" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cat-description">Descrição</Label>
                  <Textarea
                    id="cat-description"
                    placeholder="Descrição da categoria..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => setIsAddCategoryOpen(false)}
                >
                  Criar Categoria
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddEntryOpen} onOpenChange={setIsAddEntryOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Entrada de Estoque
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Nova Entrada de Estoque</DialogTitle>
                <DialogDescription>
                  Registre uma nova entrada de produto no estoque
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="entry-date">Data da Entrada</Label>
                    <Input
                      id="entry-date"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="entry-invoice">Nota Fiscal</Label>
                    <Input id="entry-invoice" placeholder="NF-2024-0001" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="entry-category">Categoria</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.icon} {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="entry-supplier">Fornecedor</Label>
                    <Input
                      id="entry-supplier"
                      placeholder="Nome do fornecedor"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="entry-product">Nome do Produto</Label>
                  <Input
                    id="entry-product"
                    placeholder="Ex: Ração 35% Proteína Premium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="entry-brand">Marca</Label>
                    <Input id="entry-brand" placeholder="Ex: AquaNutri Pro" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="entry-location">Localização</Label>
                    <Input
                      id="entry-location"
                      placeholder="Ex: Galpão A - Setor 1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="entry-quantity">Quantidade</Label>
                    <Input
                      id="entry-quantity"
                      placeholder="1000"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="entry-unit">Unidade</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Unidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="un">un</SelectItem>
                        <SelectItem value="cx">cx</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="entry-unit-cost">Custo Unitário (R$)</Label>
                    <Input
                      id="entry-unit-cost"
                      placeholder="4.25"
                      step="0.01"
                      type="number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="entry-min-stock">Estoque Mínimo</Label>
                    <Input
                      id="entry-min-stock"
                      placeholder="500"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="entry-expiry">Data de Validade</Label>
                    <Input id="entry-expiry" type="date" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="entry-notes">Observações</Label>
                  <Textarea
                    id="entry-notes"
                    placeholder="Notas sobre a entrada, qualidade, condições..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => setIsAddEntryOpen(false)}>
                  Registrar Entrada
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Valor Total Estoque
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {(totalInventoryValue / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">
              {inventoryItems.length} itens diferentes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Itens em Baixa
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              {criticalItems} críticos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Categorias Ativas
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">Bem organizadas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Movimentações Hoje
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              6 saídas, 2 entradas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Estoque Atual</TabsTrigger>
          <TabsTrigger value="entries">Entradas</TabsTrigger>
          <TabsTrigger value="usage">Uso Vinculado</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Estoque Atual</CardTitle>
                  <CardDescription>
                    Controle de produtos, níveis e valores
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar produtos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Valor Unitário</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.brand}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryBadge(item.category)}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {item.currentStock.toLocaleString()} {item.unit}
                          </p>
                          <div className="mt-1">
                            <Progress
                              value={getStockLevel(
                                item.currentStock,
                                item.minStock,
                                item.maxStock,
                              )}
                              className="h-1 w-16"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Min: {item.minStock} {item.unit}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>R$ {item.unitCost.toFixed(2)}</TableCell>
                      <TableCell>
                        R$ {item.totalValue.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(
                          item.status,
                          item.currentStock,
                          item.minStock,
                        )}
                      </TableCell>
                      <TableCell className="text-sm">{item.location}</TableCell>
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
                              <Plus className="h-4 w-4 mr-2" />
                              Entrada
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Minus className="h-4 w-4 mr-2" />
                              Saída
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

        <TabsContent value="entries" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Histórico de Entradas</CardTitle>
                  <CardDescription>
                    Registro de entradas com valores unitários
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
                    <TableHead>Data</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Valor Unitário</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>NF</TableHead>
                    <TableHead>Operador</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="text-sm">{entry.date}</TableCell>
                      <TableCell className="font-medium">
                        {entry.item}
                      </TableCell>
                      <TableCell>{getCategoryBadge(entry.category)}</TableCell>
                      <TableCell>
                        {entry.quantity.toLocaleString()} {entry.unit}
                      </TableCell>
                      <TableCell>R$ {entry.unitCost.toFixed(2)}</TableCell>
                      <TableCell className="font-medium">
                        R$ {entry.totalCost.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm">
                        {entry.supplier}
                      </TableCell>
                      <TableCell className="text-sm">{entry.invoice}</TableCell>
                      <TableCell className="text-sm">
                        {entry.operator}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Uso Vinculado aos Viveiros</CardTitle>
              <CardDescription>
                Rastreamento de uso de insumos por viveiro e lote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Viveiro/Lote</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Finalidade</TableHead>
                    <TableHead>Operador</TableHead>
                    <TableHead>Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usageLinkedToNurseries.map((usage) => (
                    <TableRow key={usage.id}>
                      <TableCell className="text-sm">{usage.date}</TableCell>
                      <TableCell className="font-medium">
                        {usage.item}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{usage.nursery}</p>
                          <p className="text-xs text-muted-foreground">
                            {usage.lot}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {usage.quantity} {usage.unit}
                      </TableCell>
                      <TableCell>R$ {usage.totalCost.toFixed(2)}</TableCell>
                      <TableCell>{usage.purpose}</TableCell>
                      <TableCell className="text-sm">
                        {usage.operator}
                      </TableCell>
                      <TableCell className="text-sm max-w-[200px] truncate">
                        {usage.notes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Categorias de Estoque</CardTitle>
              <CardDescription>
                Gestão das categorias de produtos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{category.icon}</span>
                        <h4 className="font-medium">{category.name}</h4>
                      </div>
                      <Badge className={category.color}>
                        {
                          inventoryItems.filter(
                            (item) => item.category === category.id,
                          ).length
                        }
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Valor total:
                        </span>
                        <span className="font-medium">
                          R${" "}
                          {inventoryItems
                            .filter((item) => item.category === category.id)
                            .reduce((sum, item) => sum + item.totalValue, 0)
                            .toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Itens em baixa:
                        </span>
                        <span className="font-medium">
                          {
                            inventoryItems.filter(
                              (item) =>
                                item.category === category.id &&
                                item.currentStock <= item.minStock,
                            ).length
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
      </Tabs>
    </div>
  );
}
