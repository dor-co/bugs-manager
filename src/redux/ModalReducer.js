import * as actions from "./Consts";

const initialState = {
  boolOpen: false,
  title: '',
  body: '',
  firestoreRow: []
};

const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.OPEN_MODAL:
      return {
        boolOpen: true,
        title: action.title,
        body: action.body,
        firestoreRow: action.firestoreRow
      };
    
    case actions.CLOSE_MODAL:
        return{
            boolOpen: false
        };  

    default:
      return state;
  }
};

export default ModalReducer;