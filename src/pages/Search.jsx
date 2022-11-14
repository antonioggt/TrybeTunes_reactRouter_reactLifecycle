import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import CardAlbum from '../components/CardAlbum';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    searchValue: '',
    isDisabled: true,
    isLoading: false,
    albums: [],
    searched: '',
  };

  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { searchValue } = this.state;
      if (searchValue.length >= 2) {
        this.setState({ isDisabled: false });
      }
    });
  };

  searchArtist = async () => {
    this.setState({ isLoading: true });
    const { searchValue } = this.state;
    const getAlbums = await searchAlbumsAPI(searchValue);
    this.setState({
      searchValue: '',
      isLoading: false,
      albums: getAlbums,
      searched: searchValue,
    });
  };

  render() {
    const { isDisabled, searchValue, isLoading, albums, searched } = this.state;
    return (isLoading ? (<Loading />) : (
      <div data-testid="page-search">
        <Header />
        <form>
          <label
            htmlFor="search-artist-input"
          >
            Buscar artistas
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.handleChanges }
              name="searchValue"
              value={ searchValue }
            />
            <button
              type="submit"
              disabled={ isDisabled }
              data-testid="search-artist-button"
              onClick={ this.searchArtist }
            >
              Buscar
            </button>
            { albums.length > 0
              ? <h3>{`Resultado de álbuns de: ${searched}` }</h3>
              : <h3>Nenhum álbum foi encontrado</h3> }
            {
              albums.length > 0 && albums.map((album) => {
                const { collectionId } = album;
                return (
                  <CardAlbum key={ collectionId } { ...album } />
                );
              })
            }
          </label>
        </form>
      </div>
    )
    );
  }
}

export default Search;
