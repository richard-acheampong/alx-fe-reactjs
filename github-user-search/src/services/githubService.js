
import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';
const token = import.meta.env.VITE_GITHUB_TOKEN;

const client = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

export async function fetchUserData(username) {
  const { data } = await client.get(`/users/${username}`);
  return data;
}
