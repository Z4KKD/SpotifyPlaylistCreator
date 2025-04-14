import React, { createContext, useState, ReactNode, useContext, useMemo } from 'react';

// Export Song type to use in other files
export interface Song {
  id: string;
  name: string;
  album: string;
  albumArt: string;
  audioUrl?: string; 
}

interface AppContextProps {
  currentSong: Song | null;
  playlist: Song[];
  setCurrentSong: (song: Song) => void;
  addToPlaylist: (song: Song) => void;
  removeFromPlaylist: (songId: string) => void;
}

interface AppProviderProps {
  children: ReactNode;  // Define 'children' as a prop
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);

  const addToPlaylist = (song: Song) => {
    // Check if the song is already in the playlist
    if (!playlist.some((existingSong) => existingSong.id === song.id)) {
      setPlaylist((prevPlaylist) => [...prevPlaylist, song]);
    }
  };

  const removeFromPlaylist = (songId: string) => {
    setPlaylist((prevPlaylist) => prevPlaylist.filter((song) => song.id !== songId));
  };

  // Use useMemo to avoid unnecessary recalculations of context value
  const contextValue = useMemo(
    () => ({
      currentSong,
      playlist,
      setCurrentSong,
      addToPlaylist,
      removeFromPlaylist,
    }),
    [currentSong, playlist, addToPlaylist, removeFromPlaylist] // Recalculate only when these change
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
