
import { useState } from 'react';
import { fetchUserData, searchAdvancedUsers } from '../services/githubService';

export default function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [user, setUser] = useState(null);       // single-user result
  const [results, setResults] = useState([]);   // multi-user results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUser(null);
    setResults([]);

    try {
      // If either advanced criteria is present, use Search API (multi-user)
      if (location || minRepos) {
        const data = await searchAdvancedUsers({ username, location, minRepos });
        const items = data.items || [];

        if (items.length === 0) {
          setError('Looks like we cant find the user');
          return;
        }

        // Fetch extra details (location, repo count) for each user
        const detailedResults = await Promise.all(
          items.map(async (u) => {
            const details = await fetchUserData(u.login);
            return {
              ...u,
              location: details.location,
              public_repos: details.public_repos,
            };
          })
        );

        setResults(detailedResults);
      } else if (username) {
        // Only username provided → single-user fetch
        const data = await fetchUserData(username.trim());
        setUser(data);
      } else {
        setError('Please enter a username or advanced criteria');
      }
    } catch (err) {
      console.error(err);
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">GitHub User Search</h1>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded p-2"
          aria-label="Username"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded p-2"
          aria-label="Location"
        />
        <input
          type="number"
          min="0"
          step="1"
          placeholder="Min Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border rounded p-2"
          aria-label="Minimum Repositories"
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Single user result */}
      {user && (
        <div className="flex items-center gap-4 border p-4 rounded mb-6 bg-gray-50">
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            className="w-16 h-16 rounded-full"
          />
          <div className="min-w-0">
            <p className="font-semibold truncate">
              {user.name || user.login}
            </p>
            {user.location && (
              <p className="text-gray-600 truncate">Location: {user.location}</p>
            )}
            <p className="text-gray-600">Repos: {user.public_repos}</p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Profile
            </a>
          </div>
        </div>
      )}

      {/* Multiple users result */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((u) => (
            <div key={u.id} className="flex items-center gap-4 border p-4 rounded bg-gray-50">
              <img
                src={u.avatar_url}
                alt={`${u.login} avatar`}
                className="w-16 h-16 rounded-full"
              />
              <div className="min-w-0">
                <p className="font-semibold truncate">{u.login}</p>
                {u.location && (
                  <p className="text-gray-600 truncate">Location: {u.location}</p>
                )}
                <p className="text-gray-600">Repos: {u.public_repos}</p>
                <a
                  href={u.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
