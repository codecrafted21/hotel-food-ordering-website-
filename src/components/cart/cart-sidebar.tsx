'use client';

import { useCart } from './cart-provider';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CartItem } from './cart-item';
import { cn } from '@/lib/utils';
import { ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { AiSuggestions } from './ai-suggestions';

export function CartSidebar() {
  const { state, dispatch } = useCart();
  const { isOpen, items } = state;

  const subtotal = items.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  );

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black/60 z-40 transition-opacity',
          isOpen ? 'opacity-100 animate-overlay-in' : 'opacity-0 pointer-events-none animate-overlay-out'
        )}
        onClick={() => dispatch({ type: 'SET_CART_OPEN', payload: false })}
      />
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-sm bg-card border-l border-border z-50 transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0 animate-cart-in' : 'translate-x-full animate-cart-out'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold font-headline">Your Order</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch({ type: 'SET_CART_OPEN', payload: false })}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close cart</span>
            </Button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">Your cart is empty</h3>
              <p className="text-muted-foreground text-sm">Add some delicious food to get started!</p>
            </div>
          ) : (
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
          )}

          {items.length > 0 && (
            <div className="p-4 border-t space-y-4 bg-background/50">
              <AiSuggestions />
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Link href="/checkout" className="block">
                <Button 
                  className="w-full font-bold" 
                  size="lg"
                  onClick={() => dispatch({ type: 'SET_CART_OPEN', payload: false })}
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
