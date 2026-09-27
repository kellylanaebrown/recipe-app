import { mockRecipes } from "@/lib/data";
import { RecipeCard } from "@/components/recipe-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { RecipeSearch } from "./recipe-search";

export const metadata = {
    title: "My Recipes | RecipeSnap",
};

export default function RecipesPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col p-4 md:p-6">
      <div className="mb-6">
        <h1 className="font-headline text-3xl font-bold">My Recipes</h1>
        <p className="text-muted-foreground">
          Your personal collection of culinary creations.
        </p>
      </div>
      <RecipeSearch recipes={mockRecipes} />
    </main>
  );
}
