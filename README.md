# Spotify Playlist Creator

Spotify Playlist Creator is a TypeScript-based React app that allows users to search for songs on Spotify, add them to a playlist, and view the playlist. The app is built using the Spotify Web API and enables users to interact with their Spotify account securely. It includes features like searching for songs, managing a playlist, and displaying album art.

## Features

- Search for songs on Spotify
- Add songs to a playlist
- View playlist with song details and album art
- Remove songs from the playlist
- Responsive and user-friendly UI

## Technologies Used

- React
- TypeScript
- Spotify Web API
- Context API for state management
- Axios for API requests

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Spotify Developer account

## Setup

### Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/spotify-playlist-creator.git
   cd spotify-playlist-creator
2. Install the dependencies:
   ```bash
   npm install
3. Create a `.env` file in the root of the project and add your Spotify API credentials:
   ```bash
   REACT_APP_CLIENT_ID=your_spotify_client_id
   REACT_APP_CLIENT_SECRET=your_spotify_client_secret
4. Start the development server:
   ```bash
   npm start
5. Navigate to `http://localhost:3000` in your browser to see the app in action!


## Components

### Playlist.tsx

The `Playlist` component renders the current playlist, displaying each song with its album art and name. It also provides a button to remove songs from the playlist.

### SearchBar.tsx

The `SearchBar` component allows users to search for songs on Spotify. It displays search results, and users can add songs to their playlist by clicking a button next to each result.

### AppContext.tsx

The `AppContext` provides global state management for the app using React Context API. It stores the current song and playlist data and provides functions to add and remove songs from the playlist.

### spotifyAPI.ts

The `spotifyAPI` file contains functions to interact with the Spotify Web API. It includes functions for authenticating the user, searching for songs, and retrieving album details.

## Authentication

This app uses the Spotify Web API, which requires user authentication. You must create an app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) to obtain your `client_id` and `client_secret`.

Once you have the credentials, add them to the `.env` file as mentioned in the setup steps.

## Running Tests

Currently, the app does not include unit tests, but you can add your own using testing libraries like Jest or React Testing Library.

## Contributing

If you'd like to contribute to the project, feel free to fork the repository, make changes, and submit a pull request. Ensure that your changes follow the project's code style and include tests where applicable.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


