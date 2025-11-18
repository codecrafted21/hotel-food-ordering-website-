import AdminPageClient from "@/components/admin/admin-page-client";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <Link href="/">
            <Button variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Exit Dashboard
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-headline font-bold mb-6">Live Orders</h1>
          <AdminPageClient />
        </div>
      </main>
    </div>
  );
}
