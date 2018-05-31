import React from 'react';
import { withCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import { RouterLogged, RouterVisitor } from './router.js';

class Auth extends React.Component {

  render() {
    // Try to decode the token
    var tokenDecoded;
    var token;
    try {
      token = this.props.cookies.get('token');
      tokenDecoded = jwt_decode(token);
    } catch (error) {
      tokenDecoded = undefined;
    }

    // Did we success?
    const logged = tokenDecoded !== undefined;

    if (logged) {
      return <RouterLogged token={token} />
    }

    return <RouterVisitor />
  }
}

export const WithCookiesAuth = withCookies(Auth);

export const Token = React.createContext();