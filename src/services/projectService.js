import api from './api';

const projectService = {
  getAll: async () => (await api.get('/project')).data,
  getById: async (id) => (await api.get(`/project/${id}`)).data,
  create: async (data) => (await api.post('/project', data)).data,
  update: async (id, data) => (await api.put(`/project/${id}`, data)).data,
  remove: async (id) => (await api.delete(`/project/${id}`)).data
};

export default projectService;
