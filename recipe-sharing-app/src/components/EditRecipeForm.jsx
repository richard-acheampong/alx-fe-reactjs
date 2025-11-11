import { useState } from 'react';
import { useRecipeStore } from './recipeStore';

function EditRecipeForm({ recipe }) {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    updateRecipe(recipe.id, { title, description });
    alert('Recipe updated!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h3>Edit Recipe</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditRecipeForm;