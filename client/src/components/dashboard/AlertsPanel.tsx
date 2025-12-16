// import { Plus, Trash2, Bell } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useState } from "react";

// export function AlertsPanel() {
//   const [alerts, setAlerts] = useState([
//     { id: 1, metric: "Z-Score", condition: ">", value: "2.0", active: true },
//     { id: 2, metric: "Spread", condition: "<", value: "-100", active: true },
//   ]);

//   return (
//     <Card className="h-full flex flex-col">
//       <CardHeader className="flex flex-row items-center justify-between py-3 border-b border-border">
//         <CardTitle className="text-sm font-medium flex items-center gap-2">
//           <Bell className="h-4 w-4" />
//           Alert Configuration
//         </CardTitle>
//         <Button size="sm" variant="outline" className="h-7 text-xs">
//           <Plus className="h-3 w-3 mr-1" /> Add
//         </Button>
//       </CardHeader>
//       <CardContent className="flex-1 overflow-auto p-0">
//         <div className="p-4 space-y-4">
//             {/* New Alert Form Mockup */}
//             <div className="grid grid-cols-3 gap-2 p-3 bg-muted/30 rounded-md border border-border">
//                 <div className="space-y-1">
//                     <Label className="text-[10px] text-muted-foreground">Metric</Label>
//                     <Select defaultValue="zscore">
//                         <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="zscore">Z-Score</SelectItem>
//                             <SelectItem value="spread">Spread</SelectItem>
//                             <SelectItem value="price">Price</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>
//                 <div className="space-y-1">
//                     <Label className="text-[10px] text-muted-foreground">Condition</Label>
//                     <Select defaultValue="gt">
//                         <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="gt">{">"} Greater</SelectItem>
//                             <SelectItem value="lt">{"<"} Less</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>
//                 <div className="space-y-1">
//                     <Label className="text-[10px] text-muted-foreground">Value</Label>
//                     <Input className="h-7 text-xs" placeholder="2.0" />
//                 </div>
//             </div>

//             <div className="space-y-2">
//                 <Label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Active Alerts</Label>
//                 {alerts.map((alert) => (
//                     <div key={alert.id} className="flex items-center justify-between p-2 rounded bg-card border border-border hover:border-primary/50 transition-colors group">
//                         <div className="flex items-center gap-3">
//                             <div className={`w-2 h-2 rounded-full ${alert.active ? 'bg-emerald-500 animate-pulse' : 'bg-muted'}`} />
//                             <span className="text-sm font-medium font-mono">{alert.metric} {alert.condition} {alert.value}</span>
//                         </div>
//                         <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
//                             <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
//                         </Button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }











import { useEffect, useState } from "react";
import { Plus, Trash2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/alerts/config")
      .then((res) => res.json())
      .then(setAlerts)
      .catch(console.error);
  }, []);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between py-3 border-b border-border">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Alert Configuration
        </CardTitle>
        <Button size="sm" variant="outline" className="h-7 text-xs">
          <Plus className="h-3 w-3 mr-1" /> Add
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto p-4 space-y-4">
        <Label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          Active Alerts
        </Label>

        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-2 rounded bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full ${
                  alert.enabled
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-muted"
                }`}
              />
              <span className="text-sm font-medium font-mono">
                {alert.type.toUpperCase()} &gt; {alert.threshold}
              </span>
            </div>

            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
