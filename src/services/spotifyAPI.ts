import axios from 'axios';

// Your Spotify API credentials
const CLIENT_ID = 'your_client_id';
const CLIENT_SECRET = 'your_client_secret';
const AUTH_URL = 'https://accounts.spotify.com/api/token';
const API_URL = 'https://api.spotify.com/v1/';

// Define your redirect URI (must match what you've set in your Spotify Developer Console)
const REDIRECT_URI = 'http://localhost:5173/callback'; // Replace with your callback URL

// Function to get the access token using the Authorization Code Flow
export const getAccessTokenWithCode = async (code: string) => {
  const tokenData = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  const response = await axios.post(AUTH_URL, new URLSearchParams(tokenData), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
};

// Function to request authorization (login) from the user
export const requestUserAuthorization = () => {
  const scope = 'playlist-modify-public playlist-modify-private'; // Add the appropriate scopes
  const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scope}`;
  window.location.href = authURL; // Redirect the user to Spotify's login page
};

// Function to search for songs
export const searchSongs = async (query: string) => {
  const token = await getAccessTokenWithCode(''); // Replace with valid token flow
  const response = await axios.get(`${API_URL}search`, {
    params: {
      q: query,
      type: 'track',
      limit: 50,  // Increase limit to fetch more results
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.tracks.items;
};

// Function to get album details (to show album art)
export const getAlbumDetails = async (albumId: string) => {
  const token = await getAccessTokenWithCode(''); // Replace with valid token flow
  const response = await axios.get(`${API_URL}albums/${albumId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Function to create a playlist on Spotify
export const createPlaylist = async (songs: any[], playlistName: string, accessToken: string, userId: string) => {
  // Create a new playlist
  const playlistResponse = await axios.post(
    `${API_URL}users/${userId}/playlists`,
    {
      name: playlistName,
      description: 'Playlist created from PlayTunes',
      public: false,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const playlistId = playlistResponse.data.id;

  // Prepare an array of track URIs to add to the playlist
  const trackUris = songs.map((song) => `spotify:track:${song.id}`);

  // Add tracks to the playlist
  await axios.post(
    `${API_URL}playlists/${playlistId}/tracks`,
    {
      uris: trackUris,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
