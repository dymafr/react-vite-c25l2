import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { recipesState } from '../state';
import { getRecipes } from '../apis';

export function useFetchRecipes(page) {
  const setRecipes = useSetRecoilState(recipesState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);

  useEffect(() => {
    let cancel = false;
    async function fetchRecipes() {
      try {
        setIsLoading(true);
        const queryParam = new URLSearchParams();
        if (page) {
          queryParam.append('limit', 18);
          queryParam.append('skip', (page - 1) * 18);
          queryParam.append('sort', 'createdAt:-1');
        }
        const fetchedRecipes = await getRecipes(queryParam);
        if (!cancel) {
          setRecipes((x) => [...x, ...fetchedRecipes]);
        }
      } catch (e) {
        setError('Erreur');
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }
    fetchRecipes();
    return () => (cancel = true);
  }, [page, setRecipes]);

  return [isLoading, error];
}
