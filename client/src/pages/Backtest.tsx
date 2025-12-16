import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Play, RotateCcw } from "lucide-react";
import { useState } from "react";

const generateEquityData = () => {
  let equity = 10000;
  return Array.from({ length: 100 }, (_, i) => {
    equity = equity * (1 + (Math.random() - 0.45) * 0.05);
    return {
      day: i,
      equity: equity
    };
  });
};

export default function Backtest() {
  const [data, setData] = useState(generateEquityData());

  const runBacktest = () => {
    setData(generateEquityData());
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Configuration Panel */}
          <Card className="md:col-span-4 lg:col-span-3 h-fit">
            <CardHeader>
              <CardTitle>Strategy Config</CardTitle>
              <CardDescription>Define backtest parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Strategy</Label>
                <Select defaultValue="pairs">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pairs">Pairs Trading (Coint)</SelectItem>
                    <SelectItem value="meanrev">Mean Reversion</SelectItem>
                    <SelectItem value="momentum">Momentum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Timeframe</Label>
                <Select defaultValue="1h">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1m">1 Minute</SelectItem>
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="1d">1 Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Initial Capital ($)</Label>
                <Input type="number" defaultValue={10000} />
              </div>

              <div className="space-y-2">
                <Label>Z-Score Entry</Label>
                <Input type="number" defaultValue={2.0} step={0.1} />
              </div>

               <div className="space-y-2">
                <Label>Z-Score Exit</Label>
                <Input type="number" defaultValue={0.0} step={0.1} />
              </div>

              <div className="pt-4 flex gap-2">
                <Button className="flex-1" onClick={runBacktest}>
                  <Play className="mr-2 h-4 w-4" /> Run
                </Button>
                <Button variant="outline" size="icon">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6">
             {/* Performance Metrics */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-emerald-500">+24.5%</div>
                        <p className="text-xs text-muted-foreground">Total Return</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">1.84</div>
                        <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-rose-500">-8.2%</div>
                        <p className="text-xs text-muted-foreground">Max Drawdown</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-2xl font-bold">142</div>
                        <p className="text-xs text-muted-foreground">Total Trades</p>
                    </CardContent>
                </Card>
             </div>

             {/* Equity Curve */}
             <Card className="h-[400px]">
                <CardHeader>
                    <CardTitle>Equity Curve</CardTitle>
                </CardHeader>
                <CardContent className="h-[340px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="day" hide />
                            <YAxis domain={['auto', 'auto']} stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(val) => `$${val.toFixed(0)}`} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))' }}
                                formatter={(value: number) => [`$${value.toFixed(2)}`, "Equity"]}
                            />
                            <Area type="monotone" dataKey="equity" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorEquity)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
             </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
