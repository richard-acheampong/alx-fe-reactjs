import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

function RecipeList() {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Recipe List</h2>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        filteredRecipes.map((recipe) => (
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