import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Wallet,
  Upload,
  Plus,
  Receipt,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  CreditCard,
  ShoppingBag,
  Car,
  Home,
  Utensils,
  Zap,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  icon: React.ReactNode;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Shopping: <ShoppingBag className="w-4 h-4" />,
  Transport: <Car className="w-4 h-4" />,
  Housing: <Home className="w-4 h-4" />,
  Food: <Utensils className="w-4 h-4" />,
  Utilities: <Zap className="w-4 h-4" />,
  Other: <Receipt className="w-4 h-4" />,
};

const mockExpenses: Expense[] = [
  { id: "1", category: "Shopping", description: "Amazon purchase", amount: 149.99, date: "Dec 19, 2024", icon: categoryIcons.Shopping },
  { id: "2", category: "Food", description: "Grocery shopping", amount: 87.50, date: "Dec 18, 2024", icon: categoryIcons.Food },
  { id: "3", category: "Transport", description: "Gas station", amount: 65.00, date: "Dec 17, 2024", icon: categoryIcons.Transport },
  { id: "4", category: "Utilities", description: "Electric bill", amount: 124.30, date: "Dec 15, 2024", icon: categoryIcons.Utilities },
  { id: "5", category: "Food", description: "Restaurant dinner", amount: 78.40, date: "Dec 14, 2024", icon: categoryIcons.Food },
];

const budgetData = [
  { name: "Housing", budget: 2500, spent: 2400, color: "hsl(173 80% 50%)" },
  { name: "Food", budget: 800, spent: 650, color: "hsl(142 76% 45%)" },
  { name: "Transport", budget: 400, spent: 380, color: "hsl(38 92% 50%)" },
  { name: "Shopping", budget: 500, spent: 620, color: "hsl(0 72% 51%)" },
  { name: "Utilities", budget: 300, spent: 280, color: "hsl(262 83% 58%)" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = ((data.spent / data.budget) * 100).toFixed(0);
    const isOver = data.spent > data.budget;
    
    return (
      <div className="glass-card p-3 text-sm">
        <p className="font-medium mb-1">{label}</p>
        <p className="text-muted-foreground">
          Budget: <span className="font-mono">${data.budget}</span>
        </p>
        <p className={isOver ? "text-loss" : "text-gain"}>
          Spent: <span className="font-mono">${data.spent}</span> ({percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

export function ExpenseTracker() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const savings = totalBudget - totalSpent;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="text-2xl font-bold font-mono">$8,500</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold font-mono">${totalBudget.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-secondary text-muted-foreground">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Spent This Month</p>
                <p className="text-2xl font-bold font-mono text-loss">${totalSpent.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-loss/10 text-loss">
                <TrendingDown className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Savings</p>
                <p className={`text-2xl font-bold font-mono ${savings >= 0 ? 'text-gain' : 'text-loss'}`}>
                  ${savings >= 0 ? '+' : ''}{savings.toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${savings >= 0 ? 'bg-gain/10 text-gain' : 'bg-loss/10 text-loss'}`}>
                <PiggyBank className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Bill */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Upload Bill / Receipt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">
                Upload a bill or receipt image
              </p>
              <p className="text-sm text-muted-foreground">
                AI will automatically extract category and amount
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1">
                <Upload className="w-4 h-4" />
                Upload Image
              </Button>
              <Button variant="outline">
                <Plus className="w-4 h-4" />
                Manual Entry
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Budget Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Budget vs Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData} layout="vertical" barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" horizontal={false} />
                  <XAxis type="number" stroke="hsl(215 20% 55%)" fontSize={12} tickFormatter={(v) => `$${v}`} />
                  <YAxis type="category" dataKey="name" stroke="hsl(215 20% 55%)" fontSize={12} width={80} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(222 30% 15%)' }} />
                  <Bar dataKey="spent" radius={[0, 4, 4, 0]}>
                    {budgetData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.spent > entry.budget ? "hsl(0 72% 51%)" : entry.color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Expenses</span>
            <Button variant="outline" size="sm">View All</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {expense.icon}
                  </div>
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {expense.category} • {expense.date}
                    </p>
                  </div>
                </div>
                <p className="font-mono font-medium text-loss">
                  -${expense.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
