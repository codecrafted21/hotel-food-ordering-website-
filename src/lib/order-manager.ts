import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  writeBatch,
  Firestore,
  deleteDoc,
  getDocs,
  query,
} from 'firebase/firestore';
import type { CartItem, OrderStatus, Dish } from '@/lib/types';
import { updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { DISHES as SEED_DISHES } from '@/lib/data';

interface OrderData {
  restaurantId: string;
  tableNumber: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  userId: string;
}

// Function to add a new order to Firestore
export const addOrder = async (firestore: Firestore, orderData: OrderData): Promise<string | null> => {
  const { restaurantId, tableNumber, items, userId, status } = orderData;
  
  try {
    const ordersCollection = collection(firestore, `restaurants/${restaurantId}/orders`);
    
    // 1. Create the main order document
    const orderDocRef = await addDoc(ordersCollection, {
      tableNumber: tableNumber,
      orderDate: serverTimestamp(),
      status: status,
      restaurantId: restaurantId,
      userId: userId, // Add the user ID to the order
    });

    // 2. Create a batch write for all the order items
    const batch = writeBatch(firestore);
    const orderItemsCollection = collection(firestore, `restaurants/${restaurantId}/orders/${orderDocRef.id}/orderItems`);

    items.forEach(item => {
      const orderItemRef = doc(orderItemsCollection); // Creates a new doc with a random ID
      batch.set(orderItemRef, {
        orderId: orderDocRef.id,
        menuItemId: item.dish.id,
        menuItemName: item.dish.name, // Denormalizing for easier display
        quantity: item.quantity,
        price: item.dish.price,
      });
    });

    // 3. Commit the batch
    await batch.commit();

    return orderDocRef.id;

  } catch (error) {
    console.error("Error placing order:", error);
    // In a real app, you would want to use a more robust error handling and user feedback mechanism
    return null;
  }
};


// Function to update an order's status
export const updateOrderStatus = (firestore: Firestore, restaurantId: string, orderId: string, status: OrderStatus) => {
    if (!restaurantId || !orderId) {
        console.error("Missing restaurantId or orderId");
        return;
    }
    const orderRef = doc(firestore, `restaurants/${restaurantId}/orders`, orderId);
    updateDocumentNonBlocking(orderRef, { status: status });
}

// Function to update a dish
export const updateDish = (firestore: Firestore, dishId: string, values: Partial<Dish>) => {
    const restaurantId = 'tablebites-restaurant';
    const dishRef = doc(firestore, `restaurants/${restaurantId}/dishes/${dishId}`);
    return updateDoc(dishRef, values);
}

// Function to delete a dish
export const deleteDish = (firestore: Firestore, dishId: string) => {
    const restaurantId = 'tablebites-restaurant';
    const dishRef = doc(firestore, `restaurants/${restaurantId}/dishes/${dishId}`);
    return deleteDoc(dishRef);
}


// --- ONE-TIME DATABASE SEEDING ---
// This function will populate the menu with sample dishes if the collection is empty.
export const seedDatabase = async (firestore: Firestore) => {
  const restaurantId = 'tablebites-restaurant';
  const dishesCollection = collection(firestore, `restaurants/${restaurantId}/dishes`);
  
  try {
    // This is a destructive operation, but necessary to fix the bad data.
    // First, delete all existing documents in the 'dishes' collection.
    console.log('Clearing existing dishes from the database...');
    const existingDishesSnapshot = await getDocs(query(dishesCollection));
    const deleteBatch = writeBatch(firestore);
    existingDishesSnapshot.docs.forEach(doc => deleteBatch.delete(doc.ref));
    await deleteBatch.commit();
    console.log('Existing dishes cleared. Now seeding fresh data...');

    // Now, seed the database with the corrected data from data.ts
    const batch = writeBatch(firestore);
    SEED_DISHES.forEach((dish) => {
      const dishRef = doc(dishesCollection, dish.id);
      const { imageId, ...dishData } = dish;
      const imageUrl = SEED_DISHES.find(d => d.id === dish.id)?.imageUrl || 'https://placehold.co/600x400';
      batch.set(dishRef, {
        ...dishData,
        imageUrl: imageUrl,
      });
    });
    await batch.commit();
    console.log('Database seeded successfully with corrected data!');

  } catch (error) {
    console.error('Error reseeding database:', error);
  }
};
