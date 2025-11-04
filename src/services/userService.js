import api from './api';

const userService = {
  getAll: async () => (await api.get('/user')).data
};

export default userService;
