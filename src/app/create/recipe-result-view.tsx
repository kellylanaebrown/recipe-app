"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { GenerateRecipeFromIngredientsOutput } from "@/ai/flows/generate-recipe-from-ingredients";
import { RefreshCw, Edit, Save } from "lucide-react";

type RecipeResultViewProps = {
  recipe: GenerateRecipeFromIngredientsOutput;
  imagePreviewUrl: string;
  onReset: () => void;
  onEdit: () => void;
};

export function RecipeResultView({
  recipe,
  imagePreviewUrl,
  onReset,
  onEdit,
}: RecipeResultViewProps) {
  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex h-full flex-col"
    >
      <div className="flex-1 overflow-y-auto pr-2 -mr-2">
        <Card className="mb-4 overflow-hidden">
          <div className="relative h-64 w-full">
            <Image
              src={imagePreviewUrl}
              alt={recipe.recipeName}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="font-headline text-3xl font-bold text-white">
                {recipe.recipeName}
              </h1>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-foreground/90">
                {recipe.ingredientsWithQuantities.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none text-foreground/90"
                dangerouslySetInnerHTML={{
                  __html: recipe.instructions.replace(/\n/g, "<br />"),
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row gap-2">
        <Button onClick={onReset} variant="outline" className="w-full sm:w-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Start Over
        </Button>
        <div className="flex-1" />
        <Button onClick={onEdit} variant="secondary" className="w-full sm:w-auto">
          <Edit className="mr-2 h-4 w-4" />
          Edit Ingredients
        </Button>
        <Button className="w-full sm:w-auto" onClick={() => alert("Recipe saved! (Feature coming soon)")}>
          <Save className="mr-2 h-4 w-4" />
          Save Recipe
        </Button>
      </div>
    </motion.div>
  );
}
