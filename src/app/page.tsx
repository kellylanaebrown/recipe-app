import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-kitchen");
  return (
    <main className="flex flex-1 flex-col">
      <div className="relative flex-1">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-16 text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-accent md:text-7xl">
            RecipeSnap
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/80 md:text-xl">
            From picture to plate. Snap a photo of your ingredients, and let our
            AI chef whip up a delicious recipe for you.
          </p>
          <Button asChild size="lg" className="mt-8 font-bold">
            <Link href="/create">
              <Sparkles className="mr-2" />
              Start Cooking
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
