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