import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateOrderBook } from "@/lib/mockData";
import { useMemo } from "react";

export function OrderBook() {
  // Memoize to prevent jitter on every render, in a real app this would be state
  const { bids, asks } = useMemo(() => generateOrderBook(3420), []);

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="py-3 px-4 border-b border-border">
        <CardTitle className="text-sm font-medium">Order Book</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-auto font-mono text-xs">
        <div className="grid grid-cols-2 h-full">
          {/* Bids */}
          <div className="border-r border-border">
             <div className="grid grid-cols-3 p-2 bg-muted/30 text-muted-foreground font-medium">
                <span>Size</span>
                <span className="text-right">Price</span>
                <span className="text-right">Total</span>
             </div>
             {bids.map((bid, i) => (
               <div key={i} className="grid grid-cols-3 px-2 py-0.5 hover:bg-muted/50 cursor-pointer relative">
                 {/* Depth Visual */}
                 <div 
                    className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 z-0" 
                    style={{ width: `${Math.min(bid.total / 50 * 100, 100)}%` }}
                 />
                 <span className="text-muted-foreground z-10">{bid.size.toFixed(2)}</span>
                 <span className="text-right text-emerald-500 z-10">{bid.price.toFixed(2)}</span>
                 <span className="text-right text-muted-foreground z-10">{bid.total.toFixed(2)}</span>
               </div>
             ))}
          </div>
          
          {/* Asks */}
          <div>
            <div className="grid grid-cols-3 p-2 bg-muted/30 text-muted-foreground font-medium">
                <span>Price</span>
                <span className="text-right">Size</span>
                <span className="text-right">Total</span>
             </div>
             {asks.map((ask, i) => (
               <div key={i} className="grid grid-cols-3 px-2 py-0.5 hover:bg-muted/50 cursor-pointer relative">
                 {/* Depth Visual */}
                 <div 
                    className="absolute left-0 top-0 bottom-0 bg-rose-500/10 z-0" 
                    style={{ width: `${Math.min(ask.total / 50 * 100, 100)}%` }}
                 />
                 <span className="text-rose-500 z-10">{ask.price.toFixed(2)}</span>
                 <span className="text-right text-muted-foreground z-10">{ask.size.toFixed(2)}</span>
                 <span className="text-right text-muted-foreground z-10">{ask.total.toFixed(2)}</span>
               </div>
             ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
