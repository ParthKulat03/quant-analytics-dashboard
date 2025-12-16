import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { OrderBook } from "@/components/dashboard/OrderBook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const recentTrades = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  time: new Date(Date.now() - i * 1000).toLocaleTimeString(),
  price: 3420 + (Math.random() - 0.5) * 10,
  size: Math.random() * 5,
  side: Math.random() > 0.5 ? 'buy' : 'sell'
}));

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
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Market Depth</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center bg-muted/20 rounded border border-dashed border-border m-4">
                    <span className="text-muted-foreground">Depth Chart Visualization (Area Chart)</span>
                </CardContent>
            </Card>

            <Card className="flex-1 overflow-hidden flex flex-col">
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
