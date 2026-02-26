import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`,
      );
      const data = await response.json();
      setCharacters(data.results);
      setError(null);
    } catch (err) {
      setError("Failed to load characters");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Rick and Morty Characters</h1>

      {loading && <div className="loading">Loading...</div>}

      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={() => fetchCharacters(currentPage)}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="characters-grid">
            {characters.map((character) => (
              <div key={character.id} className="character-card">
                <img src={character.image} alt={character.name} />
                <h3>{character.name}</h3>
                <p>
                  {character.species} | {character.status}
                </p>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
