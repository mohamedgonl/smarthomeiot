import api from './baseApiRequest';

export const deviceApi = {
  getDevice(deviceId) {
    return api.get(`/device/${deviceId}`);
  },
};
