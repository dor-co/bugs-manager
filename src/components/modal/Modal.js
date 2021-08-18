import './Style.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/Actions";

function Modal() {

    const modalRed = useSelector((state) => state.ModalReducer);
    const dispatch = useDispatch();

    console.log(modalRed)

    const handleClose = () => {
        return dispatch(closeModal());
    }

    return (
            <div>
            <Dialog
                open={modalRed.boolOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {
                        modalRed.title === 'addTitle' ? 'Add New Bug' :
                        modalRed.title === 'bugDetailsTitle' ? 'Bug Details' : ''
                    }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            modalRed.body === 'bugDetailsBody' ? (
                                <>
                                    <h3>Bug Name: {modalRed.firestoreRow.title}</h3>
                                    <h3>Bug Status: {modalRed.firestoreRow.status}</h3>
                                    <h3>Bug Description: {modalRed.firestoreRow.description}</h3>
                                    <h3>Bug Critical: {modalRed.firestoreRow.critical}</h3>
                                </>
                            ) : ''
                            
                            }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        cancel
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Modal;