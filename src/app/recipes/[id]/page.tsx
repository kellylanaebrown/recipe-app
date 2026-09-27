import { mockRecipes } from "@/lib/data";
import { RecipeView } from "@/components/recipe-view";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: { id: string };
};

export function generateMetadata({ params }: Props) {
    const recipe = mockRecipes.find((r) => r.id === params.id);
    if (!recipe) {
        return {
            title: "Recipe Not Found | RecipeSnap"
        }
    }
    return {
        title: `${recipe.name} | RecipeSnap`
    }
}

export default function RecipeDetailPage({ params }: Props) {
  const recipe = mockRecipes.find((r) => r.id === params.id);

  if (!recipe) {
    notFound();
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col p-4 md:p-6">
        <div className="mb-4">
            <Button asChild variant="ghost" className="-ml-4">
                <Link href="/recipes">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to My Recipes
                </Link>
            </Button>
        </div>
        <RecipeView recipe={recipe} />
    </main>
  );
}
