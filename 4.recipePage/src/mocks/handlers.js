import { http, HttpResponse } from 'msw';
import { recipes } from './mockData.js';

export const handlers = [
    http.get('/api/recipes/:name', ({ params }) => {
        const { name } = params;
        const recipe = recipes.find((r) => r.name === name);
        if (!recipe) {
            return HttpResponse.json({ error: 'Recipe not found' }, { status: 404 });
        }
        return HttpResponse.json(recipe);
    }),
];
