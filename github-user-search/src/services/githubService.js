
import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';
const token = import.meta.env.VITE_GITHUB_TOKEN;

const client = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

// Fetch single user by username
export async function fetchUserData(username) {
  const { data } = await client.get(`/users/${username}`);
  return data;
}

// Advanced search for multiple users
export async function searchAdvancedUsers({ username, location, minRepos }) {
  let query = '';
  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const { data } = await client.get('/search/users', {
    params: { q: query.trim(), per_page: 10 },
  });
  return data;
}
