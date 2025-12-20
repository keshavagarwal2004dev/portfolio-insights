import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { AllocationChart } from "@/components/dashboard/AllocationChart";
import { TopHoldings } from "@/components/dashboard/TopHoldings";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { DocumentUpload } from "@/components/documents/DocumentUpload";
import { MarketIntelligence } from "@/components/market/MarketIntelligence";
import { ExpenseTracker } from "@/components/expenses/ExpenseTracker";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { toast } from "sonner";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Portfolio Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your financial portfolio.
              </p>
            </div>
            <StatsOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PortfolioChart />
              <AllocationChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopHoldings />
              <ChatInterface />
            </div>
          </div>
        );
      case "documents":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Document Management</h1>
              <p className="text-muted-foreground">
                Upload and manage your financial documents for AI analysis.
              </p>
            </div>
            <DocumentUpload />
          </div>
        );
      case "chat":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">AI Portfolio Assistant</h1>
              <p className="text-muted-foreground">
                Chat with AI to get insights about your investments and financial documents.
              </p>
            </div>
            <div className="max-w-4xl">
              <ChatInterface />
            </div>
          </div>
        );
      case "market":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Market Intelligence</h1>
              <p className="text-muted-foreground">
                Real-time market news, analysis, and AI-powered investment insights.
              </p>
            </div>
            <MarketIntelligence />
          </div>
        );
      case "expenses":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Expense Tracker</h1>
              <p className="text-muted-foreground">
                Track your spending, manage budgets, and get AI savings recommendations.
              </p>
            </div>
            <ExpenseTracker />
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account, notifications, and integrations.
              </p>
            </div>
            <SettingsPanel />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />
      <main className="flex-1 ml-64 p-8 transition-all duration-300">
        {renderContent()}
      </main>
    </div>
  );
}
