'use client';

import { useState, useEffect } from 'react';
import { OrderCard } from './order-card';
import { getOrders, updateOrderStatus } from '@/lib/order-manager';
import type { Order, OrderStatus } from '@/lib/types';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChefHat, CookingPot } from 'lucide-react';

const ALL_STATUSES: OrderStatus[] = ['Preparing', 'Cooking', 'Served'];

export default function AdminPageClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string[]>(['Preparing', 'Cooking']);

  useEffect(() => {
    // Load initial orders
    const loadOrders = () => {
      const liveOrders = getOrders().filter(o => o.status !== 'Served');
      setOrders(liveOrders);
    };
    
    loadOrders();

    // Listen for custom event to reload orders
    window.addEventListener('orders-updated', loadOrders);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('orders-updated', loadOrders);
    };
  }, []);


  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = updateOrderStatus(orderId, newStatus);
    setOrders(updatedOrders.filter(o => o.status !== 'Served'));
  };

  const filteredOrders = orders.filter(order => filter.includes(order.status));

  return (
    <div>
        <div className="mb-6 flex justify-center">
            <ToggleGroup 
                type="multiple"
                variant="outline"
                value={filter}
                onValueChange={(value) => setFilter(value.length > 0 ? value : [])}
                aria-label="Filter order status"
            >
                <ToggleGroupItem value="Preparing" aria-label="Toggle Preparing">
                    <CookingPot className="h-4 w-4 mr-2" /> Preparing
                </ToggleGroupItem>
                <ToggleGroupItem value="Cooking" aria-label="Toggle Cooking">
                    <ChefHat className="h-4 w-4 mr-2" /> Cooking
                </ToggleGroupItem>
            </ToggleGroup>
        </div>

      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()).map(order => (
            <OrderCard key={order.id} order={order} onStatusUpdate={handleStatusUpdate} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-semibold">All Caught Up!</h2>
            <p className="text-muted-foreground mt-2">No active orders matching your filter.</p>
        </div>
      )}
    </div>
  );
}
