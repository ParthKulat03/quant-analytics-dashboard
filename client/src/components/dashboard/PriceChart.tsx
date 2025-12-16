import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Maximize2 } from "lucide-react";

interface PriceChartProps {
  data: any[];
}

export function PriceChart({ data }: PriceChartProps) {
  return (
    <Card className="col-span-2 h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium text-muted-foreground flex items-center gap-2">
            Price Action (ETH-USDT)
            <Badge variant="secondary" className="font-mono text-xs font-normal">1m</Badge>
          </CardTitle>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono">$3,421.50</span>
            <span className="text-xs font-medium text-emerald-500 font-mono">+1.2%</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="1m" className="h-8">
            <TabsList className="h-8 p-0 bg-muted/50">
              <TabsTrigger value="1s" className="h-full px-3 text-xs data-[state=active]:bg-background">1s</TabsTrigger>
              <TabsTrigger value="1m" className="h-full px-3 text-xs data-[state=active]:bg-background">1m</TabsTrigger>
              <TabsTrigger value="5m" className="h-full px-3 text-xs data-[state=active]:bg-background">5m</TabsTrigger>
            </TabsList>
          </Tabs>
          <button className="text-muted-foreground hover:text-foreground">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px] p-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
            <XAxis 
              dataKey="timestamp" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} 
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              orientation="right"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
                fontSize: '12px'
              }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
              labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="priceA" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
