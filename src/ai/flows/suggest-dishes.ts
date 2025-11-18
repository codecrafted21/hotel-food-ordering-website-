'use server';

/**
 * @fileOverview Recommends dishes based on order history and real-time menu availability.
 *
 * - suggestDishes - A function that suggests dishes to the user.
 * - SuggestDishesInput - The input type for the suggestDishes function.
 * - SuggestDishesOutput - The return type for the suggestDishes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDishesInputSchema = z.object({
  orderHistory: z
    .array(z.string())
    .describe('A list of dish names the user has previously ordered.'),
  menu: z.array(z.string()).describe('A list of currently available dish names.'),
});
export type SuggestDishesInput = z.infer<typeof SuggestDishesInputSchema>;

const SuggestDishesOutputSchema = z.object({
  suggestedDishes: z
    .array(z.string())
    .describe('A list of dish names to suggest to the user.'),
});
export type SuggestDishesOutput = z.infer<typeof SuggestDishesOutputSchema>;

export async function suggestDishes(input: SuggestDishesInput): Promise<SuggestDishesOutput> {
  return suggestDishesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDishesPrompt',
  input: {schema: SuggestDishesInputSchema},
  output: {schema: SuggestDishesOutputSchema},
  prompt: `You are a food recommendation expert.\n\n  Based on the user\'s order history and the current menu, suggest dishes that the user might enjoy. Only suggest dishes that are on the menu.\n\n  Order History:\n  {{#each orderHistory}}- {{this}}\n{{/each}}\n\n  Menu:\n  {{#each menu}}- {{this}}\n{{/each}}\n\n  Suggested Dishes:`,
});

const suggestDishesFlow = ai.defineFlow(
  {
    name: 'suggestDishesFlow',
    inputSchema: SuggestDishesInputSchema,
    outputSchema: SuggestDishesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
