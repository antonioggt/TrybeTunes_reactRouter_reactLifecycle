import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const {
      trackName,
      previewUrl,
      collectionName,
      artistName,
      trackId,
      isCheck,
      handleChanges,
    } = this.props;
    return (
      <div>
        <div>
          <h3>{ artistName }</h3>
          <h3>{ trackName }</h3>
        </div>
        <h3>{ collectionName }</h3>
        <img src={ previewUrl } alt={ previewUrl } />
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento.
          <code>audio</code>
        </audio>
        <label htmlFor="favoritesInput">
          Favorita
          <input
            id="favoritesInput"
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name={ trackName }
            checked={ isCheck }
            onChange={ handleChanges }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  isCheck: PropTypes.bool.isRequired,
  handleChanges: PropTypes.func.isRequired,
};

export default MusicCard;
