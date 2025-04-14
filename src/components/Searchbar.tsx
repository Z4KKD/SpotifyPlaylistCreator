import React, { useState } from 'react';
import { searchSongs } from '../services/spotifyAPI';
import { useAppContext } from '../context/AppContext';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const { addToPlaylist } = useAppContext();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      const songs = await searchSongs(query);
      setResults(songs);
    }
  };

  const handleAddToPlaylist = (song: any) => {
    addToPlaylist({
      id: song.id,
      name: song.name,
      album: song.album.name,
      albumArt: song.album.images[0].url,
    });
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a song..."
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {results.map((song) => (
          <div key={song.id}>
            <p>{song.name} - {song.album.name}</p>
            <img src={song.album.images[0].url} alt={song.album.name} width={50} />
            <div>
              <button onClick={() => handleAddToPlaylist(song)}>Add to Playlist</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
