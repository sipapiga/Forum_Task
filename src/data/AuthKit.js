const ROOT_URL = 'https://lab.willandskill.eu';
const LOGIN_URL = `${ROOT_URL}/api/v1/auth/api-token-auth/`;
const ME_URL = `${ROOT_URL}/api/v1/me/`;
const REGISTER_URL = `${ROOT_URL}/api/v1/auth/users/`;
const COUNTRY_LIST_URL = `${ROOT_URL}/api/v1/countries/`;

// eslint-disable-next-line import/no-anonymous-default-export
export default class {
  login(email, password) {
    const payload = {
      email,
      password,
    };
    return fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: this.getPublicHeaders(),
    });
  }

  register(email, password, firstName, lastName, country) {
    const payload = {
      firstName,
      lastName,
      email,
      password,
      country,
    };
    return fetch(REGISTER_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: this.getPublicHeaders(),
    });
  }

  getCountryList() {
    return fetch(COUNTRY_LIST_URL, {
      headers: this.getPublicHeaders(),
    });
  }

  getMe() {
    return fetch(ME_URL, {
      headers: this.getPrivateHeaders(),
    });
  }

  getPublicHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }
  getPrivateHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getSessionToken()}`,
    };
  }

  setSessionToken(token) {
    localStorage.setItem('token', token);
  }

  getSessionToken() {
    return localStorage.getItem('token');
  }
  removeToken() {
    localStorage.removeItem('token');
  }
}
