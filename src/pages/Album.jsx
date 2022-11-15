import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    artist: {},
    arrMusic: [],
    favorites: '',
    isCheck: {},
    isLoading: false,
  };

  componentDidMount() {
    this.getMusic();
  }

  handleChanges = ({ target }) => {
    const { name, checked } = target;
    const { arrMusic } = this.state;
    addSong();
    this.setState({ isLoading: true });
    setTimeout(() => {
      if (checked === true) {
        const getMusic = arrMusic.find((e) => e.trackName === name);
        addSong(getMusic);
      }
      this.setState((prevState) => ({
        isCheck: { ...prevState.isCheck, [name]: checked },
        isLoading: false,
      }));
    }, 100);
  };

  getMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    const musics = [...result];
    this.setState({
      artist: musics.shift(),
      arrMusic: musics,
    });
    console.log(musics);
  };

  render() {
    const { artist, arrMusic, isLoading, favorites, isCheck } = this.state;
    return (isLoading ? <Loading /> : (
      <div data-testid="page-album">
        <Header />
        <h5 data-testid="artist-name">{ artist.artistName }</h5>
        <h4 data-testid="album-name">{ artist.albumName }</h4>
        { arrMusic.map((e) => {
          const {
            trackName,
            previewUrl,
            collectionName,
            artistName,
            trackId,
          } = e;
          return (
            <MusicCard
              artistName={ artistName }
              trackName={ trackName }
              previewUrl={ previewUrl }
              collectionName={ collectionName }
              trackId={ trackId }
              key={ Math.random() }
              favorites={ favorites }
              handleChanges={ this.handleChanges }
              isCheck={ isCheck[trackName] }
            />
          );
        })}
      </div>
    )
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
}.isRequired;

export default Album;
