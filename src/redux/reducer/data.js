const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export default (state = initialState, action) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  switch (action.type) {
    case 'GET_DATA_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_DATA_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case 'GET_DATA_FULFILLED': {
      let a = getRandomInt(10);
      let b = getRandomInt(10);
      let c = getRandomInt(10);
      if (a === b || a === c || b === c) {
        a = getRandomInt(10);
        b = getRandomInt(10);
        c = getRandomInt(10);
      }
      return {
        ...state,
        isLoading: false,
        data: [
          action.payload.data.value[a],
          action.payload.data.value[b],
          action.payload.data.value[c],
        ],
      };
    }
    case 'ADD_DATA_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'ADD_DATA_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        alertMsg: 'There is an error at request data',
      };
    }
    case 'ADD_DATA_FULFILLED': {
      const i = getRandomInt(10);
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload.data.value[i]],
      };
    }
    case 'DELETE_DATA': {
      return {
        ...state,
        isLoading: false,
        data: [],
      };
    }
    case 'UPDATE_DATA':
      {
        const index = action.payload[0];
        const item = action.payload[1];
        if (index > -1) {
          state.data.splice(index, 1);
          return {
            ...state,
            isLoading: false,
            data: [item, ...state.data],
          };
        }
      }
      break;
    default: {
      return state;
    }
  }
};
