// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { generateOrderBook } from "@/lib/mockData";
// import { useMemo } from "react";

// export function OrderBook() {
//   // Memoize to prevent jitter on every render, in a real app this would be state
//   const { bids, asks } = useMemo(() => generateOrderBook(3420), []);

//   return (
//     <Card className="h-full flex flex-col overflow-hidden">
//       <CardHeader className="py-3 px-4 border-b border-border">
//         <CardTitle className="text-sm font-medium">Order Book</CardTitle>
//       </CardHeader>
//       <CardContent className="p-0 flex-1 overflow-auto font-mono text-xs">
//         <div className="grid grid-cols-2 h-full">
//           {/* Bids */}
//           <div className="border-r border-border">
//              <div className="grid grid-cols-3 p-2 bg-muted/30 text-muted-foreground font-medium">
//                 <span>Size</span>
//                 <span className="text-right">Price</span>
//                 <span className="text-right">Total</span>
//              </div>
//              {bids.map((bid, i) => (
//                <div key={i} className="grid grid-cols-3 px-2 py-0.5 hover:bg-muted/50 cursor-pointer relative">
//                  {/* Depth Visual */}
//                  <div 
//                     className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 z-0" 
//                     style={{ width: `${Math.min(bid.total / 50 * 100, 100)}%` }}
//                  />
//                  <span className="text-muted-foreground z-10">{bid.size.toFixed(2)}</span>
//                  <span className="text-right text-emerald-500 z-10">{bid.price.toFixed(2)}</span>
//                  <span className="text-right text-muted-foreground z-10">{bid.total.toFixed(2)}</span>
//                </div>
//              ))}
//           </div>
          
//           {/* Asks */}
//           <div>
//             <div className="grid grid-cols-3 p-2 bg-muted/30 text-muted-foreground font-medium">
//                 <span>Price</span>
//                 <span className="text-right">Size</span>
//                 <span className="text-right">Total</span>
//              </div>
//              {asks.map((ask, i) => (
//                <div key={i} className="grid grid-cols-3 px-2 py-0.5 hover:bg-muted/50 cursor-pointer relative">
//                  {/* Depth Visual */}
//                  <div 
//                     className="absolute left-0 top-0 bottom-0 bg-rose-500/10 z-0" 
//                     style={{ width: `${Math.min(ask.total / 50 * 100, 100)}%` }}
//                  />
//                  <span className="text-rose-500 z-10">{ask.price.toFixed(2)}</span>
//                  <span className="text-right text-muted-foreground z-10">{ask.size.toFixed(2)}</span>
//                  <span className="text-right text-muted-foreground z-10">{ask.total.toFixed(2)}</span>
//                </div>
//              ))}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }






import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RawLevel = [string, string];

type Level = {
  price: number;
  size: number;
  total: number;
};

export function OrderBook() {
  const [bids, setBids] = useState<Level[]>([]);
  const [asks, setAsks] = useState<Level[]>([]);

  useEffect(() => {
    const fetchOrderBook = async () => {
      const res = await fetch("http://127.0.0.1:5000/api/overview/orderbook/ETHUSDT");
      const data = await res.json();

      const normalize = (levels: RawLevel[]) => {
        let cumulative = 0;
        return levels.map(([price, qty]) => {
          const p = Number(price);
          const q = Number(qty);
          cumulative += q;
          return {
            price: p,
            size: q,
            total: cumulative,
          };
        });
      };

      setBids(normalize(data.bids || []));
      setAsks(normalize(data.asks || []));
    };

    fetchOrderBook();
    const interval = setInterval(fetchOrderBook, 1000); // refresh every second
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="py-3 px-4 border-b border-border">
        <CardTitle className="text-sm font-medium">Order Book</CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex-1 overflow-auto font-mono text-xs">
        <div className="grid grid-cols-2 h-full">

          {/* BIDS */}
          <div className="border-r border-border">
            <div className="grid grid-cols-3 p-2 bg-muted/30 text-muted-foreground font-medium">
              <span>Size</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>

            {bids.map((b, i) => (
              <div key={i} className="grid grid-cols-3 px-2 py-0.5 relative">
                <div
                  className="absolute right-0 top-0 bottom-0 bg-emerald-500/10"
                  style={{ width: `${Math.min(b.total * 3, 100)}%` }}
                />
                <span className="z-10">{b.size.toFixed(3)}</span>
                <span className="text-right text-emerald-500 z-10">
                  {b.price.toFixed(2)}
                </span>
                <span className="text-right z-10">
                  {b.total.toFixed(3)}
                </span>
              </div>
            ))}
          </div>

          {/* ASKS */}
          <div>
            <div className="grid grid-cols-3 p-2 bg-muted/30 text-muted-foreground font-medium">
              <span>Price</span>
              <span className="text-right">Size</span>
              <span className="text-right">Total</span>
            </div>

            {asks.map((a, i) => (
              <div key={i} className="grid grid-cols-3 px-2 py-0.5 relative">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-rose-500/10"
                  style={{ width: `${Math.min(a.total * 3, 100)}%` }}
                />
                <span className="text-rose-500 z-10">
                  {a.price.toFixed(2)}
                </span>
                <span className="text-right z-10">
                  {a.size.toFixed(3)}
                </span>
                <span className="text-right z-10">
                  {a.total.toFixed(3)}
                </span>
              </div>
            ))}
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
