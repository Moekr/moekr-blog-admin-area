import cookie from 'react-cookie';
import basic from 'basic-authorization-header';

export default {
  getAuth() {
    return cookie.load('auth');
  },

  setAuth(username, password) {
    const auth = basic(username, password);
    cookie.save('auth', auth);
  },

  clearAuth() {
    cookie.remove('auth');
  },
};
