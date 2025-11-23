import type { Category, Dish } from './types';

export const CATEGORIES: Category[] = [
  { id: 'starters', name: 'Starters' },
  { id: 'curries', name: 'Curries' },
  { id: 'biryani', name: 'Biryani' },
  { id: 'breads', name: 'Breads' },
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
  {
    id: 'dish-13',
    name: 'Hara Bhara Kabab',
    description: 'A vegetarian kabab made with spinach, peas, and potatoes.',
    price: 250,
    categoryId: 'starters',
    imageId: 'dish-starter-4',
  },

  // Curries
  {
    id: 'dish-21',
    name: 'Paneer Butter Masala',
    description: 'Cubes of paneer in a rich, creamy tomato and butter sauce.',
    price: 420,
    categoryId: 'curries',
    imageId: 'dish-main-5',
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
  {
    id: 'dish-14',
    name: 'Chole Bhature',
    description: 'Spicy chickpea curry served with fluffy fried bread.',
    price: 300,
    categoryId: 'curries',
    imageId: 'dish-main-4',
  },
  {
    id: 'dish-22',
    name: 'Malai Kofta',
    description: 'Fried potato and paneer balls in a rich, creamy tomato gravy.',
    price: 400,
    categoryId: 'curries',
    imageId: 'dish-main-6',
  },

  // Biryani
  {
    id: 'dish-8',
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice cooked with assorted vegetables and spices.',
    price: 350,
    categoryId: 'biryani',
    imageId: 'dish-biryani-2',
  },
  {
    id: 'dish-23',
    name: 'Mushroom Biryani',
    description: 'Aromatic basmati rice cooked with mushrooms and spices.',
    price: 380,
    categoryId: 'biryani',
    imageId: 'dish-biryani-4',
  },

  // Breads
  {
    id: 'dish-16',
    name: 'Garlic Naan',
    description: 'Soft Indian bread with a generous amount of garlic.',
    price: 90,
    categoryId: 'breads',
    imageId: 'dish-breads-1',
  },
  {
    id: 'dish-17',
    name: 'Tandoori Roti',
    description: 'Whole wheat bread cooked in a tandoor.',
    price: 40,
    categoryId: 'breads',
    imageId: 'dish-breads-2',
  },
  {
    id: 'dish-18',
    name: 'Laccha Paratha',
    description: 'Layered and flaky whole wheat bread.',
    price: 70,
    categoryId: 'breads',
    imageId: 'dish-breads-3',
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
  {
    id: 'dish-19',
    name: 'Jalebi',
    description: 'Crispy, sweet, and chewy spirals soaked in syrup.',
    price: 130,
    categoryId: 'desserts',
    imageId: 'dish-dessert-3',
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
  {
    id: 'dish-20',
    name: 'Nimbu Pani',
    description: 'Fresh and tangy Indian-style lemonade.',
    price: 100,
    categoryId: 'beverages',
    imageId: 'dish-drink-3',
  },
];
