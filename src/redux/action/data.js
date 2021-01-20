import {default as axios} from 'axios';

const url = 'https://api.icndb.com/jokes/random/10-';

export default {
  getData: () => ({
    type: 'GET_DATA',
    payload: axios.get(url),
  }),
  addData: () => ({
    type: 'ADD_DATA',
    payload: axios.get(url),
  }),
  deleteData: () => ({
    type: 'DELETE_DATA',
  }),
  updateData: (i, it) => ({
    type: 'UPDATE_DATA',
    payload: [i, it],
  }),
};
