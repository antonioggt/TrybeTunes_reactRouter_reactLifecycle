import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

const minLoginLength = 2;

class Login extends Component {
  state = {
    login: '',
    isDisabled: true,
    isLoading: false,
  };

  handleDisabled = () => {
    const { login } = this.state;
    const validateLogin = login.length >= minLoginLength;

    if (validateLogin) {
      this.setState({ isDisabled: false });
    }
  };

  handleChanges = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
    this.handleDisabled();
  };

  handleButton = async () => {
    const { login } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: login });
    this.setState({ isLoading: false });
    history.push('/search');
  };

  render() {
    const { login, isDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        { isLoading ? (
          <Loading />
        ) : (
          <form action="">
            <label htmlFor="login-name-input">
              Login:
              <input
                data-testid="login-name-input"
                type="text"
                value={ login }
                onChange={ this.handleChanges }
                name="login"
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ isDisabled }
              onClick={ this.handleButton }
            >
              entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Login;
