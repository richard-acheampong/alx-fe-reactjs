
// import { useState } from 'react';
// import SearchBar from './components/SearchBar';
// import UserCard from './components/UserCard';
// import { searchUsers } from './services/github';
// import './App.css';

// function App() {
//   const [results, setResults] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   const handleSearch = async (query) => {
//     setLoading(true);
//     setErrorMsg('');
//     try {
//       const data = await searchUsers(query, 1, 10);
//       setResults(data.items || []);
//       setTotal(data.total_count || 0);
//     } catch (err) {
//       console.error(err);
//       setErrorMsg(
//         err?.response?.data?.message ||
//         'Something went wrong. If you are rate-limited, add VITE_GITHUB_TOKEN to .env.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <header style={styles.header}>
//         <h1 style={styles.title}>GitHub User Search</h1>
//       </header>

//       <SearchBar onSearch={handleSearch} isLoading={loading} />

//       {errorMsg && <div style={styles.error}>{errorMsg}</div>}

//       <div style={styles.meta}>
//         {total > 0 && <p>Found <strong>{total}</strong> users (showing first {results.length}).</p>}
//       </div>

//       <div style={styles.grid}>
//         {results.map(user => (
//           <UserCard key={user.id} user={user} />
//         ))}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { maxWidth: 800, margin: '0 auto', padding: '24px' },
//   header: { marginBottom: '16px' },
//   title: { margin: 0 },
//   error: { background: '#ffeef0', color: '#86181d', padding: '10px', borderRadius: '8px', marginBottom: '12px' },
//   meta: { marginBottom: '12px', color: '#586069' },
//   grid: { display: 'grid', gap: '12px' },
// };

// export default App;




import Search from './components/Search';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6">
      <div className="w-full max-w-6xl">
        <Search />
      </div>
    </div>
  );
}


export default App
