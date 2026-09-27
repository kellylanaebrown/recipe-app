"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Sparkles } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import type { IdentifyIngredientsFromImageOutput } from "@/ai/flows/identify-ingredients-from-image";

type ConfirmIngredientsStepProps = {
  ingredients: IdentifyIngredientsFromImageOutput["ingredients"];
  onConfirm: (ingredients: string[]) => Promise<void>;
  imagePreviewUrl: string;
};

export function ConfirmIngredientsStep({
  ingredients,
  onConfirm,
  imagePreviewUrl,
}: ConfirmIngredientsStepProps) {
  const [currentIngredients, setCurrentIngredients] = useState<string[]>(
    ingredients.map((i) => i.name)
  );
  const [newIngredient, setNewIngredient] = useState("");
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement>(null);

  const addIngredient = () => {
    if (newIngredient && !currentIngredients.includes(newIngredient)) {
      setCurrentIngredients([...currentIngredients, newIngredient]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setCurrentIngredients(
      currentIngredients.filter((i) => i !== ingredientToRemove)
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(currentIngredients);
  }

  return (
    <motion.div
      key="confirm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex h-full flex-col"
    >
      <div className="flex-1 overflow-auto pr-2 -mr-2">
        <Card className="mb-4 overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src={imagePreviewUrl}
              alt="Uploaded ingredients"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Card>

        <h2 className="font-headline text-xl font-bold">Confirm Ingredients</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Review the ingredients we found. Add or remove any as needed.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <AnimatePresence>
            {currentIngredients.map((ingredient) => (
              <motion.div
                key={ingredient}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  variant="secondary"
                  className="text-base py-1 pl-3 pr-2 bg-secondary/50 border-secondary"
                >
                  {ingredient}
                  <button
                    onClick={() => removeIngredient(ingredient)}
                    className="ml-2 rounded-full hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            addIngredient();
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Add another ingredient..."
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
          />
          <Button type="submit" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </form>
      </div>

      <div className="mt-4 pt-4 border-t">
        <form onSubmit={handleSubmit}>
           <Button type="submit" className="w-full" size="lg" disabled={pending || currentIngredients.length === 0}>
             <Sparkles className="h-4 w-4 mr-2" />
             Generate Recipe
           </Button>
        </form>
      </div>
    </motion.div>
  );
}
