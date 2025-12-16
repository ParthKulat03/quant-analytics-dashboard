import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { OrderBook } from "@/components/dashboard/OrderBook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const recentTrades = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  time: new Date(Date.now() - i * 1000).toLocaleTimeString(),
  price: 3420 + (Math.random() - 0.5) * 10,
  size: Math.random() * 5,
  side: Math.random() > 0.5 ? 'buy' : 'sell'
}));

// Mock Depth Data
const depthData = Array.from({ length: 50 }, (_, i) => {
    const price = 3400 + i;
    // Bids on the left (lower price), Asks on the right (higher price)
    // We mock "volume" at each price level
    const midPoint = 25;
    let bidVol = 0;
    let askVol = 0;

    if (i < midPoint) {
        bidVol = (i + 1) * Math.random() * 10;
    } else {
        askVol = (50 - i) * Math.random() * 10;
    }

    return {
        price,
        bidVolume: bidVol, // Cumulative usually, but simplified for visual
        askVolume: askVol
    };
});


export default function OrderBookPage() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Order Book Visualization */}
          <div className="md:col-span-5 lg:col-span-4 h-full flex flex-col">
            <OrderBook />
          </div>

          {/* Depth Chart & Recent Trades */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6">
            <Card className="flex-1 min-h-[300px]">
                <CardHeader>
                    <CardTitle>Market Depth</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] p-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={depthData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorBid" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorAsk" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="price" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                            <YAxis orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))' }} />
                            <Area type="monotone" dataKey="bidVolume" stackId="1" stroke="hsl(var(--success))" fill="url(#colorBid)" />
                            <Area type="monotone" dataKey="askVolume" stackId="1" stroke="hsl(var(--destructive))" fill="url(#colorAsk)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="flex-1 overflow-hidden flex flex-col min-h-[300px]">
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Side</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Size</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTrades.map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell className="font-mono text-xs">{trade.time}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={trade.side === 'buy' ? 'text-emerald-500 border-emerald-500/30' : 'text-rose-500 border-rose-500/30'}>
                            {trade.side.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className={`text-right font-mono ${trade.side === 'buy' ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {trade.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-mono">{trade.size.toFixed(4)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
