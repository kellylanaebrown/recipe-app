import { PlaceHolderImages } from "./placeholder-images";
import type { Recipe } from "./types";

const pastaImage = PlaceHolderImages.find((img) => img.id === "pasta-dish")!;
const saladImage = PlaceHolderImages.find((img) => img.id === "salad-bowl")!;
const soupImage = PlaceHolderImages.find((img) => img.id === "soup-bowl")!;
const tacosImage = PlaceHolderImages.find((img) => img.id === "tacos")!;

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    name: "Classic Tomato & Basil Pasta",
    description: "A timeless Italian dish that's simple, yet bursting with flavor.",
    imageUrl: pastaImage.imageUrl,
    imageHint: pastaImage.imageHint,
    ingredients: [
      "200g spaghetti",
      "400g canned chopped tomatoes",
      "2 cloves garlic, minced",
      "1 handful fresh basil leaves",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
      "Parmesan cheese for serving",
    ],
    instructions: `1. Cook spaghetti according to package directions.
2. While pasta is cooking, heat olive oil in a pan over medium heat. Add garlic and cook until fragrant.
3. Pour in chopped tomatoes, season with salt and pepper, and bring to a simmer. Cook for 10-15 minutes.
4. Drain the pasta and add it to the sauce.
5. Tear in the fresh basil leaves and toss to combine.
6. Serve immediately with a generous grating of Parmesan cheese.`,
  },
  {
    id: "2",
    name: "Vibrant Summer Salad",
    description: "A refreshing and colorful salad perfect for a light lunch or side dish.",
    imageUrl: saladImage.imageUrl,
    imageHint: saladImage.imageHint,
    ingredients: [
      "1 head of lettuce, torn",
      "1 cucumber, sliced",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, thinly sliced",
      "1/4 cup feta cheese, crumbled",
      "For the dressing:",
      "3 tbsp olive oil",
      "1 tbsp red wine vinegar",
      "1 tsp Dijon mustard",
      "Salt and pepper to taste",
    ],
    instructions: `1. In a large bowl, combine lettuce, cucumber, cherry tomatoes, and red onion.
2. In a small jar, shake together olive oil, red wine vinegar, Dijon mustard, salt, and pepper to make the dressing.
3. Pour the dressing over the salad and toss to coat.
4. Sprinkle with crumbled feta cheese before serving.`,
  },
  {
    id: "3",
    name: "Hearty Vegetable Soup",
    description: "A comforting and nourishing soup packed with a variety of vegetables.",
    imageUrl: soupImage.imageUrl,
    imageHint: soupImage.imageHint,
    ingredients: [
      "1 tbsp olive oil",
      "1 onion, chopped",
      "2 carrots, diced",
      "2 celery stalks, chopped",
      "2 potatoes, cubed",
      "1.5 liters vegetable broth",
      "1 can (400g) diced tomatoes",
      "1 tsp dried thyme",
      "1 bay leaf",
      "Salt and pepper to taste",
    ],
    instructions: `1. Heat olive oil in a large pot or Dutch oven over medium heat. Add onion, carrots, and celery and cook until softened.
2. Add potatoes and cook for another 5 minutes.
3. Pour in the vegetable broth and diced tomatoes. Add thyme and bay leaf.
4. Bring to a boil, then reduce heat and simmer for 20-25 minutes, or until potatoes are tender.
5. Remove the bay leaf. Season with salt and pepper to taste.
6. Serve hot, with crusty bread for dipping.`,
  },
    {
    id: "4",
    name: "Spicy Beef Tacos",
    description: "Flavorful and zesty tacos that are sure to be a crowd-pleaser.",
    imageUrl: tacosImage.imageUrl,
    imageHint: tacosImage.imageHint,
    ingredients: [
      "500g ground beef",
      "1 onion, chopped",
      "1 packet taco seasoning",
      "1/2 cup water",
      "8 hard taco shells",
      "Toppings: shredded lettuce, diced tomatoes, shredded cheddar cheese, sour cream, salsa",
    ],
    instructions: `1. In a large skillet, cook ground beef and onion over medium-high heat until beef is browned. Drain fat.
2. Stir in taco seasoning and water. Bring to a simmer and cook for 5-7 minutes, until the sauce has thickened.
3. Warm taco shells according to package directions.
4. Fill each taco shell with the beef mixture.
5. Set up a topping bar with lettuce, tomatoes, cheese, sour cream, and salsa for everyone to build their own tacos.`,
  },
];
