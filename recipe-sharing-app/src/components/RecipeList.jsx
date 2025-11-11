import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

function RecipeList() {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one!</p>
      ) : (
        recipes.map((recipe) => {
          const isFavorite = favorites.includes(recipe.id);
          return (
            <div key={recipe.id} style={{ marginBottom: '10px' }}>
              <Link to={`/recipe/${recipe.id}`}>
                <h3>{recipe.title}</h3>
              </Link>
              <button
                onClick={() =>
                  isFavorite ? removeFavorite(recipe.id) : addFavorite(recipe.id)
                }
              >
                {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default RecipeList;