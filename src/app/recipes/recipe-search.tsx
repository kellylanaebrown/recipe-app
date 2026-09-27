'use client';

import { useState, useMemo } from 'react';
import type { Recipe } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { RecipeCard } from '@/components/recipe-card';

type RecipeSearchProps = {
  recipes: Recipe[];
};

export function RecipeSearch({ recipes }: RecipeSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = useMemo(() => {
    if (!searchTerm) return recipes;
    return recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [searchTerm, recipes]);

  return (
    <>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search your recipes..."
          className="pl-10 w-full md:w-1/2 lg:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1 overflow-auto pr-2 -mr-2">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center bg-muted/50 rounded-lg">
          <h3 className="font-headline text-xl font-bold">No Recipes Found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search term.
          </p>
        </div>
      )}
    </>
  );
}
