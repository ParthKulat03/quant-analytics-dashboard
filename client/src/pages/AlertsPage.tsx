import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, CheckCircle2, AlertTriangle } from "lucide-react";

const alertHistory = [
  { id: 1, time: "10:42:15", type: "Z-Score", message: "Z-Score crossed 2.0 threshold (2.15)", level: "warning" },
  { id: 2, time: "09:15:00", type: "Spread", message: "Spread widened > 50bps", level: "info" },
  { id: 3, time: "Yesterday", type: "System", message: "Data feed latency spike detected (150ms)", level: "error" },
];

export default function AlertsPage() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Alert Management</h2>
            <Button>
              <Bell className="mr-2 h-4 w-4" /> New Alert
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Active Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Configured Triggers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">ETH-USDT Z-Score</span>
                        <Badge variant="outline" className="text-xs">Technical</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Trigger when Z-Score {">"} 2.0 for 3 periods</p>
                    </div>
                    <Switch defaultChecked={i !== 3} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Alert Channels */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <span className="font-medium">Browser Notifications</span>
                    <p className="text-sm text-muted-foreground">Push notifications to desktop</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <span className="font-medium">Telegram Bot</span>
                    <p className="text-sm text-muted-foreground">Forward alerts to @QuantBot</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="space-y-1">
                    <span className="font-medium">Email Digest</span>
                    <p className="text-sm text-muted-foreground">Daily summary of all triggers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* History */}
          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertHistory.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className={`mt-1 h-2 w-2 rounded-full ${alert.level === 'warning' ? 'bg-amber-500' : alert.level === 'error' ? 'bg-destructive' : 'bg-blue-500'}`} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{alert.type}</span>
                        <span className="text-xs text-muted-foreground font-mono">{alert.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
