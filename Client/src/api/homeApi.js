import api from './baseApiRequest';

export const getHome = (userId) => {
  return api.get(`/home/${userId}`);
};
