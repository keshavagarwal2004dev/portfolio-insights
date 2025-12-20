import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", value: 980000, gain: 2.3 },
  { month: "Feb", value: 1020000, gain: 4.1 },
  { month: "Mar", value: 1080000, gain: 5.9 },
  { month: "Apr", value: 1045000, gain: -3.2 },
  { month: "May", value: 1120000, gain: 7.2 },
  { month: "Jun", value: 1180000, gain: 5.4 },
  { month: "Jul", value: 1150000, gain: -2.5 },
  { month: "Aug", value: 1220000, gain: 6.1 },
  { month: "Sep", value: 1260000, gain: 3.3 },
  { month: "Oct", value: 1285000, gain: 2.0 },
  { month: "Nov", value: 1310000, gain: 1.9 },
  { month: "Dec", value: 1284592, gain: -1.9 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const gain = payload[0].payload.gain;
    return (
      <div className="glass-card p-3 text-sm">
        <p className="text-muted-foreground mb-1">{label}</p>
        <p className="font-mono font-bold text-lg">
          ${value.toLocaleString()}
        </p>
        <p className={gain >= 0 ? "text-gain" : "text-loss"}>
          {gain >= 0 ? "+" : ""}{gain}%
        </p>
      </div>
    );
  }
  return null;
};

export function PortfolioChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Portfolio Performance</span>
          <div className="flex gap-2 text-sm font-normal">
            <button className="px-3 py-1 rounded-md bg-primary/10 text-primary">1Y</button>
            <button className="px-3 py-1 rounded-md text-muted-foreground hover:bg-secondary">6M</button>
            <button className="px-3 py-1 rounded-md text-muted-foreground hover:bg-secondary">3M</button>
            <button className="px-3 py-1 rounded-md text-muted-foreground hover:bg-secondary">1M</button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(173 80% 50%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(173 80% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="hsl(215 20% 55%)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="hsl(215 20% 55%)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(173 80% 50%)"
                strokeWidth={2}
                fill="url(#portfolioGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
