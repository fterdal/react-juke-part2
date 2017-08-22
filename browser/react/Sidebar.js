import React from 'react';


export default function Sidebar({allAlbums}) {


  return (

    <div className="col-xs-2">
      <sidebar>
        <img src="juke.svg" className="logo" />
        <section>
          <h4 className="menu-item active">
            <a href="#" onClick={(evt) => {
              evt.preventDefault();
              allAlbums();
            }}>ALBUMS</a>
          </h4>
        </section>
      </sidebar>
    </div>
  )

}
