/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { getRecipe } from './apis';
import App from './App';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const Admin = lazy(() => import('./pages/Admin/Admin'));
const AdminRecipes = lazy(() =>
  import('./pages/Admin/pages/AdminRecipes/AdminRecipes')
);
const AdminUsers = lazy(() =>
  import('./pages/Admin/pages/AdminUsers/AdminUsers')
);

const AdminRecipesList = lazy(() =>
  import(
    './pages/Admin/pages/AdminRecipes/pages/AdminRecipesList/AdminRecipesList'
  )
);
const AdminRecipesForm = lazy(() =>
  import(
    './pages/Admin/pages/AdminRecipes/pages/AdminRecipesForm/AdminRecipesForm'
  )
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'admin',
        element: <Admin />,
        children: [
          {
            path: 'recipes',
            element: <AdminRecipes />,
            children: [
              {
                path: 'list',
                element: <AdminRecipesList />,
              },
              {
                path: 'new',
                element: <AdminRecipesForm />,
              },
              {
                path: 'edit/:recipeId',
                element: <AdminRecipesForm />,
                loader: async ({ params: { recipeId } }) => getRecipe(recipeId),
              },
              {
                index: true,
                loader: async () => redirect('/admin/recipes/list'),
              },
            ],
          },
          {
            path: 'users',
            element: <AdminUsers />,
          },
          {
            index: true,
            loader: async () => redirect('/admin/recipes'),
          },
        ],
      },
    ],
  },
]);
 