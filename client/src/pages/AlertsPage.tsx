// import { useEffect, useState } from "react";
// import { Sidebar } from "@/components/layout/Sidebar";
// import { Header } from "@/components/layout/Header";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import { Bell } from "lucide-react";
// import {
//   getAlertsConfig,
//   getAlertsHistory,
//   addAlert,
// } from "@/lib/api";

// type AlertConfig = {
//   id: string;
//   enabled: boolean;
//   symbol_x: string;
//   symbol_y: string;
//   tf: string;
//   threshold: number;
//   type: string;
// };

// type AlertHistory = {
//   type: string;
//   message: string;
//   time?: string;
// };

// export default function AlertsPage() {
//   const [configs, setConfigs] = useState<AlertConfig[]>([]);
//   const [history, setHistory] = useState<AlertHistory[]>([]);
//   const [loading, setLoading] = useState(true);

//   async function loadData() {
//     setLoading(true);
//     try {
//       const [cfg, hist] = await Promise.all([
//         getAlertsConfig(),
//         getAlertsHistory(),
//       ]);
//       setConfigs(cfg);
//       setHistory(hist);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadData();
//   }, []);

//   async function handleAddTestAlert() {
//     await addAlert({
//       id: `test_${Date.now()}`,
//       enabled: true,
//       symbol_x: "BTCUSDT",
//       symbol_y: "ETHUSDT",
//       tf: "1m",
//       threshold: 2.0,
//       type: "zscore",
//     });
//     loadData(); // 👈 THIS IS CRITICAL
//   }

//   return (
//     <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
//       <Sidebar />
//       <div className="flex-1 flex flex-col h-full overflow-hidden">
//         <Header />
//         <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-bold tracking-tight">
//               Alert Management
//             </h2>
//             <Button onClick={handleAddTestAlert}>
//               <Bell className="mr-2 h-4 w-4" /> New Alert
//             </Button>
//           </div>

//           {/* Configured Triggers */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Configured Triggers</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {loading && <p className="text-muted-foreground">Loading…</p>}

//               {!loading && configs.length === 0 && (
//                 <p className="text-muted-foreground">No alerts configured</p>
//               )}

//               {configs.map((a) => (
//                 <div
//                   key={a.id}
//                   className="flex items-center justify-between p-4 border border-border rounded-lg bg-card/50"
//                 >
//                   <div className="space-y-1">
//                     <div className="flex items-center gap-2">
//                       <span className="font-medium">
//                         {a.symbol_y}-{a.symbol_x} Z-Score
//                       </span>
//                       <Badge variant="outline" className="text-xs">
//                         Technical
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-muted-foreground">
//                       Trigger when Z-Score &gt; {a.threshold} ({a.tf})
//                     </p>
//                   </div>
//                   <Switch checked={a.enabled} />
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Alert History */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Alert History</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {history.length === 0 && (
//                 <p className="text-muted-foreground">No alert history yet</p>
//               )}

//               {history.map((h, i) => (
//                 <div key={i} className="border-b border-border pb-2">
//                   <p className="text-sm font-medium">{h.type}</p>
//                   <p className="text-sm text-muted-foreground">{h.message}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </main>
//       </div>
//     </div>
//   );
// }

















import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Trash2, Bell } from "lucide-react";
import { AddAlertModal } from "@/components/dashboard/NewAlertModal";
import {
  getAlertsConfig,
  getAlertsHistory,
  deleteAlert as apiDeleteAlert,
} from "@/lib/api";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const loadData = async () => {
    const [cfg, hist] = await Promise.all([
      getAlertsConfig(),
      getAlertsHistory(),
    ]);
    setAlerts(cfg);
    setHistory(hist);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteAlert = async (id: string) => {
    await apiDeleteAlert(id);
    await loadData();
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Alert Management</h2>
            <Button onClick={() => setOpen(true)}>
              <Bell className="mr-2 h-4 w-4" /> New Alert
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configured Triggers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.length === 0 && (
                  <p className="text-muted-foreground text-sm">
                    No alerts configured
                  </p>
                )}

                {alerts.map((a) => (
                  <div
                    key={a.id}
                    className="flex justify-between items-center p-3 border rounded"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {a.symbol_y}-{a.symbol_x} Z-Score
                        </span>
                        <Badge variant="outline">Technical</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Trigger when Z-Score &gt; {a.threshold}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Switch checked={a.enabled} />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteAlert(a.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  Browser Notifications <Switch defaultChecked />
                </div>
                <div className="flex justify-between">
                  Telegram Bot <Switch />
                </div>
                <div className="flex justify-between">
                  Email Digest <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
            </CardHeader>
            <CardContent>
              {history.length === 0 && (
                <p className="text-muted-foreground text-sm">
                  No alert history yet
                </p>
              )}
              {history.map((h, i) => (
                <div key={i} className="text-sm py-1">
                  • {h.message}
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* ✅ MODAL — PROPERLY CLOSED */}
      <AddAlertModal
        open={open}
        onClose={() => setOpen(false)}
        onAdded={async () => {
          await loadData();
        }}
      />
    </div>
  );
}

