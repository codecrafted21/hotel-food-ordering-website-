import type { Category, Dish, Order, Table, Waiter } from './types';

export const CATEGORIES: Category[] = [
  { id: 'starters', name: 'Starters' },
  { id: 'curries', name: 'Curries' },
  { id: 'biryani', name: 'Biryani' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'beverages', name: 'Beverages' },
];

export const DISHES: Dish[] = [
  // Starters
  {
    id: 'dish-1',
    name: 'Paneer Tikka',
    description: 'Cubes of paneer marinated in spices and grilled in a tandoor.',
    price: 280,
    categoryId: 'starters',
    imageId: 'dish-starter-1',
  },
  {
    id: 'dish-2',
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas.',
    price: 120,
    categoryId: 'starters',
    imageId: 'dish-starter-2',
  },
  {
    id: 'dish-3',
    name: 'Aloo Tikki',
    description: 'Spiced potato patties, shallow-fried until golden brown.',
    price: 150,
    categoryId: 'starters',
    imageId: 'dish-starter-3',
  },

  // Curries
  {
    id: 'dish-4',
    name: 'Butter Chicken',
    description: 'Grilled chicken in a rich, creamy tomato and butter sauce.',
    price: 450,
    categoryId: 'curries',
    imageId: 'dish-main-1',
  },
  {
    id: 'dish-5',
    name: 'Palak Paneer',
    description: 'Paneer cubes in a smooth, creamy spinach gravy.',
    price: 380,
    categoryId: 'curries',
    imageId: 'dish-main-2',
  },
  {
    id: 'dish-6',
    name: 'Dal Makhani',
    description: 'Black lentils slow-cooked with butter and cream.',
    price: 320,
    categoryId: 'curries',
    imageId: 'dish-main-3',
  },

  // Biryani
  {
    id: 'dish-7',
    name: 'Hyderabadi Chicken Biryani',
    description: 'Aromatic basmati rice with succulent chicken and spices.',
    price: 480,
    categoryId: 'biryani',
    imageId: 'dish-biryani-1',
  },
  {
    id: 'dish-8',
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice cooked with assorted vegetables and spices.',
    price: 350,
    categoryId: 'biryani',
    imageId: 'dish-biryani-2',
  },

  // Desserts
  {
    id: 'dish-9',
    name: 'Gulab Jamun',
    description: 'Soft, spongy milk-solid balls soaked in sweet syrup.',
    price: 150,
    categoryId: 'desserts',
    imageId: 'dish-dessert-1',
  },
  {
    id: 'dish-10',
    name: 'Rasmalai',
    description: 'Soft paneer discs soaked in chilled, creamy milk.',
    price: 180,
    categoryId: 'desserts',
    imageId: 'dish-dessert-2',
  },

  // Beverages
  {
    id: 'dish-11',
    name: 'Masala Chai',
    description: 'Classic Indian tea brewed with aromatic spices.',
    price: 80,
    categoryId: 'beverages',
    imageId: 'dish-drink-1',
  },
  {
    id: 'dish-12',
    name: 'Mango Lassi',
    description: 'A refreshing yogurt-based drink with sweet mango pulp.',
    price: 140,
    categoryId: 'beverages',
    imageId: 'dish-drink-2',
  },
];

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD-1',
        tableNumber: 5,
        items: [
            { id: 'cart-1', dish: DISHES[0], quantity: 2 }, // Paneer Tikka
            { id: 'cart-2', dish: DISHES[3], quantity: 1 }, // Butter Chicken
        ],
        total: (DISHES[0].price * 2) + DISHES[3].price,
        status: 'Preparing',
        createdAt: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
    },
    {
        id: 'ORD-2',
        tableNumber: 12,
        items: [
            { id: 'cart-3', dish: DISHES[6], quantity: 1 }, // Hyderabadi Chicken Biryani
            { id: 'cart-4', dish: DISHES[7], quantity: 1 }, // Vegetable Biryani
            { id: 'cart-5', dish: DISHES[9], quantity: 2 }, // Rasmalai
        ],
        total: DISHES[6].price + DISHES[7].price + (DISHES[9].price * 2),
        status: 'Cooking',
        createdAt: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
    },
    {
        id: 'ORD-3',
        tableNumber: 8,
        items: [
            { id: 'cart-6', dish: DISHES[4], quantity: 1 }, // Palak Paneer
        ],
        total: DISHES[4].price,
        status: 'Preparing',
        createdAt: new Date(Date.now() - 1 * 60 * 1000) // 1 minute ago
    }
]

export const WAITERS: Waiter[] = [
  { id: 'waiter-1', name: 'Ravi', avatarUrl: 'https://i.pravatar.cc/150?u=ravi' },
  { id: 'waiter-2', name: 'Priya', avatarUrl: 'https://i.pravatar.cc/150?u=priya' },
  { id: 'waiter-3', name: 'Sanjay', avatarUrl: 'https://i.pravatar.cc/150?u=sanjay' },
  { id: 'waiter-4', name: 'Anjali', avatarUrl: 'https://i.pravatar.cc/150?u=anjali' },
];

export const TABLES: Table[] = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  waiterId: WAITERS[i % WAITERS.length].id,
}));
