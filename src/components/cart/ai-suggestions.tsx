'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useCart } from './cart-provider';
import { getDishSuggestions } from '@/app/actions';
import { Lightbulb, Loader2 } from 'lucide-react';
import { DISHES } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export function AiSuggestions() {
  const { state, dispatch } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleFetchSuggestions = async () => {
    setIsLoading(true);
    setIsOpen(true);
    // Mock order history from current cart for demonstration
    const orderHistory = state.items.map(item => item.dish.name);
    const result = await getDishSuggestions(orderHistory);
    setSuggestions(result);
    setIsLoading(false);
  };

  const addSuggestionToCart = (dishName: string) => {
    const dishToAdd = DISHES.find(d => d.name === dishName);
    if (dishToAdd) {
      dispatch({ type: 'ADD_ITEM', payload: dishToAdd });
      toast({ title: 'Added to cart!', description: `${dishName} has been added.`});
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button variant="outline" className="w-full" onClick={handleFetchSuggestions} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Lightbulb className="mr-2 h-4 w-4" />
        )}
        Get Suggestions
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline">Chef's Recommendations</DialogTitle>
            <DialogDescription>
              Based on your current order, you might also like these:
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <div className="flex justify-center items-center h-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-2 pt-4">
              {suggestions.length > 0 ? suggestions.map(name => (
                <div key={name} className="flex justify-between items-center p-2 rounded-md hover:bg-secondary">
                  <span className="font-semibold">{name}</span>
                  <Button size="sm" onClick={() => addSuggestionToCart(name)}>Add</Button>
                </div>
              )) : <p className="text-center text-muted-foreground">No suggestions available right now.</p>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
