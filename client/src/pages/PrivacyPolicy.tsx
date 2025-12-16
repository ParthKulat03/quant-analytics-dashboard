import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col items-center py-12 px-4">
      <div className="max-w-3xl w-full space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        </div>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="lead text-xl text-foreground">
            Effective Date: December 16, 2025
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Data Collection</h2>
            <p>
              QuantAnalytics collects trading data, usage metrics, and personal account information to provide our high-frequency trading analytics services. We prioritize data minimization and only collect what is strictly necessary for operational integrity.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Usage of Trading Data</h2>
            <p>
              Your trading strategies, algorithm configurations, and execution history are treated as highly confidential intellectual property. We do not sell, trade, or analyze your proprietary trading logic for our own benefit.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Security Measures</h2>
            <p>
              We employ institutional-grade encryption for all data at rest and in transit. Our infrastructure undergoes regular penetration testing and security audits to ensure the safety of your financial data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Contact Us</h2>
            <p>
              If you have any questions about this policy, please contact our Data Protection Officer at privacy@quantfirm.com.
            </p>
          </section>
        </div>
        
        <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">© 2025 QuantAnalytics Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
