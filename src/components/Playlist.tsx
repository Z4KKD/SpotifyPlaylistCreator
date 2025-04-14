import React from 'react';
import { useAppContext } from '../context/AppContext';

const Playlist: React.FC = () => {
  const { playlist, removeFromPlaylist } = useAppContext();

  return (
    <div className="playlist">
      <ul className="playlist-container">
        {playlist.map((song) => (
          <li key={song.id} className="playlist-item">
            <img src={song.albumArt} alt={song.album} />
            <p>{song.name}</p>
            <button onClick={() => removeFromPlaylist(song.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
