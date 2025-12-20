import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Search,
  ExternalLink,
  AlertTriangle,
  Newspaper,
  BarChart3,
  Clock,
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  sentiment: "positive" | "negative" | "neutral";
  url: string;
}

interface CompanyOutlook {
  symbol: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  outlook: string;
  recommendation: "buy" | "hold" | "sell";
  nextYearTarget: number;
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Apple announces record Q4 earnings, beats analyst expectations",
    source: "Bloomberg",
    time: "2 hours ago",
    sentiment: "positive",
    url: "#",
  },
  {
    id: "2",
    title: "Federal Reserve signals potential rate cuts in 2025",
    source: "Reuters",
    time: "4 hours ago",
    sentiment: "positive",
    url: "#",
  },
  {
    id: "3",
    title: "Tech sector faces regulatory challenges in EU markets",
    source: "Financial Times",
    time: "6 hours ago",
    sentiment: "negative",
    url: "#",
  },
  {
    id: "4",
    title: "Microsoft expands AI partnerships with enterprise clients",
    source: "CNBC",
    time: "8 hours ago",
    sentiment: "positive",
    url: "#",
  },
];

const mockOutlook: CompanyOutlook[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    currentPrice: 189.45,
    priceChange: 2.34,
    outlook: "Strong growth expected driven by AI integration in new product lineup and services expansion in emerging markets.",
    recommendation: "buy",
    nextYearTarget: 225,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    currentPrice: 378.92,
    priceChange: 1.85,
    outlook: "Azure cloud growth and Copilot AI adoption driving enterprise segment. Market leadership position maintained.",
    recommendation: "buy",
    nextYearTarget: 450,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    currentPrice: 139.28,
    priceChange: -0.92,
    outlook: "AI competition intensifying. Search advertising stable but facing headwinds from regulatory concerns.",
    recommendation: "hold",
    nextYearTarget: 155,
  },
];

export function MarketIntelligence() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const getSentimentColor = (sentiment: NewsItem["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return "text-gain";
      case "negative":
        return "text-loss";
      default:
        return "text-muted-foreground";
    }
  };

  const getRecommendationStyle = (rec: CompanyOutlook["recommendation"]) => {
    switch (rec) {
      case "buy":
        return "bg-gain/20 text-gain border-gain/30";
      case "sell":
        return "bg-loss/20 text-loss border-loss/30";
      default:
        return "bg-warning/20 text-warning border-warning/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Refresh */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Market Intelligence
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies, sectors, or market trends..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/20">
        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-warning">Investment Disclaimer</p>
          <p className="text-xs text-muted-foreground mt-1">
            This is AI-generated market analysis for informational purposes only.
            It does not constitute financial advice. Always consult a licensed
            financial advisor before making investment decisions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* News Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-primary" />
              Latest News
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockNews.map((news) => (
              <div
                key={news.id}
                className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-sm group-hover:text-primary transition-colors">
                      {news.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>{news.source}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {news.time}
                      </span>
                      <span>•</span>
                      <span className={getSentimentColor(news.sentiment)}>
                        {news.sentiment === "positive" && <TrendingUp className="w-3 h-3 inline" />}
                        {news.sentiment === "negative" && <TrendingDown className="w-3 h-3 inline" />}
                        {" "}{news.sentiment}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Outlook */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              AI-Powered Outlook
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockOutlook.map((company) => (
              <div
                key={company.symbol}
                className="p-4 rounded-lg bg-secondary/30 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-mono font-bold text-primary text-sm">
                      {company.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium">{company.symbol}</p>
                      <p className="text-sm text-muted-foreground">{company.name}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium border ${getRecommendationStyle(company.recommendation)}`}
                  >
                    {company.recommendation.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Current</p>
                    <p className="font-mono font-medium">${company.currentPrice}</p>
                  </div>
                  <div className={company.priceChange >= 0 ? "text-gain" : "text-loss"}>
                    <p className="text-right">Today</p>
                    <p className="font-mono">
                      {company.priceChange >= 0 ? "+" : ""}{company.priceChange}%
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-right">1Y Target</p>
                    <p className="font-mono font-medium text-primary">${company.nextYearTarget}</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {company.outlook}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
