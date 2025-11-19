import AdminPageClient from "@/components/admin/admin-page-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-6">Live Orders</h1>
      <Card className="mb-6 bg-blue-950/50 border-blue-500/20">
        <CardHeader className="flex flex-row items-center gap-4">
          <Info className="w-6 h-6 text-blue-400" />
          <CardTitle className="text-blue-300 font-headline text-xl mt-0">How Live Orders Work</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm prose-invert text-blue-200/80 max-w-none">
          <p>
            This dashboard demonstrates real-time order tracking using Firebase Firestore. When a customer places an order from their device, the new order is saved to the central database.
          </p>
          <p>
            This admin panel is subscribed to live updates from the database. As soon as a new order is created, it will automatically appear here without needing a page refresh. You can then update the order status, and the customer will see the changes on their order tracking page.
          </p>
        </CardContent>
      </Card>
      <AdminPageClient />
    </div>
  );
}
