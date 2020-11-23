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

  register(payload) {
    console.log(payload);
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

  getCountryText(countryId) {
    // eslint-disable-next-line default-case
    switch (countryId) {
      case 1:
        return { name: 'Sweden', flag: 'flag se' };
      case 2:
        return { name: 'Denmark', flag: 'flag dk' };
      case 3:
        return { name: 'Norway', flag: 'flag no' };
      case 4:
        return { name: 'Finland', flag: 'flag fi' };
      case 5:
        return { name: 'Germany', flag: 'flag de' };
    }
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
