import * as actions from "./Consts";

export const openModal = (title, body, firestoreRow) => {
  return {
    type: actions.OPEN_MODAL,
    title: title,
    body: body,
    firestoreRow: firestoreRow
  };
};

export const closeModal = () => {
  return {
    type: actions.CLOSE_MODAL
  };
};

export const getData = (data) => {
  return {
    type: actions.GET_DATA,
    data: data
  };
};

export const getName = (first, last) => {
  return {
    type: actions.GET_NAME,
    first: first,
    last: last
  };
};