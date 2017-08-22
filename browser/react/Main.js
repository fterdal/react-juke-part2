import React from 'react';
import axios from 'axios';

import Footer from './Footer';
import Sidebar from './Sidebar';
import AllAlbums from './AllAlbums';
import SingleAlbum from './SingleAlbum';


const audio = document.createElement('audio');

audio.addEventListener('load', () => {
  console.log('audio load event fired');
});

audio.addEventListener('loadend', () => {
  console.log('audio loadend event fired');
});

audio.addEventListener('loadstart', () => {
  console.log('audio loadstart event fired');
});

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      selectedAlbum: {},
      currentSongIndex: -1, // index in state.playlist
      // currentSong: {},
      playing: false,
      playlist: [],
    };
    this.displaySingleAlbum = this.displaySingleAlbum.bind(this);
    this.displayAllAlbums = this.displayAllAlbums.bind(this);
    this.audioPlay = this.audioPlay.bind(this);
    this.audioPause = this.audioPause.bind(this);
  }

  get currentSong() {
    return this.state.playlist[this.state.currentSongIndex] || {};
  }

  displaySingleAlbum(album) {
    axios.get(`/api/albums/${album.id}`)
      .then(response => {
        this.setState({ selectedAlbum: response.data });
      })
      .catch(console.error.bind(console));
  }

  displayAllAlbums() {
    this.setState({ selectedAlbum: {} });
  }

  audioPlay(songIndex, playlist) {
    console.log('audioPlay was called');
    if (songIndex !== undefined && this.currentSong.id !== playlist[songIndex].id) {
      this.setState({ currentSongIndex: songIndex, playlist: playlist });
      audio.src = playlist[songIndex].audioUrl;
      audio.load();
    }
    audio.play()
      .then((data) => {
        console.log('play resolved with: ', data);
        this.setState({ playing: true });
      })
      .catch(console.error.bind(console));
  }

  audioPause() {
    console.log('audioPaused was called');
    this.setState({ playing: false });
    audio.pause();
  }

  render() {
    return (
      <div id="main" className="container-fluid">
        <Sidebar allAlbums={this.displayAllAlbums} />
        <div className="col-xs-10">
          <h3>Albums</h3>
          {
            this.state.selectedAlbum.id ?
              <SingleAlbum album={this.state.selectedAlbum} currentSong={this.currentSong} play={this.audioPlay} /> :
              <AllAlbums albums={this.state.albums} handleClick={this.displaySingleAlbum} />
          }
        </div>
        <Footer displayFooter={this.state.currentSongIndex >= 0} playing={this.state.playing} play={this.audioPlay} pause={this.audioPause} />
      </div>
    )
  }

  componentDidMount() {
    axios.get('/api/albums/')
      .then(response => {
        this.setState({ albums: response.data });
      })
      .catch(console.error.bind(console));
  }
}
