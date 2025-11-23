'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore } from '@/firebase';
import { collection, query, orderBy, onSnapshot, type Order as FirestoreOrder } from 'firebase/firestore';
import { Loader2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';
import { LiveOrderCard } from '@/components/admin/live-order-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCodeManager } from '@/components/admin/qr-code-manager';
import { MenuManager } from '@/components/admin/menu-manager';

export default function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const [orders, setOrders] = useState<FirestoreOrder[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    if (!firestore || !user) return;

    const restaurantId = "tablebites-restaurant";
    const ordersQuery = query(collection(firestore, `restaurants/${restaurantId}/orders`), orderBy('orderDate', 'desc'));

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const fetchedOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as FirestoreOrder[];
      setOrders(fetchedOrders);
      setIsLoadingOrders(false);
    }, (error) => {
      console.error("Error fetching orders: ", error);
      setIsLoadingOrders(false);
    });

    return () => unsubscribe();
  }, [firestore, user]);


  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push('/admin/login');
  };

  if (isUserLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    router.replace('/admin/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </header>

      <Tabs defaultValue="orders">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Live Orders</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="tables">Table QR Codes</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <div className="mt-6">
            {isLoadingOrders && <div className="text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>}
            
            {orders && orders.length === 0 && !isLoadingOrders && (
              <p className="text-center text-muted-foreground mt-12">No orders yet.</p>
            )}

            {orders && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map(order => (
                  <LiveOrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="menu">
            <MenuManager />
        </TabsContent>
        <TabsContent value="tables">
            <QrCodeManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
