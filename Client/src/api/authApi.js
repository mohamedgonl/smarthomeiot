import api from './baseApiRequest';

export const authApi = {
  login(username, password) {
    return api.post('/account/login', { username, password });
  },
};
