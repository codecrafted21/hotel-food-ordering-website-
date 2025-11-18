'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import type { Dish } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/components/cart/cart-provider';
import { useToast } from '@/hooks/use-toast';

type DishCardProps = {
  dish: Dish;
};

export function DishCard({ dish }: DishCardProps) {
  const dishImage = PlaceHolderImages.find((img) => img.id === dish.imageId);
  const { dispatch } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: dish });
    dispatch({ type: 'SET_CART_OPEN', payload: true });
    toast({
      title: 'Added to cart',
      description: `${dish.name} is now in your order.`,
    });
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          {dishImage ? (
            <Image
              src={dishImage.imageUrl}
              alt={dish.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              data-ai-hint={dishImage.imageHint}
            />
          ) : (
            <div className="w-full h-full bg-secondary"></div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <CardTitle className="text-lg font-bold font-headline">{dish.name}</CardTitle>
        <CardDescription className="mt-2 text-sm text-muted-foreground h-10 overflow-hidden">
          {dish.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-bold text-primary">₹{dish.price.toFixed(2)}</p>
        <Button onClick={handleAddToCart} size="sm" aria-label={`Add ${dish.name} to cart`}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
