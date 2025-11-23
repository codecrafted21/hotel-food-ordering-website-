'use client';

import { useState, useEffect, Suspense, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { OrderStatus } from '@/components/order/order-status';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import type { OrderStatus as OrderStatusType, OrderItem, Order } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase, useDoc } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { CreditCard, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { updateOrderStatus } from '@/lib/order-manager';
import { Button } from '@/components/ui/button';

const statusFlow: OrderStatusType[] = ['Preparing', 'Cooking', 'Served'];

function OrderTrackingPageContent({ orderId, tableNumber }: { orderId: string, tableNumber: string | null }) {
  const firestore = useFirestore();
  const restaurantId = "tablebites-restaurant";

  const orderRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, `restaurants/${restaurantId}/orders/${orderId}`);
  }, [firestore, orderId]);
  
  const { data: order, isLoading: isLoadingOrder } = useDoc<Order>(orderRef);

  const orderItemsRef = useMemoFirebase(() => {
      if (!firestore) return null;
      return collection(firestore, `restaurants/${restaurantId}/orders/${orderId}/orderItems`);
  }, [firestore, orderId]);

  const { data: orderItems, isLoading: isLoadingItems } = useCollection<OrderItem>(orderItemsRef);

  const total = orderItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const currentStatus = order?.status || 'Preparing';
  const isOrderServed = currentStatus === 'Served';
  const isBillRequested = currentStatus === 'Bill Requested';

  const handleRequestBill = () => {
    if (firestore && order) {
      updateOrderStatus(firestore, order.restaurantId, order.id, 'Bill Requested');
    }
  };

  if (isLoadingOrder) {
    return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">Thank You For Your Order!</CardTitle>
            <CardDescription>
              Order ID: #{orderId.substring(0, 7)}... | Table: {tableNumber || 'N/A'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="mb-8 text-muted-foreground">Follow the progress of your order below.</p>
            <OrderStatus currentStatus={currentStatus} statuses={statusFlow} />

            <div className="mt-12 w-full">
              <h3 className="text-lg font-semibold mb-4 text-center">Your Items</h3>
               {isLoadingItems ? (
                  <div className="flex justify-center items-center h-24">
                      <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
              ) : (
                <div className="space-y-3 rounded-md border p-4">
                  {orderItems && orderItems.length > 0 ? (
                    orderItems.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <p><span className="font-semibold">{item.quantity}x</span> {item.menuItemName}</p>
                        <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center">No items found for this order.</p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch space-y-4 pt-6">
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
              </div>
              {isOrderServed && (
                <Button onClick={handleRequestBill} size="lg">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Request Bill
                </Button>
              )}
              {isBillRequested && (
                <div className="text-center p-2 bg-secondary rounded-md text-secondary-foreground font-semibold">
                  A member of our staff is on their way with your bill.
                </div>
              )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function OrderPage({ params }: { params: { id: string } }) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const tableNumber = searchParams.get('table');

  return <OrderTrackingPageContent orderId={resolvedParams.id} tableNumber={tableNumber} />;
}

export default function OrderPageWrapper({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <OrderPage params={Promise.resolve(params)} />
    </Suspense>
  );
}
