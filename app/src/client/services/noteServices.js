import axios from 'axios';

const url = '/api/notes';

const get = () => {
  return axios.get(url).then((response) => response.data);
};

const create = (newNote) => {
  return axios.post(url, newNote).then((response) => response.data);
};

const update = (id, updatedContent) => {
  return axios
    .put(`${url}/${id}`, updatedContent)
    .then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${url}/${id}`).then((response) => response.data);
};

const removeAll = () => {
  return axios.delete(`${url}/all/delete`).then((response) => response.data);
};

export const noteServices = {
  url,
  get,
  create,
  remove,
  removeAll,
  update,
};