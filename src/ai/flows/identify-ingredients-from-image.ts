'use server';
/**
 * @fileOverview An AI agent that identifies ingredients from an image.
 *
 * - identifyIngredientsFromImage - A function that handles the ingredient identification process.
 * - IdentifyIngredientsFromImageInput - The input type for the identifyIngredientsFromImage function.
 * - IdentifyIngredientsFromImageOutput - The return type for the identifyIngredientsFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyIngredientsFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of ingredients or a dish, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyIngredientsFromImageInput = z.infer<typeof IdentifyIngredientsFromImageInputSchema>;

const IdentifyIngredientsFromImageOutputSchema = z.object({
  ingredients: z.array(
    z.object({
      name: z.string().describe('The name of the identified ingredient.'),
      confidence: z
        .number()
        .describe('The confidence level of the identification (0-1).'),
    })
  ).describe('A list of identified ingredients.'),
});
export type IdentifyIngredientsFromImageOutput = z.infer<typeof IdentifyIngredientsFromImageOutputSchema>;

export async function identifyIngredientsFromImage(
  input: IdentifyIngredientsFromImageInput
): Promise<IdentifyIngredientsFromImageOutput> {
  return identifyIngredientsFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyIngredientsFromImagePrompt',
  input: {schema: IdentifyIngredientsFromImageInputSchema},
  output: {schema: IdentifyIngredientsFromImageOutputSchema},
  prompt: `You are an expert food AI. You will identify the ingredients in the image.

Use the following as the primary source of information about the ingredients.

Photo: {{media url=photoDataUri}}

Output the ingredients as a JSON array of objects. Each object should have a name and a confidence level (0-1). Confidence indicates likelihood that the identified name is correct.
`,
});

const identifyIngredientsFromImageFlow = ai.defineFlow(
  {
    name: 'identifyIngredientsFromImageFlow',
    inputSchema: IdentifyIngredientsFromImageInputSchema,
    outputSchema: IdentifyIngredientsFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
