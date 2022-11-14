import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    login: '',
    isLoading: false,
  };

  componentDidMount() {
    this.getUserForHeader();
  }

  getUserForHeader = async () => {
    this.setState({ isLoading: true });
    const getLogin = await getUser();
    this.setState({ isLoading: false, login: getLogin });
  };

  render() {
    const { login, isLoading } = this.state;
    const headerUser = (
      <h1 data-testid="header-user-name">
        { login.name }
      </h1>
    );
    return (
      <div>
        <header data-testid="header-component">
          { isLoading ? (<Loading />) : (headerUser) }
        </header>
        <button type="button">
          <Link data-testid="link-to-search" to="/search">Search</Link>
        </button>
        <button type="button">
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        </button>
        <button type="button">
          <Link to="/album/:id">Album</Link>
        </button>
        <button type="button">
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </button>
        <button type="button">
          <Link to="/profile/edit">dit</Link>
        </button>
      </div>
    );
  }
}

export default Header;
