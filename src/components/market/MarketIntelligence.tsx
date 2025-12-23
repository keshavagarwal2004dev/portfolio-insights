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
  Building2,
  Landmark,
  BadgeDollarSign,
  Loader2,
} from "lucide-react";
import { searchMarket, SearchResult, SearchType } from "@/lib/api/market";
import { useToast } from "@/hooks/use-toast";

interface CompanyOutlook {
  symbol: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  outlook: string;
  recommendation: "buy" | "hold" | "sell";
  nextYearTarget: number;
}

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
  const [searchType, setSearchType] = useState<SearchType>("company");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Enter a search term",
        description: "Please enter a company, bank, or bond to search for.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const result = await searchMarket(searchQuery.trim(), searchType);

      if (result.success) {
        setSearchResults(result.news);
        if (result.news.length === 0) {
          toast({
            title: "No results found",
            description: `No market news found for "${searchQuery}". Try a different search term.`,
          });
        } else {
          toast({
            title: "Search complete",
            description: `Found ${result.news.length} results for "${searchQuery}".`,
          });
        }
      } else {
        toast({
          title: "Search failed",
          description: result.error || "Failed to fetch market data. Please try again.",
          variant: "destructive",
        });
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getTimeAgo = (dateStr?: string) => {
    if (!dateStr) return "Recently";
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);

      if (diffDays > 0) return `${diffDays}d ago`;
      if (diffHours > 0) return `${diffHours}h ago`;
      return "Recently";
    } catch {
      return "Recently";
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

  const searchTypeOptions: { type: SearchType; label: string; icon: React.ReactNode }[] = [
    { type: "company", label: "Company", icon: <Building2 className="w-4 h-4" /> },
    { type: "bank", label: "Investment Bank", icon: <Landmark className="w-4 h-4" /> },
    { type: "bond", label: "Bond", icon: <BadgeDollarSign className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Market Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Type Selector */}
          <div className="flex gap-2">
            {searchTypeOptions.map((option) => (
              <Button
                key={option.type}
                variant={searchType === option.type ? "default" : "outline"}
                size="sm"
                onClick={() => setSearchType(option.type)}
                className="flex items-center gap-2"
              >
                {option.icon}
                {option.label}
              </Button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  searchType === "company"
                    ? "Search for a company (e.g., Apple, Tesla, Microsoft)..."
                    : searchType === "bank"
                    ? "Search for an investment bank (e.g., Goldman Sachs, Morgan Stanley)..."
                    : "Search for a bond or fixed income product..."
                }
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
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
        {/* Live Search Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-primary" />
              {hasSearched ? `Results for "${searchQuery}"` : "Latest News"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p>Searching the web for market intelligence...</p>
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((news, idx) => (
                <a
                  key={idx}
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                        {news.title}
                      </p>
                      {news.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {news.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span className="font-medium">{news.source}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getTimeAgo(news.publishedDate)}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                </a>
              ))
            ) : hasSearched ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Search className="w-8 h-8 mb-4 opacity-50" />
                <p>No results found. Try a different search term.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Search className="w-8 h-8 mb-4 opacity-50" />
                <p>Search for a company, bank, or bond to see live market news.</p>
              </div>
            )}
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
