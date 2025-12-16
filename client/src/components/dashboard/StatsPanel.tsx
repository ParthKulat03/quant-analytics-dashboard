// import { ArrowUpRight, ArrowDownRight, Activity, Scale, GitMerge } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export function StatsPanel() {
//   const stats = [
//     {
//       label: "Hedge Ratio",
//       value: "0.842",
//       change: "+0.02",
//       trend: "up",
//       icon: Scale,
//     },
//     {
//       label: "ADF p-value",
//       value: "0.012",
//       change: "Stationary",
//       trend: "neutral",
//       icon: Activity,
//     },
//     {
//       label: "Correlation (1H)",
//       value: "0.92",
//       change: "-0.05",
//       trend: "down",
//       icon: GitMerge,
//     }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {stats.map((stat, i) => (
//         <Card key={i} className="bg-card/50">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               {stat.label}
//             </CardTitle>
//             <stat.icon className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold font-mono">{stat.value}</div>
//             <p className="text-xs text-muted-foreground flex items-center mt-1">
//               {stat.trend === "up" && <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />}
//               {stat.trend === "down" && <ArrowDownRight className="h-3 w-3 text-rose-500 mr-1" />}
//               <span className={stat.trend === "up" ? "text-emerald-500" : stat.trend === "down" ? "text-rose-500" : ""}>
//                 {stat.change}
//               </span>
//             </p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }














import {
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Scale,
  GitMerge,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getOverviewMetrics } from "@/lib/api";

export function StatsPanel() {
  const { data } = useQuery({
    queryKey: ["overview-metrics"],
    queryFn: getOverviewMetrics,
    refetchInterval: 5000,
  });

  if (!data) return null;

  const stats = [
    {
      label: "Hedge Ratio",
      value: data.hedge_ratio.toFixed(3),
      trend: "up",
      icon: Scale,
    },
    {
      label: "ADF p-value",
      value: data.adf_pvalue.toFixed(3),
      trend: "neutral",
      icon: Activity,
      extra: data.stationary ? "Stationary" : "Non-stationary",
    },
    {
      label: "Correlation (1H)",
      value: data.correlation.toFixed(2),
      trend: data.correlation > 0 ? "up" : "down",
      icon: GitMerge,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((s, i) => (
        <Card key={i} className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              {s.label}
            </CardTitle>
            <s.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{s.value}</div>
            <p className="text-xs mt-1 flex items-center">
              {s.trend === "up" && (
                <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              )}
              {s.trend === "down" && (
                <ArrowDownRight className="h-3 w-3 text-rose-500 mr-1" />
              )}
              <span className="text-muted-foreground">
                {s.extra ?? "Live"}
              </span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
