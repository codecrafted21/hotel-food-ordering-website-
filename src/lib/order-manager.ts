// A simple in-memory and localStorage-based order manager for demonstration.
// In a real app, you would use a database like Firestore.

import type { Order, OrderStatus } from '@/lib/types';
import { MOCK_ORDERS } from './data';

const ORDER_STORAGE_KEY = 'tablebites_orders';

// Function to get orders from localStorage
export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const storedOrders = localStorage.getItem(ORDER_STORAGE_KEY);
  if (storedOrders) {
    try {
      const parsedOrders = JSON.parse(storedOrders);
      // Dates are stored as strings, so we need to convert them back
      return parsedOrders.map((o: any) => ({ ...o, createdAt: new Date(o.createdAt) }));
    } catch (e) {
      console.error("Failed to parse orders from localStorage", e);
      return [];
    }
  }
  // Initialize with mock orders if nothing is in storage
  setOrders(MOCK_ORDERS);
  return MOCK_ORDERS;
};

// Function to save orders to localStorage
export const setOrders = (orders: Order[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
  // Dispatch a custom event to notify other tabs/windows
  window.dispatchEvent(new Event('orders-updated'));
};

// Function to add a new order
export const addOrder = (order: Order) => {
  const currentOrders = getOrders();
  const updatedOrders = [...currentOrders, order];
  setOrders(updatedOrders);
};

// Function to update an order's status
export const updateOrderStatus = (orderId: string, status: OrderStatus): Order[] => {
    const currentOrders = getOrders();
    const updatedOrders = currentOrders.map(o => 
        o.id === orderId ? { ...o, status } : o
    );
    setOrders(updatedOrders);
    return updatedOrders;
}
