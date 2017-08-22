import React from 'react';

export default function AllAlbums({ albums, handleClick }) {

  return (
    <div className="row">

      {
        albums.map((album) => {

          return (
            <div key={album.id} className="col-xs-4">
              <a className="thumbnail" href="#" onClick={(evt) => {
                evt.preventDefault();
                handleClick(album);
              }} >
                <img src={album.imageUrl} />
                <div className="caption">
                  <h5>
                    <span>{album.name}</span>
                  </h5>
                  <small>{album.songs.length} songs</small>
                </div>
              </a>
            </div>
          )
        })
      }
    </div>
  )
}
