import * as actions from "./Consts";

const initialState = {
  data: []
};

const DataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_DATA:
      return {
        data: action.data
      };
    
    default:
      return state;
  }
};

export default DataReducer;