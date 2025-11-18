'use server';

import { suggestDishes as suggestDishesFlow } from '@/ai/flows/suggest-dishes';
import { DISHES } from '@/lib/data';
import type { SuggestDishesInput } from '@/ai/flows/suggest-dishes';

export async function getDishSuggestions(orderHistory: string[]): Promise<string[]> {
  try {
    const allDishNames = DISHES.map(dish => dish.name);
    
    const input: SuggestDishesInput = {
      orderHistory: orderHistory,
      menu: allDishNames,
    };

    const result = await suggestDishesFlow(input);
    return result.suggestedDishes;
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return [];
  }
}
