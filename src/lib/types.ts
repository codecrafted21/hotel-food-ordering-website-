export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageId: string;
};

export type Category = {
  id: string;
  name: string;
};

export type CartItem = {
  id: string;
  dish: Dish;
  quantity: number;
};

export type OrderStatus = 'Preparing' | 'Cooking' | 'Served' | 'Canceled';

export type Order = {
  id: string;
  tableNumber: number;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
};
