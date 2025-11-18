'use client';

import Image from 'next/image';
import { useCart } from './cart-provider';
import type { CartItem as CartItemType } from '@/lib/types';
import { UpdateQuantityButtons } from './update-quantity-buttons';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const dishImage = PlaceHolderImages.find((img) => img.id === item.dish.imageId);

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-16 w-16 rounded-md overflow-hidden">
        {dishImage && (
          <Image
            src={dishImage.imageUrl}
            alt={item.dish.name}
            fill
            className="object-cover"
            sizes="64px"
            data-ai-hint={dishImage.imageHint}
          />
        )}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-sm">{item.dish.name}</h4>
        <p className="text-muted-foreground text-sm">${item.dish.price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
         <p className="font-semibold text-sm">${(item.dish.price * item.quantity).toFixed(2)}</p>
         <UpdateQuantityButtons cartItemId={item.id} quantity={item.quantity} />
      </div>
    </div>
  );
}
