const initialState = {
  isLoading: false,
  isError: false,
  index: [],
  dataArr: [],
};

export default (state = initialState, action) => {
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
      const i = Object.keys(action.payload.data);
      const d = action.payload.data;
      let temporary = [];
      i.map((item) => {
        temporary = [...temporary, d[item]];
      });
      return {
        ...state,
        isLoading: false,
        dataArr: temporary,
        index: Object.keys(action.payload.data),
      };
    }
    default: {
      return state;
    }
  }
};
