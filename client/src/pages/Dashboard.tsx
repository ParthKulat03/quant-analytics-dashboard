// import { useEffect, useState } from "react";
// import { Sidebar } from "@/components/layout/Sidebar";
// import { Header } from "@/components/layout/Header";
// import { PriceChart } from "@/components/dashboard/PriceChart";
// import { SpreadChart } from "@/components/dashboard/SpreadChart";
// import { StatsPanel } from "@/components/dashboard/StatsPanel";
// import { OrderBook } from "@/components/dashboard/OrderBook";
// import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
// import { generateHistoricalData, type AnalyticsData } from "@/lib/mockData";
// import { format } from "date-fns";

// export default function Dashboard() {
//   const [data, setData] = useState<AnalyticsData[]>([]);

//   // Initialize and simulate live data
//   useEffect(() => {
//     // Initial load
//     const initialData = generateHistoricalData(100);
//     setData(initialData);

//     // Live update simulation
//     const interval = setInterval(() => {
//       setData(prev => {
//         const last = prev[prev.length - 1];
//         const now = new Date();
//         const priceA = last.priceA + (Math.random() - 0.5) * 50;
//         const priceB = last.priceB + (Math.random() - 0.5) * 5;
//         const spread = priceA - (16.5 * priceB) + (Math.random() - 0.5) * 10;
//         const zScore = (spread - 500) / 100;

//         const newPoint: AnalyticsData = {
//           timestamp: format(now, "HH:mm:ss"),
//           spread,
//           zScore,
//           hedgeRatio: 16.5 + (Math.random() - 0.5) * 0.01,
//           priceA,
//           priceB
//         };

//         return [...prev.slice(1), newPoint];
//       });
//     }, 1000); // Update every second

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
//       <Sidebar />
      
//       <div className="flex-1 flex flex-col h-full overflow-hidden">
//         <Header />
        
//         <main className="flex-1 overflow-auto p-4 md:p-6 space-y-4 scroll-smooth">
//             {/* Top Stats Row */}
//             <div className="w-full">
//                 <StatsPanel />
//             </div>

//             {/* Main Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[calc(100vh-220px)] min-h-[600px]">
                
//                 {/* Left Column: Charts */}
//                 <div className="md:col-span-8 lg:col-span-9 grid grid-rows-2 gap-4 h-full">
//                     {/* Price Chart - Takes top half */}
//                     <div className="h-full min-h-[300px]">
//                         <PriceChart data={data} />
//                     </div>
                    
//                     {/* Bottom Split: Spread Chart & Alerts */}
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full min-h-[250px]">
//                         <SpreadChart data={data} />
//                         <AlertsPanel />
//                     </div>
//                 </div>

//                 {/* Right Column: Order Book & Trades */}
//                 <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-4 h-full">
//                     <OrderBook />
//                 </div>
//             </div>
//         </main>
//       </div>
//     </div>
//   );
// }















import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { SpreadChart } from "@/components/dashboard/SpreadChart";
import { StatsPanel } from "@/components/dashboard/StatsPanel";
import { OrderBook } from "@/components/dashboard/OrderBook";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { useQuery } from "@tanstack/react-query";
import { getOverviewSeries } from "@/lib/api";

export default function Dashboard() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["overview-series"],
    queryFn: getOverviewSeries,
    refetchInterval: 3000, // live polling
  });

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-4 md:p-6 space-y-4">
          <StatsPanel />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[calc(100vh-220px)] min-h-[600px]">
            <div className="md:col-span-8 lg:col-span-9 grid grid-rows-2 gap-4">
              <PriceChart data={data} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SpreadChart data={data} />
                <AlertsPanel />
              </div>
            </div>

            <div className="md:col-span-4 lg:col-span-3">
              <OrderBook />
            </div>
          </div>

          {isLoading && (
            <p className="text-sm text-muted-foreground">Loading live data…</p>
          )}
        </main>
      </div>
    </div>
  );
}
