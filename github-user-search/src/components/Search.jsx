
import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

export default function SearchUser() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');
    setUser(null);

    try {
      const data = await fetchUserData(username.trim());
      setUser(data);
    } catch (err) {
      console.error(err);
      setError('Looks like we can’t find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {user && (
        <div style={styles.card}>
          <img src={user.avatar_url} alt={`${user.login} avatar`} style={styles.avatar} />
          <div>
            <h2>{user.name || user.login}</h2>
            <a href={user.html_url} target="_blank" rel="noreferrer">View Profile</a>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', padding: '20px' },
  form: { display: 'flex', gap: '10px', marginBottom: '20px' },
  input: { flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' },
  button: { padding: '10px 16px', background: '#24292f', color: '#fff', border: 'none', borderRadius: '6px' },
  error: { color: 'red' },
  card: { display: 'flex', gap: '15px', alignItems: 'center', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' },
  avatar: { width: 80, height: 80, borderRadius: '50%' }
};
