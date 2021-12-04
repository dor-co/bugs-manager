import ModalReducer from "../redux/ModalReducer";
import DataReducer from "../redux/DataReducer";
import NameReducer from "../redux/NameReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    ModalReducer,
    DataReducer,
    NameReducer
});

export default allReducers;