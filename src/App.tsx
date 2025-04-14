import React, { useEffect, useState } from 'react';
import { requestUserAuthorization, getAccessTokenWithCode, createPlaylist } from './services/spotifyAPI';
import { searchSongs } from './services/spotifyAPI';  // Make sure this import is correct
import axios from 'axios'; 


const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [songs, setSongs] = useState<any[]>([]);  // Store songs in state

  useEffect(() => {
    // Check if there's an authorization code in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Exchange the code for an access token
      getAccessTokenWithCode(code).then((token) => {
        setAccessToken(token);

        // Get the user's Spotify User ID (you can use the Spotify API to get this)
        axios.get('https://api.spotify.com/v1/me', {
          headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
          setUserId(response.data.id);
        });
      });
    }
  }, []);

  const handleCreatePlaylist = async () => {
    if (!accessToken || !userId) {
      alert('You need to log in first!');
      return;
    }

    const playlistName = prompt('Enter a name for your playlist:');
    if (playlistName) {
      // Assuming you have a way to access the current playlist's songs
      await createPlaylist(songs, playlistName, accessToken, userId);
      alert('Playlist created successfully!');
    }
  };

  const handleLogin = () => {
    // Redirect the user to Spotify's authorization page
    requestUserAuthorization();
  };

  const handleSearch = (query: string) => {
    // Use the search function to fetch songs based on the query
    searchSongs(query).then((fetchedSongs) => {
      setSongs(fetchedSongs);
    });
  };

  return (
    <div>
      <h1>PlayTunes</h1>
      {accessToken ? (
        <div>
          <button onClick={handleCreatePlaylist}>Create Playlist</button>
          {/* Add a simple search input to find songs */}
          <input 
            type="text" 
            placeholder="Search for songs" 
            onChange={(e) => handleSearch(e.target.value)} 
          />
          <ul>
            {songs.map((song, index) => (
              <li key={index}>
                {song.name} - {song.artists[0].name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Spotify</button>
      )}
    </div>
  );
};

export default App;
