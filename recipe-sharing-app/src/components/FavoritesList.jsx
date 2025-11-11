import { useRecipeStore } from './recipeStore';

function FavoritesList() {
  const recipes = useRecipeStore((state) => state.recipes);
  const favoriteIds = useRecipeStore((state) => state.favorites);

  const favorites = recipes.filter((recipe) => favoriteIds.includes(recipe.id));

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default FavoritesList;