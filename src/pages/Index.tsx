import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  ArrowRight,
  FileText,
  MessageSquare,
  BarChart3,
  Wallet,
  Shield,
  Zap,
  Brain,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Document Analysis",
    description: "Upload PDFs from Google Drive and get AI-powered summaries of your financial documents.",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "AI Chat Assistant",
    description: "Ask questions about your portfolio using natural language with RAG-powered responses.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Market Intelligence",
    description: "Real-time market news, stock performance, and AI-generated investment outlooks.",
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "Expense Tracking",
    description: "Upload bills, track expenses, and get personalized saving recommendations.",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Vector Search",
    description: "Semantic search across all your documents using pgvector embeddings.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Private",
    description: "Row-level security ensures your financial data stays private and protected.",
  },
];

const stats = [
  { value: "$1.2M+", label: "Assets Analyzed" },
  { value: "10K+", label: "Documents Processed" },
  { value: "99.9%", label: "Uptime" },
  { value: "256-bit", label: "Encryption" },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-gradient">FinanceAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/auth")}>
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto max-w-6xl text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6 animate-fade-in">
            <Zap className="w-4 h-4" />
            AI-Powered Financial Intelligence
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: "100ms" }}>
            Your Portfolio,
            <br />
            <span className="text-gradient">Supercharged with AI</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Upload documents, chat with your portfolio, track expenses, and get real-time market intelligence—all powered by advanced AI and secure Supabase backend.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button size="xl" onClick={() => navigate("/auth")}>
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl" onClick={() => navigate("/dashboard")}>
              View Demo
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-y border-border bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-gradient mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Manage Your Finances
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From document analysis to expense tracking, FinanceAI provides a complete suite of AI-powered financial tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Financial Management?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join thousands of users who trust FinanceAI for their portfolio analysis and expense tracking.
          </p>
          <Button size="xl" onClick={() => navigate("/auth")}>
            Get Started for Free
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-semibold">FinanceAI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 FinanceAI. Not financial advice. Consult a professional advisor.
          </p>
        </div>
      </footer>
    </div>
  );
}
