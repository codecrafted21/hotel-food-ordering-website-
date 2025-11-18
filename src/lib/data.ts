import type { Category, Dish, Order } from './types';

export const CATEGORIES: Category[] = [
  { id: 'starters', name: 'Starters' },
  { id: 'main-course', name: 'Main Course' },
  { id: 'biryani', name: 'Biryani' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' },
];

export const DISHES: Dish[] = [
  // Starters
  {
    id: 'dish-1',
    name: 'Crispy Spring Rolls',
    description: 'Golden fried vegetable spring rolls, served with a sweet chili dip.',
    price: 8.99,
    categoryId: 'starters',
    imageId: 'dish-starter-1',
  },
  {
    id: 'dish-2',
    name: 'Fiery Chicken Wings',
    description: 'Juicy chicken wings tossed in our signature spicy sauce.',
    price: 12.99,
    categoryId: 'starters',
    imageId: 'dish-starter-2',
  },
  {
    id: 'dish-3',
    name: 'Herb Garlic Bread',
    description: 'Toasted baguette slices with garlic butter and fresh herbs.',
    price: 6.99,
    categoryId: 'starters',
    imageId: 'dish-starter-3',
  },

  // Main Course
  {
    id: 'dish-4',
    name: 'Royal Butter Chicken',
    description: 'Tender chicken in a creamy tomato sauce. A timeless classic.',
    price: 18.99,
    categoryId: 'main-course',
    imageId: 'dish-main-1',
  },
  {
    id: 'dish-5',
    name: 'Classic Pepperoni Pizza',
    description: 'A crispy crust, rich tomato sauce, mozzarella, and spicy pepperoni.',
    price: 16.99,
    categoryId: 'main-course',
    imageId: 'dish-main-2',
  },
  {
    id: 'dish-6',
    name: 'The Ultimate Beef Burger',
    description: 'A juicy beef patty, cheddar cheese, and fresh veggies in a brioche bun.',
    price: 15.99,
    categoryId: 'main-course',
    imageId: 'dish-main-3',
  },

  // Biryani
  {
    id: 'dish-7',
    name: 'Awadhi Chicken Biryani',
    description: 'Slow-cooked chicken and basmati rice with fragrant spices.',
    price: 20.99,
    categoryId: 'biryani',
    imageId: 'dish-biryani-1',
  },
  {
    id: 'dish-8',
    name: 'Hyderabadi Mutton Biryani',
    description: 'A regal dish with tender mutton pieces and aromatic saffron rice.',
    price: 22.99,
    categoryId: 'biryani',
    imageId: 'dish-biryani-2',
  },

  // Desserts
  {
    id: 'dish-9',
    name: 'Molten Chocolate Cake',
    description: 'Warm, decadent chocolate cake with a gooey center.',
    price: 9.99,
    categoryId: 'desserts',
    imageId: 'dish-dessert-1',
  },
  {
    id: 'dish-10',
    name: 'Classic Vanilla Bean Ice Cream',
    description: 'Creamy homemade ice cream with real vanilla bean flecks.',
    price: 7.99,
    categoryId: 'desserts',
    imageId: 'dish-dessert-2',
  },

  // Drinks
  {
    id: 'dish-11',
    name: 'Classic Mojito',
    description: 'A refreshing blend of mint, lime, and white rum.',
    price: 11.99,
    categoryId: 'drinks',
    imageId: 'dish-drink-1',
  },
  {
    id: 'dish-12',
    name: 'Freshly Squeezed Orange Juice',
    description: 'A glass of pure, vitamin-c packed sunshine.',
    price: 6.99,
    categoryId: 'drinks',
    imageId: 'dish-drink-2',
  },
];

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ORD-1',
        tableNumber: 5,
        items: [
            { id: 'cart-1', dish: DISHES[0], quantity: 2 },
            { id: 'cart-2', dish: DISHES[3], quantity: 1 },
        ],
        total: (DISHES[0].price * 2) + DISHES[3].price,
        status: 'Preparing',
        createdAt: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
    },
    {
        id: 'ORD-2',
        tableNumber: 12,
        items: [
            { id: 'cart-3', dish: DISHES[6], quantity: 1 },
            { id: 'cart-4', dish: DISHES[7], quantity: 1 },
            { id: 'cart-5', dish: DISHES[10], quantity: 2 },
        ],
        total: DISHES[6].price + DISHES[7].price + (DISHES[10].price * 2),
        status: 'Cooking',
        createdAt: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
    },
    {
        id: 'ORD-3',
        tableNumber: 8,
        items: [
            { id: 'cart-6', dish: DISHES[4], quantity: 1 },
        ],
        total: DISHES[4].price,
        status: 'Preparing',
        createdAt: new Date(Date.now() - 1 * 60 * 1000) // 1 minute ago
    }
]
