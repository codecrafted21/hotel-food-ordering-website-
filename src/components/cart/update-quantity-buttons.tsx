'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from './cart-provider';

type UpdateQuantityButtonsProps = {
  cartItemId: string;
  quantity: number;
};

export function UpdateQuantityButtons({ cartItemId, quantity }: UpdateQuantityButtonsProps) {
  const { dispatch } = useCart();

  const handleUpdate = (newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: cartItemId, quantity: newQuantity } });
  };
  
  const handleRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: cartItemId });
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => quantity > 1 ? handleUpdate(quantity - 1) : handleRemove()}
        aria-label="Remove one item"
      >
        {quantity > 1 ? <Minus className="h-3 w-3" /> : <Trash2 className="h-3 w-3" />}
      </Button>
      <span className="w-6 text-center text-sm font-medium">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => handleUpdate(quantity + 1)}
        aria-label="Add one item"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
