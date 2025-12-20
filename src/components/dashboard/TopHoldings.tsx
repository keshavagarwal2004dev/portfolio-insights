import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react";

interface Holding {
  symbol: string;
  name: string;
  value: number;
  change: number;
  shares: number;
}

const holdings: Holding[] = [
  { symbol: "AAPL", name: "Apple Inc.", value: 185420, change: 2.34, shares: 980 },
  { symbol: "MSFT", name: "Microsoft Corp.", value: 142850, change: 1.85, shares: 380 },
  { symbol: "GOOGL", name: "Alphabet Inc.", value: 128340, change: -0.92, shares: 920 },
  { symbol: "AMZN", name: "Amazon.com Inc.", value: 98760, change: 3.21, shares: 540 },
  { symbol: "NVDA", name: "NVIDIA Corp.", value: 87540, change: 5.67, shares: 180 },
];

export function TopHoldings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Top Holdings</span>
          <button className="text-sm font-normal text-primary hover:underline flex items-center gap-1">
            View All <ExternalLink className="w-3 h-3" />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {holdings.map((holding) => (
          <div
            key={holding.symbol}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-mono font-bold text-primary text-sm">
                {holding.symbol.slice(0, 2)}
              </div>
              <div>
                <p className="font-medium group-hover:text-primary transition-colors">
                  {holding.symbol}
                </p>
                <p className="text-sm text-muted-foreground">{holding.shares} shares</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono font-medium">
                ${holding.value.toLocaleString()}
              </p>
              <p className={`text-sm flex items-center gap-1 justify-end ${holding.change >= 0 ? 'text-gain' : 'text-loss'}`}>
                {holding.change >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {holding.change >= 0 ? '+' : ''}{holding.change}%
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
