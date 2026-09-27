import type { GenerateRecipeFromIngredientsOutput } from "@/ai/flows/generate-recipe-from-ingredients";
import type { IdentifyIngredientsFromImageOutput } from "@/ai/flows/identify-ingredients-from-image";

export type Ingredient = {
  name: string;
};

export type Recipe = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  ingredients: string[];
  instructions: string;
};

export type CreationState = {
  step: "upload" | "confirm" | "generate" | "result";
  imageDataUrl: string | null;
  ingredients: IdentifyIngredientsFromImageOutput["ingredients"] | null;
  recipe: GenerateRecipeFromIngredientsOutput | null;
  error: string | null;
  key: number;
};
