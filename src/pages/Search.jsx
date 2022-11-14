import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    searchValue: '',
    isDisabled: true,
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

  render() {
    const { isDisabled, searchValue } = this.state;
    return (
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
            >
              Buscar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
