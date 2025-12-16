import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { User, Shield, Bell, Lock } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6 max-w-4xl mx-auto w-full space-y-8">
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">Manage your profile, preferences, and privacy.</p>
          </div>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details and credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input defaultValue="jane.doe@quantfirm.com" />
                </div>
              </div>
              <div className="space-y-2">
                 <Label>Password</Label>
                 <div className="flex gap-2">
                   <Input type="password" value="**************" readOnly className="font-mono" />
                   <Button variant="outline" size="sm">Change</Button>
                 </div>
              </div>
            </CardContent>
          </Card>

          {/* System Preferences (Replaces API Config) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                System Preferences
              </CardTitle>
              <CardDescription>Configure workspace behavior and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                 <div className="space-y-0.5">
                   <Label>Data Refresh Rate</Label>
                   <p className="text-sm text-muted-foreground">Update frequency for real-time charts</p>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Real-time (WebSocket)</span>
                    <Switch defaultChecked />
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <div className="space-y-0.5">
                   <Label>Sound Effects</Label>
                   <p className="text-sm text-muted-foreground">Play audible alerts for critical events</p>
                 </div>
                 <Switch defaultChecked />
               </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>Manage your data privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/20">
                 <div className="space-y-1">
                   <span className="font-medium flex items-center gap-2">
                     <Lock className="h-4 w-4 text-muted-foreground" />
                     Privacy Policy
                   </span>
                   <p className="text-sm text-muted-foreground">Read about how we handle your trading data and personal information.</p>
                 </div>
                 <Link href="/privacy">
                    <Button variant="secondary">View Policy</Button>
                 </Link>
               </div>
            </CardContent>
          </Card>

          {/* Appearance (Kept as is, simplified) */}
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                 <div className="h-20 rounded-md bg-slate-950 border-2 border-primary flex items-center justify-center cursor-pointer">
                    <span className="text-sm font-medium text-white">Institutional Dark</span>
                 </div>
                 <div className="h-20 rounded-md bg-slate-100 border border-border flex items-center justify-center opacity-50 cursor-not-allowed">
                    <span className="text-sm font-medium text-slate-900">Retail Light (Coming Soon)</span>
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
