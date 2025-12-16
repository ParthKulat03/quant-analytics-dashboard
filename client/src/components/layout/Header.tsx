import { Bell, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search ticker, strategy..." 
            className="pl-9 bg-muted/50 border-none h-9 focus-visible:ring-1" 
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Context:</span>
          <Select defaultValue="ETH-USDT">
            <SelectTrigger className="w-[140px] h-9 bg-muted/50 border-none">
              <SelectValue placeholder="Select Pair" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BTC-USDT">BTC-USDT</SelectItem>
              <SelectItem value="ETH-USDT">ETH-USDT</SelectItem>
              <SelectItem value="SOL-USDT">SOL-USDT</SelectItem>
              <SelectItem value="BNB-USDT">BNB-USDT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-4 w-[1px] bg-border" />

        <div className="flex items-center gap-2">
           <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1.5 py-1">
             <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
             <span className="font-mono text-xs">CONNECTED</span>
           </Badge>
           <span className="text-xs font-mono text-muted-foreground">14ms</span>
        </div>

        <Button variant="outline" size="sm" className="h-9 gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-background" />
        </Button>
      </div>
    </header>
  );
}
