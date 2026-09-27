'use server';

/**
 * @fileOverview Handles ambiguous ingredient identification by presenting a list of possible matches to the user.
 *
 * - handleAmbiguousIngredients - A function that takes an ingredient and returns a list of possible matches with descriptions.
 * - AmbiguousIngredientsInput - The input type for the handleAmbiguousIngredients function.
 * - AmbiguousIngredientsOutput - The return type for the handleAmbiguousIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AmbiguousIngredientsInputSchema = z.object({
  ingredient: z.string().describe('The ingredient for which to find possible matches.'),
});
export type AmbiguousIngredientsInput = z.infer<typeof AmbiguousIngredientsInputSchema>;

const AmbiguousIngredientsOutputSchema = z.array(
  z.object({
    match: z.string().describe('A possible match for the ingredient.'),
    description: z.string().describe('A description or image data URI of the possible match.'),
  })
);
export type AmbiguousIngredientsOutput = z.infer<typeof AmbiguousIngredientsOutputSchema>;

export async function handleAmbiguousIngredients(
  input: AmbiguousIngredientsInput
): Promise<AmbiguousIngredientsOutput> {
  return handleAmbiguousIngredientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ambiguousIngredientsPrompt',
  input: {schema: AmbiguousIngredientsInputSchema},
  output: {schema: AmbiguousIngredientsOutputSchema},
  prompt: `You are an AI assistant helping to identify ambiguous ingredients.
  Given an ingredient, you will provide a list of possible matches along with a description for each.
  The ingredient is: {{{ingredient}}}

  Format your response as a JSON array of objects, where each object has a "match" and a "description" field.
`,
});

const handleAmbiguousIngredientsFlow = ai.defineFlow(
  {
    name: 'handleAmbiguousIngredientsFlow',
    inputSchema: AmbiguousIngredientsInputSchema,
    outputSchema: AmbiguousIngredientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
