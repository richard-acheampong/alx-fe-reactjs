import { useRecipeStore } from './recipeStore';

function SearchBar() {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    filterRecipes(); // Trigger filtering
  };

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={handleChange}
      style={{ display: 'block', margin: '20px auto', width: '80%', padding: '10px' }}
    />
  );
}

export default SearchBar;