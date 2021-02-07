import {default as axios} from 'axios';

const url = 'https://nextar.flip.id/frontend-test';

export default {
  getData: () => ({
    type: 'GET_DATA',
    payload: axios.get(url),
  }),
};
