'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, Timestamp } from 'firebase/firestore';
import type { Order, OrderItem, OrderStatus } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateOrderStatus } from '@/lib/order-manager';
import { Loader2 } from 'lucide-react';

interface LiveOrderCardProps {
  order: Order;
}

export function LiveOrderCard({ order }: LiveOrderCardProps) {
  const firestore = useFirestore();
  const [timeAgo, setTimeAgo] = useState('');

  // Helper: format INR using Intl.NumberFormat (reliable and shows ₹)
  const formatINR = (value: number) => {
    // guard against NaN / undefined
    const num = Number(value) || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(num);
  };

  // Memoize the collection reference
  const orderItemsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, `restaurants/${order.restaurantId}/orders/${order.id}/orderItems`);
  }, [firestore, order.id, order.restaurantId]);

  const { data: items, isLoading: isLoadingItems } = useCollection<OrderItem>(orderItemsRef);

  const total = useMemo(() => {
    return items?.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0) || 0;
  }, [items]);

  useEffect(() => {
    if (order.orderDate) {
      // Convert Firestore Timestamp to JS Date, if needed
      const date = order.orderDate instanceof Timestamp
        ? order.orderDate.toDate()
        : new Date(order.orderDate);

      if (!isNaN(date.getTime())) {
        setTimeAgo(formatDistanceToNow(date, { addSuffix: true }));

        const interval = setInterval(() => {
          setTimeAgo(formatDistanceToNow(date, { addSuffix: true }));
        }, 60000); // Update every minute

        return () => clearInterval(interval);
      }
    }
  }, [order.orderDate]);

  const handleStatusChange = (newStatus: OrderStatus) => {
    if (firestore) {
      updateOrderStatus(firestore, order.restaurantId, order.id, newStatus);
    }
  };

  const getBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case 'Bill Requested':
        return 'destructive';
      case 'Served':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline">Table {order.tableNumber}</CardTitle>
            <CardDescription>
              Order #{order.id.substring(0, 5)}... &bull; {timeAgo}
            </CardDescription>
          </div>
          <Badge variant={getBadgeVariant(order.status)} className="capitalize">{order.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {isLoadingItems ? (
          <div className="flex justify-center items-center h-24">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {items?.map(item => {
              const lineTotal = Number(item.price) * Number(item.quantity);
              return (
                <div key={item.id} className="flex justify-between text-sm">
                  <p><span className="font-semibold">{item.quantity}x</span> {item.menuItemName}</p>
                  <p>{formatINR(lineTotal)}</p>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-stretch space-y-4">
        <Separator />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatINR(total)}</span>
        </div>
        <Select defaultValue={order.status} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Update Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Preparing">Preparing</SelectItem>
            <SelectItem value="Cooking">Cooking</SelectItem>
            <SelectItem value="Served">Served</SelectItem>
            <SelectItem value="Bill Requested">Bill Requested</SelectItem>
          </SelectContent>
        </Select>
      </CardFooter>
    </Card>
  );
}
