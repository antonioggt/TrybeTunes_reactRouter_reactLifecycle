import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardAlbum extends Component {
  render() {
    const {
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;
    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ `/album/${collectionId}` }
      >
        <h3>{ artistId }</h3>
        <h3>{ artistName }</h3>
        <h3>{ collectionId }</h3>
        <h3>{ collectionName }</h3>
        <h3>{ collectionPrice }</h3>
        <img src={ artworkUrl100 } alt="artworkUrl100" />
        <h3>{ releaseDate }</h3>
        <h3>{ trackCount }</h3>
      </Link>
    );
  }
}

CardAlbum.propTypes = {
  artistId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  trackCount: PropTypes.string.isRequired,
};

export default CardAlbum;
