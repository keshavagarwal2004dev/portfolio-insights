import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderOpen, Upload, FileText, Loader2, Check, X, Link } from "lucide-react";

interface Document {
  id: string;
  name: string;
  status: "pending" | "processing" | "completed" | "error";
  summary?: string;
  companies?: string[];
  sectors?: string[];
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Q3_Investment_Report.pdf",
    status: "completed",
    summary: "Quarterly report showing 15% portfolio growth, with significant positions in tech and healthcare sectors.",
    companies: ["Apple", "Microsoft", "Pfizer"],
    sectors: ["Technology", "Healthcare"],
  },
  {
    id: "2",
    name: "Annual_Financial_Statement.pdf",
    status: "completed",
    summary: "Annual statement with comprehensive breakdown of assets, liabilities, and equity positions.",
    companies: ["Tesla", "Amazon"],
    sectors: ["Technology", "Consumer"],
  },
  {
    id: "3",
    name: "Market_Analysis_Nov2024.pdf",
    status: "processing",
  },
];

export function DocumentUpload() {
  const [driveUrl, setDriveUrl] = useState("");
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    if (!driveUrl.trim()) return;
    setIsConnecting(true);
    // Simulated connection
    setTimeout(() => {
      setIsConnecting(false);
      setDriveUrl("");
    }, 2000);
  };

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "pending":
        return <div className="w-2 h-2 rounded-full bg-muted-foreground" />;
      case "processing":
        return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
      case "completed":
        return <Check className="w-4 h-4 text-gain" />;
      case "error":
        return <X className="w-4 h-4 text-loss" />;
    }
  };

  const getStatusText = (status: Document["status"]) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "processing":
        return "Processing...";
      case "completed":
        return "Analyzed";
      case "error":
        return "Error";
    }
  };

  return (
    <div className="space-y-6">
      {/* Google Drive Connection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-primary" />
            Connect Google Drive
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Paste a Google Drive folder link to import your financial documents (PDFs).
              The AI will automatically extract and analyze the content.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={driveUrl}
                  onChange={(e) => setDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="pl-10"
                />
              </div>
              <Button onClick={handleConnect} disabled={!driveUrl.trim() || isConnecting}>
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Import
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manual Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Or Upload Files Directly</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
              Drag & drop your PDF documents here
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse files
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Document List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Processed Documents</span>
            <span className="text-sm font-normal text-muted-foreground">
              {documents.filter((d) => d.status === "completed").length} / {documents.length} analyzed
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getStatusIcon(doc.status)}
                      <span>{getStatusText(doc.status)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {doc.status === "completed" && (
                <div className="mt-3 pt-3 border-t border-border space-y-2">
                  <p className="text-sm text-muted-foreground">{doc.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {doc.companies?.map((company) => (
                      <span
                        key={company}
                        className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs"
                      >
                        {company}
                      </span>
                    ))}
                    {doc.sectors?.map((sector) => (
                      <span
                        key={sector}
                        className="px-2 py-1 rounded-md bg-secondary text-muted-foreground text-xs"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
