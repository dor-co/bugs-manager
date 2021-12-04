import * as actions from "./Consts";

const initialState = {
  first: '',
  last: ''
};

const NameReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_NAME:
      return {
        first: action.first,
        last: action.last
      };
    
    default:
      return state;
  }
};

export default NameReducer;