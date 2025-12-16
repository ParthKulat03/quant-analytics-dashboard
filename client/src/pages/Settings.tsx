import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6 max-w-4xl mx-auto w-full space-y-8">
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">Manage your workspace, data connections, and preferences.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Manage connection keys for Binance and other exchanges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Binance API Key</Label>
                <Input type="password" value="************************" readOnly className="font-mono bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Binance Secret Key</Label>
                <Input type="password" value="************************" readOnly className="font-mono bg-muted" />
              </div>
              <Button variant="outline" className="mt-2">Rotate Keys</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance & Display</CardTitle>
              <CardDescription>Customize the dashboard visualization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="h-20 rounded-md bg-slate-950 border-2 border-primary flex items-center justify-center cursor-pointer">
                        <span className="text-sm font-medium text-white">Institutional Dark</span>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-muted-foreground">Light (Disabled)</Label>
                    <div className="h-20 rounded-md bg-slate-100 border border-border flex items-center justify-center opacity-50 cursor-not-allowed">
                        <span className="text-sm font-medium text-slate-900">Retail Light</span>
                    </div>
                 </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
             <Button variant="ghost">Discard Changes</Button>
             <Button>Save Configuration</Button>
          </div>

        </main>
      </div>
    </div>
  );
}
