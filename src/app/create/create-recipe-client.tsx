"use client";

import { useReducer, useEffect, useRef, useActionState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { CreationState } from "@/lib/types";
import {
  identifyIngredientsAction,
  generateRecipeAction,
} from "@/app/actions";
import { UploadStep } from "./upload-step";
import { ConfirmIngredientsStep } from "./confirm-ingredients-step";
import { RecipeResultView } from "./recipe-result-view";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";

const initialState: CreationState = {
  step: "upload",
  imageDataUrl: null,
  ingredients: null,
  recipe: null,
  error: null,
  key: 0,
};

function creationReducer(
  state: CreationState,
  action: Partial<CreationState>
): CreationState {
  return { ...state, ...action };
}

const initialIdentifyState = {
  error: null,
  ingredients: null,
};

type UploadStepHandle = {
  fileInputRef: React.RefObject<HTMLInputElement>;
  formRef: React.RefObject<HTMLFormElement>;
  getImageDataUrl: () => string | null;
};

export function CreateRecipeClient() {
  const [state, dispatch] = useReducer(creationReducer, initialState);
  const [identifyState, formAction, isIdentifying] = useActionState(identifyIngredientsAction, initialIdentifyState);
  
  const { toast } = useToast();
  const uploadStepRef = useRef<UploadStepHandle>(null);

  useEffect(() => {
    if(isIdentifying && uploadStepRef.current) {
      const dataUrl = uploadStepRef.current.getImageDataUrl();
      if (dataUrl) {
        dispatch({
          step: "generate",
          imageDataUrl: dataUrl,
        });
      }
    }
  }, [isIdentifying])

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: state.error,
      });
      dispatch({ error: null });
    }
  }, [state.error, toast]);
  
  useEffect(() => {
    if (identifyState.error) {
      dispatch({ error: identifyState.error, step: 'upload' });
      if (uploadStepRef.current?.fileInputRef.current) {
        uploadStepRef.current.fileInputRef.current.value = "";
      }
    } else if (identifyState.ingredients) {
      dispatch({ ingredients: identifyState.ingredients, step: 'confirm' });
    }
  }, [identifyState]);

  const handleIngredientsConfirm = async (confirmedIngredients: string[]) => {
    dispatch({ step: "generate" });
    const result = await generateRecipeAction(
      null,
      confirmedIngredients
    );
    if (result.error) {
      dispatch({ error: result.error, step: "confirm" });
    } else {
      dispatch({ recipe: result.recipe, step: "result" });
    }
  };

  const handleReset = () => {
    if (state.imageDataUrl) {
      URL.revokeObjectURL(state.imageDataUrl);
    }
    dispatch({ ...initialState, key: state.key + 1 });
  };

  const handleEditIngredients = () => {
    dispatch({ step: "confirm", recipe: null });
  };

  const renderStep = () => {
    switch (state.step) {
      case "upload":
        return (
          <UploadStep
            key="upload"
            formAction={formAction}
            isPending={isIdentifying}
            ref={uploadStepRef}
          />
        );
      case "confirm":
        return (
          <ConfirmIngredientsStep
            key="confirm"
            ingredients={state.ingredients!}
            onConfirm={handleIngredientsConfirm}
            imagePreviewUrl={state.imageDataUrl!}
          />
        );
      case "generate":
        return (
          <motion.div
            key="generate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-1 flex-col items-center justify-center text-center"
          >
            <div className="text-primary text-4xl mb-4 animate-spin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <h2 className="font-headline text-2xl font-bold text-accent">
              {state.ingredients
                ? "Polishing your recipe..."
                : "Consulting the AI Chef..."}
            </h2>
            <p className="text-muted-foreground mt-2">
              This might take a moment. Great things are worth waiting for!
            </p>
          </motion.div>
        );
      case "result":
        return (
          <RecipeResultView
            key="result"
            recipe={state.recipe!}
            imagePreviewUrl={state.imageDataUrl!}
            onReset={handleReset}
            onEdit={handleEditIngredients}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="flex-1 w-full overflow-hidden flex flex-col">
      <CardContent className="p-4 md:p-6 flex-1 flex flex-col">
        <AnimatePresence mode="wait" initial={false}>
          {renderStep()}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
