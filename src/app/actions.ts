"use server";

import { generateRecipeFromIngredients } from "@/ai/flows/generate-recipe-from-ingredients";
import { identifyIngredientsFromImage } from "@/ai/flows/identify-ingredients-from-image";
import { z } from "zod";

const identifyIngredientsSchema = z.object({
  image: z.instanceof(File),
});

export async function identifyIngredientsAction(
  _prevState: any,
  formData: FormData
) {
  try {
    const validatedFields = identifyIngredientsSchema.safeParse({
      image: formData.get("image"),
    });

    if (!validatedFields.success) {
      return {
        error: "Invalid image file.",
        ingredients: null,
      };
    }
    const { image } = validatedFields.data;
    if (image.size === 0) {
      return { error: "Please select an image.", ingredients: null };
    }

    const imageBuffer = await image.arrayBuffer();
    const photoDataUri = `data:${
      image.type
    };base64,${Buffer.from(imageBuffer).toString("base64")}`;

    const result = await identifyIngredientsFromImage({ photoDataUri });
    if (!result.ingredients || result.ingredients.length === 0) {
      return {
        error: "Could not identify any ingredients. Please try another image.",
        ingredients: null,
      };
    }

    return { error: null, ingredients: result.ingredients };
  } catch (e) {
    console.error(e);
    return {
      error: "An unexpected error occurred. Please try again.",
      ingredients: null,
    };
  }
}

const generateRecipeSchema = z.object({
  ingredients: z.array(z.string()).min(1, "Please add at least one ingredient."),
});

export async function generateRecipeAction(_prevState: any, ingredients: string[]) {
  try {
    const validatedFields = generateRecipeSchema.safeParse({ ingredients });

    if (!validatedFields.success) {
      return {
        error: "Invalid ingredients list.",
        recipe: null,
      };
    }

    const result = await generateRecipeFromIngredients({
      ingredients: validatedFields.data.ingredients,
    });
    return { error: null, recipe: result };
  } catch (e) {
    console.error(e);
    return {
      error: "Failed to generate a recipe. The AI chef might be on a break. Please try again.",
      recipe: null,
    };
  }
}
