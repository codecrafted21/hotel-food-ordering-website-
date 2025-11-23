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
    const snapshot = await getDocs(dishesCollection);
    if (snapshot.empty) {
      console.log('Dishes collection is empty. Seeding database with sample dishes...');
      const batch = writeBatch(firestore);

      SEED_DISHES.forEach((dish) => {
        // We can use the static dish id for the new document id
        const dishRef = doc(dishesCollection, dish.id);
        const { imageId, ...dishData } = dish; // imageId is not part of the primary dish data
        
        // Find the image URL from placeholder data to store in the document
        const imageUrl = SEED_DISHES.find(d => d.id === dish.id)?.imageUrl || 'https://placehold.co/600x400';

        batch.set(dishRef, {
          ...dishData,
          imageUrl: imageUrl, // Save the image URL directly
        });
      });

      await batch.commit();
      console.log('Database seeded successfully!');
    } else {
      console.log('Dishes collection already has data. Skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
