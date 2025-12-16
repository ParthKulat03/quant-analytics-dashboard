// import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// interface SpreadChartProps {
//   data: any[];
// }

// export function SpreadChart({ data }: SpreadChartProps) {
//   const latestZ = data.length > 0 ? data[data.length - 1].zScore : 0;
//   const isAlert = Math.abs(latestZ) > 2;

//   return (
//     <Card className="h-full flex flex-col">
//       <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//         <CardTitle className="text-base font-medium text-muted-foreground">Spread & Z-Score</CardTitle>
//         <Badge variant={isAlert ? "destructive" : "secondary"} className="font-mono text-xs">
//           Z: {latestZ.toFixed(2)}
//         </Badge>
//       </CardHeader>
//       <CardContent className="flex-1 min-h-[200px] p-0">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
//             <XAxis dataKey="timestamp" hide />
//             <YAxis 
//               domain={[-4, 4]} 
//               tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
//               tickLine={false}
//               axisLine={false}
//             />
//             <Tooltip
//                contentStyle={{ 
//                 backgroundColor: 'hsl(var(--popover))', 
//                 border: '1px solid hsl(var(--border))',
//                 borderRadius: 'var(--radius)',
//                 fontSize: '12px'
//               }}
//             />
//             <ReferenceLine y={2} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
//             <ReferenceLine y={-2} stroke="hsl(var(--success))" strokeDasharray="3 3" />
//             <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" />
            
//             <Line 
//               type="stepAfter" 
//               dataKey="zScore" 
//               stroke="hsl(var(--accent-foreground))" 
//               strokeWidth={1.5}
//               dot={false}
//               isAnimationActive={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }














import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SpreadChart({ data }: { data: any[] }) {
  const latest = data[data.length - 1];
  const z = latest?.zScore ?? 0;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-muted-foreground">
          Spread & Z-Score
        </CardTitle>
        <Badge variant={Math.abs(z) > 2 ? "destructive" : "secondary"}>
          Z: {z.toFixed(2)}
        </Badge>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="timestamp" hide />
            <YAxis domain={[-4, 4]} />
            <Tooltip />
            <ReferenceLine y={2} stroke="red" strokeDasharray="3 3" />
            <ReferenceLine y={-2} stroke="green" strokeDasharray="3 3" />
            <Line
              type="stepAfter"
              dataKey="zScore"
              stroke="hsl(var(--primary))"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
