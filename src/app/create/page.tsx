import { CreateRecipeClient } from "./create-recipe-client";

export const metadata = {
  title: "Create a new Recipe | RecipeSnap",
};

export default function CreateRecipePage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col p-4 md:p-6">
      <div className="mb-4">
        <h1 className="font-headline text-3xl font-bold">Create a Recipe</h1>
        <p className="text-muted-foreground">
          Let&apos;s turn your ingredients into a culinary masterpiece.
        </p>
      </div>
      <CreateRecipeClient />
    </main>
  );
}
