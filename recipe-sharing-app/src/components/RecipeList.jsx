import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

function RecipeList() {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one!</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: '10px' }}>
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;