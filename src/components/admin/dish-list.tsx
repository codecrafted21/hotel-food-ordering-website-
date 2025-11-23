'use client';
import { useState } from 'react';
import type { Dish } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { EditDishForm } from './edit-dish-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useFirestore } from '@/firebase';
import { deleteDish } from '@/lib/order-manager';
import { useToast } from '@/hooks/use-toast';

interface DishListProps {
  dishes: Dish[];
}

export function DishList({ dishes }: DishListProps) {
  const [dishToEdit, setDishToEdit] = useState<Dish | null>(null);
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleDelete = async (dishId: string, dishName: string) => {
    if (!firestore) return;
    try {
        await deleteDish(firestore, dishId);
        toast({
            title: "Dish Deleted",
            description: `${dishName} has been removed from the menu.`
        })
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Error Deleting Dish",
            description: error.message
        })
    }
  }

  if (dishes.length === 0) {
    return <p className="text-muted-foreground text-center">No dishes on the menu yet.</p>;
  }

  return (
    <div className="space-y-4">
      {dishes.map((dish) => (
        <div key={dish.id} className="flex items-center gap-4 rounded-md border p-3">
          <Image
            src={dish.imageUrl || 'https://placehold.co/100x100'}
            alt={dish.name}
            width={64}
            height={64}
            className="rounded-md object-cover h-16 w-16"
          />
          <div className="flex-1">
            <h4 className="font-semibold">{dish.name}</h4>
            <p className="text-sm text-muted-foreground">₹{dish.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setDishToEdit(dish)}>
              <Edit className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the dish "{dish.name}" from your menu. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(dish.id, dish.name)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}

      {dishToEdit && (
        <EditDishForm
          dish={dishToEdit}
          isOpen={!!dishToEdit}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setDishToEdit(null);
            }
          }}
        />
      )}
    </div>
  );
}
