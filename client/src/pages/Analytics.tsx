import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, Area, AreaChart } from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const correlationData = Array.from({ length: 20 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 100
}));

const rollingBetaData = Array.from({ length: 50 }, (_, i) => ({
  time: i,
  beta: 0.8 + Math.random() * 0.4,
  alpha: (Math.random() - 0.5) * 0.02
}));

// Mock Kalman Filter Data
const kalmanData = Array.from({ length: 100 }, (_, i) => {
    const trueVal = Math.sin(i / 10) * 10 + 50;
    const measured = trueVal + (Math.random() - 0.5) * 10; // Noisy measurement
    const estimate = trueVal + (Math.random() - 0.5) * 2; // Filtered estimate
    return {
        time: i,
        true: trueVal,
        measured: measured,
        estimate: estimate
    };
});

export default function Analytics() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Advanced Analytics</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="1h">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Window" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="4h">4 Hours</SelectItem>
                  <SelectItem value="1d">1 Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="kalman" className="space-y-4">
            <TabsList>
              <TabsTrigger value="correlation">Correlation Analysis</TabsTrigger>
              <TabsTrigger value="beta">Rolling Beta</TabsTrigger>
              <TabsTrigger value="kalman">Kalman Filter</TabsTrigger>
            </TabsList>

            <TabsContent value="correlation" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Asset Correlation (ETH vs BTC)</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                        <XAxis type="number" dataKey="x" name="ETH Return" unit="%" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis type="number" dataKey="y" name="BTC Return" unit="%" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))' }} />
                        <Scatter name="Returns" data={correlationData} fill="hsl(var(--primary))" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Correlation Matrix</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-1 text-sm font-mono">
                      <div className="p-2"></div>
                      <div className="p-2 text-center text-muted-foreground">BTC</div>
                      <div className="p-2 text-center text-muted-foreground">ETH</div>
                      <div className="p-2 text-center text-muted-foreground">SOL</div>
                      
                      <div className="p-2 text-center text-muted-foreground">BTC</div>
                      <div className="p-2 bg-primary/20 text-center flex items-center justify-center">1.00</div>
                      <div className="p-2 bg-primary/15 text-center flex items-center justify-center">0.82</div>
                      <div className="p-2 bg-primary/10 text-center flex items-center justify-center">0.65</div>

                      <div className="p-2 text-center text-muted-foreground">ETH</div>
                      <div className="p-2 bg-primary/15 text-center flex items-center justify-center">0.82</div>
                      <div className="p-2 bg-primary/20 text-center flex items-center justify-center">1.00</div>
                      <div className="p-2 bg-primary/15 text-center flex items-center justify-center">0.71</div>

                      <div className="p-2 text-center text-muted-foreground">SOL</div>
                      <div className="p-2 bg-primary/10 text-center flex items-center justify-center">0.65</div>
                      <div className="p-2 bg-primary/15 text-center flex items-center justify-center">0.71</div>
                      <div className="p-2 bg-primary/20 text-center flex items-center justify-center">1.00</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="beta" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Rolling Beta (60-period)</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rollingBetaData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                      <XAxis dataKey="time" hide />
                      <YAxis domain={['auto', 'auto']} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))' }} />
                      <Legend />
                      <Line type="monotone" dataKey="beta" stroke="hsl(var(--warning))" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="kalman" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Dynamic Hedge Ratio (Kalman Filter)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={kalmanData}>
                                <defs>
                                    <linearGradient id="colorEstimate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                                <XAxis dataKey="time" hide />
                                <YAxis domain={['auto', 'auto']} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))' }} />
                                <Legend />
                                <Area type="monotone" dataKey="measured" stroke="hsl(var(--muted-foreground))" fill="transparent" strokeWidth={1} strokeDasharray="3 3" name="Noisy Measurement" />
                                <Area type="monotone" dataKey="estimate" stroke="hsl(var(--primary))" fill="url(#colorEstimate)" strokeWidth={2} name="Kalman Estimate" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
