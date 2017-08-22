import React from 'react';

export default function Footer({ displayFooter, playing, play, pause }) {
  if (!displayFooter) return <footer />

  return (


    <footer>
      <div className="pull-left">
        <button className="btn btn-default">
          <span className="glyphicon glyphicon-step-backward"></span>
        </button>
        <button className="btn btn-default" onClick={evt => {
          evt.preventDefault();
          playing ? pause() : play();
        }}
        >
          <span className={playing ? 'glyphicon glyphicon-pause' : 'glyphicon glyphicon-play'} />

        </button>
        <button className="btn btn-default">
          <span className="glyphicon glyphicon-step-forward"></span>
        </button>
      </div>
      <div className="bar">
        <div className="progress">
          <div className="progress-bar"></div>
        </div>
      </div>
    </footer>

  )

}
