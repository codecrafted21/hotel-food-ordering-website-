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
    imageUrl: 'https://images.unsplash.com/photo-1567188042742-f440597a7d53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwYW5lZXIlMjB0aWtrYXxlbnwwfHx8fDE3NjM4MjM4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'dish-2',
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas.',
    price: 120,
    categoryId: 'starters',
    imageId: 'dish-starter-2',
    imageUrl: 'https://images.unsplash.com/photo-1625220194771-7ebdea0d3db7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzYW1vc2F8ZW58MHx8fHwxNzY1NDIwNDg5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'dish-3',
    name: 'Aloo Tikki',
    description: 'Spiced potato patties, shallow-fried until golden brown.',
    price: 150,
    categoryId: 'starters',
    imageId: 'dish-starter-3',
    imageUrl: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxhbG9vJTIwdGlra2l8ZW58MHx8fHwxNzY1NDIwNTM3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'dish-13',
    name: 'Hara Bhara Kabab',
    description: 'A vegetarian kabab made with spinach, peas, and potatoes.',
    price: 250,
    categoryId: 'starters',
    imageId: 'dish-starter-4',
    imageUrl: 'https://images.unsplash.com/photo-1599232288126-7dbd2127db14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxoYXJhJTIwYmhhcmElMjBrYWJhYnxlbnwwfHx8fDE3NjM5MDM2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },

  // Curries
  {
    id: 'dish-21',
    name: 'Paneer Butter Masala',
    description: 'Cubes of paneer in a rich, creamy tomato and butter sauce.',
    price: 420,
    categoryId: 'curries',
    imageId: 'dish-main-5',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwYW5lZXIlMjBidXR0ZXIlMjBtYXNhbGF8ZW58MHx8fHwxNzY1NDI0NjU0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'dish-5',
    name: 'Palak Paneer',
    description: 'Paneer cubes in a smooth, creamy spinach gravy.',
    price: 380,
    categoryId: 'curries',
    imageId: 'dish-main-2',
    imageUrl: 'https://images.unsplash.com/photo-1695424683069-b7b282c92b87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwYWxhayUyMHBhbmVlcnxlbnwwfHx8fDE3NjU0MjA2MDh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'dish-6',
    name: 'Dal Makhani',
    description: 'Black lentils slow-cooked with butter and cream.',
    price: 320,
    categoryId: 'curries',
    imageId: 'dish-main-3',
    imageUrl: 'https://images.unsplash.com/photo-1574672282223-f47202362d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkYWwlMjBtYWtoYW5pfGVufDB8fHx8MTc2NTY4NTU5Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'dish-14',
    name: 'Chole Bhature',
    description: 'Spicy chickpea curry served with fluffy fried bread.',
    price: 300,
    categoryId: 'curries',
    imageId: 'dish-main-4',
    imageUrl: 'https://images.unsplash.com/photo-1644780398576-b73bfb3adc56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxjaG9sZSUyMGJoYXR1cmV8ZW58MHx8fHwxNzYzODc1MzI5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'dish-22',
    name: 'Malai Kofta',
    description: 'Fried potato and paneer balls in a rich, creamy tomato gravy.',
    price: 400,
    categoryId: 'curries',
    imageId: 'dish-main-6',
    imageUrl: 'https://images.unsplash.com/photo-1626081739588-75c6c683c34a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYWxhaSUyMGtvZnRhfGVufDB8fHx8MTc2NTQyNDY5MXww&ixlib=rb-4.1.0&q=80&w=1080'
  },

  // Biryani
  {
    id: 'dish-8',
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice cooked with assorted vegetables and spices.',
    price: 350,
    categoryId: 'biryani',
    imageId: 'dish-biryani-2',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f397918b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBiaXJ5YW5pfGVufDB8fHx8MTc2NTQyMDcwN3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'dish-23',
    name: 'Mushroom Biryani',
    description: 'Aromatic basmati rice cooked with mushrooms and spices.',
    price: 380,
    categoryId: 'biryani',
    imageId: 'dish-biryani-4',
    imageUrl: 'https://images.unsplash.com/photo-1599540058882-626a57c91cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtdXNocm9vbSUyMGJpcnlhbml8ZW58MHx8fHwxNzY1NDI0NzI0fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },

  // Breads
  {
    id: 'dish-16',
    name: 'Garlic Naan',
    description: 'Soft Indian bread with a generous amount of garlic.',
    price: 90,
    categoryId: 'breads',
    imageId: 'dish-breads-1',
    imageUrl: 'https://images.unsplash.com/photo-1725483990094-e95226a16db7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxnYXJsaWMlMjBuYWFufGVufDB8fHx8MTc2MzgyMDM3MXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'dish-17',
    name: 'Tandoori Roti',
    description: 'Whole wheat bread cooked in a tandoor.',
    price: 40,
    categoryId: 'breads',
    imageId: 'dish-breads-2',
    imageUrl: 'https://images.unsplash.com/photo-1733210438330-95dadd453e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx0YW5kb29yaSUyMHJvdGl8ZW58MHx8fHwxNzYzOTAzNjgzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'dish-18',
    name: 'Laccha Paratha',
    description: 'Layered and flaky whole wheat bread.',
    price: 70,
    categoryId: 'breads',
    imageId: 'dish-breads-3',
    imageUrl: 'https://images.unsplash.com/photo-1629828820438-04f710955b25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsYWNjaGElMjBwYXJhdGhhfGVufDB8fHx8MTc2NTU5NTE5OXww&ixlib=rb-4.1.0&q=80&w=1080'
  },

  // Desserts
  {
    id: 'dish-9',
    name: 'Gulab Jamun',
    description: 'Soft, spongy milk-solid balls soaked in sweet syrup.',
    price: 150,
    categoryId: 'desserts',
    imageId: 'dish-dessert-1',
    imageUrl: 'https://images.unsplash.com/photo-1670984577883-925eb396a84c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxndWxhYiUyMGphbXVufGVufDB8fHx8MTc2NTQyMDgwN3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'dish-10',
    name: 'Rasmalai',
    description: 'Soft paneer discs soaked in chilled, creamy milk.',
    price: 180,
    categoryId: 'desserts',
    imageId: 'dish-dessert-2',
    imageUrl: 'https://images.unsplash.com/photo-1603753892186-63f45c82c16f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxyYXNtYWxhaXxlbnwwfHx8fDE3NjU0MjA4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'dish-19',
    name: 'Jalebi',
    description: 'Crispy, sweet, and chewy spirals soaked in syrup.',
    price: 130,
    categoryId: 'desserts',
    imageId: 'dish-dessert-3',
    imageUrl: 'https://images.unsplash.com/photo-1624196638923-ec5915c1f5f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxqYWxlYml8ZW58MHx8fHwxNzYzODkxNjYwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },

  // Beverages
  {
    id: 'dish-11',
    name: 'Masala Chai',
    description: 'Classic Indian tea brewed with aromatic spices.',
    price: 80,
    categoryId: 'beverages',
    imageId: 'dish-drink-1',
    imageUrl: 'https://images.unsplash.com/photo-1597318181409-cf62d9a7509c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYXNhbGElMjBjaGFpfGVufDB8fHx8MTc2NTQyMDc0N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'dish-12',
    name: 'Mango Lassi',
    description: 'A refreshing yogurt-based drink with sweet mango pulp.',
    price: 140,
    categoryId: 'beverages',
    imageId: 'dish-drink-2',
    imageUrl: 'https://images.unsplash.com/photo-1626803775151-6c579c28923a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYW5nbyUyMGxhc3NpfGVufDB8fHx8MTc2NTQyMDc4MHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'dish-20',
    name: 'Nimbu Pani',
    description: 'Fresh and tangy Indian-style lemonade.',
    price: 100,
    categoryId: 'beverages',
    imageId: 'dish-drink-3',
    imageUrl: 'https://images.unsplash.com/photo-1616884323223-265c7c00c05f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxuaW1idSUyMHBhbml8ZW58MHx8fHwxNzY1NTk1MjIxfDA&ixlibrb-4.1.0&q=80&w=1080'
  },
];

    
