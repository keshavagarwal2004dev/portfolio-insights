import { TrendingUp, TrendingDown, DollarSign, Briefcase, PieChart, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  delay?: number;
}

function StatCard({ title, value, change, icon, delay = 0 }: StatCardProps) {
  const isPositive = change >= 0;
  
  return (
    <Card 
      className="stat-card hover:border-primary/30 cursor-pointer group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-mono">{value}</div>
        <div className={`flex items-center gap-1 mt-1 text-sm ${isPositive ? 'text-gain' : 'text-loss'}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="font-medium">{isPositive ? '+' : ''}{change}%</span>
          <span className="text-muted-foreground ml-1">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsOverview() {
  const stats = [
    {
      title: "Total Portfolio",
      value: "$1,284,592",
      change: 12.5,
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      title: "Monthly Income",
      value: "$24,850",
      change: 8.2,
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      title: "Investments",
      value: "$892,340",
      change: -2.4,
      icon: <PieChart className="w-5 h-5" />,
    },
    {
      title: "Active Holdings",
      value: "47",
      change: 15.3,
      icon: <Activity className="w-5 h-5" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} delay={index * 100} />
      ))}
    </div>
  );
}
