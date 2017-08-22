import React from 'react';

export default function SingleAlbum({ album, currentSong, play }) {
  if (!album.id) return null;
  return (
    <div className="album col-xs-10">
      <div>
        <h3>{album.name}</h3>
        <img src={album.imageUrl} className="img-thumbnail" />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Artists</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>

          {album.songs.map((song, index) => {
            return (
              <tr key={song.id} className={currentSong.id === song.id ? 'active' : ''}>
                <td>
                  {
                    currentSong.id !== song.id &&
                    <button className="btn btn-default btn-xs" onClick={evt => {
                      evt.preventDefault();
                      play(index, album.songs);
                    }}>
                      <span className="glyphicon glyphicon-play" />
                    </button>
                  }
                </td>
                <td>{song.name}</td>
                <td>{song.artists.map(artist => artist.name).join(', ')}</td>
                <td>{song.genre}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

