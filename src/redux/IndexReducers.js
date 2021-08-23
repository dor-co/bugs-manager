import ModalReducer from "../redux/ModalReducer";
import DataReducer from "../redux/DataReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    ModalReducer,
    DataReducer
});

export default allReducers;