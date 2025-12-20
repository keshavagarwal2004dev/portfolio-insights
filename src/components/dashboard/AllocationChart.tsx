import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Technology", value: 35, color: "hsl(173 80% 50%)" },
  { name: "Healthcare", value: 25, color: "hsl(262 83% 58%)" },
  { name: "Finance", value: 20, color: "hsl(38 92% 50%)" },
  { name: "Energy", value: 12, color: "hsl(142 76% 45%)" },
  { name: "Real Estate", value: 8, color: "hsl(0 72% 51%)" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 text-sm">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-primary font-mono font-bold">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export function AllocationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sector Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
