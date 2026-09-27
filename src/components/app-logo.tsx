import { ChefHat } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function AppLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-accent outline-none ring-ring focus-visible:ring-2 rounded-sm",
        className
      )}
    >
      <ChefHat className="size-6 shrink-0" />
      <span className="font-headline text-xl font-bold tracking-tight">
        RecipeSnap
      </span>
    </Link>
  );
}
