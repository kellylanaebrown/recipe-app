import { config } from 'dotenv';
config();

import '@/ai/flows/identify-ingredients-from-image.ts';
import '@/ai/flows/handle-ambiguous-ingredients.ts';
import '@/ai/flows/generate-recipe-from-ingredients.ts';