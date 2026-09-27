import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import type { Recipe } from "@/lib/types";

type RecipeViewProps = {
  recipe: Recipe;
};

export function RecipeView({ recipe }: RecipeViewProps) {
  return (
    <div className="flex-1 overflow-y-auto pr-2 -mr-2">
      <Card className="mb-6 overflow-hidden">
        <div className="relative h-64 w-full md:h-80">
          <Image
            src={recipe.imageUrl}
            alt={recipe.name}
            fill
            className="object-cover"
            data-ai-hint={recipe.imageHint}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="font-headline text-3xl font-bold text-white md:text-4xl">
              {recipe.name}
            </h1>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-foreground/90">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm max-w-none text-foreground/90 prose-p:my-3 prose-li:my-1"
              dangerouslySetInnerHTML={{
                __html: recipe.instructions.replace(/\n/g, "<br />"),
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
