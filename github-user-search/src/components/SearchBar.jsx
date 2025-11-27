
// src/components/SearchBar.jsx
import { useState } from 'react';

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={submit} style={styles.form}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search GitHub users (e.g., 'torvalds')"
        style={styles.input}
      />
      <button type="submit" disabled={isLoading} style={styles.button}>
        {isLoading ? 'Searching…' : 'Search'}
      </button>
    </form>
  );
}

const styles = {
  form: { display: 'flex', gap: '8px', marginBottom: '16px' },
  input: { flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' },
  button: { padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#24292f', color: '#fff' },
};
