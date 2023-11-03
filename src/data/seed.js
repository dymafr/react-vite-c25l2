import { data } from './recipes';

export async function seedRecipes() {
  const recipes = await fetch('https://restapi.fr/api/recipes');

  if (recipes.length < 10) {
    await fetch('https://restapi.fr/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}
