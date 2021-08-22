import './Style.css';
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/Actions";

function Modal() {

    const modalRed = useSelector((state) => state.ModalReducer);
    const dispatch = useDispatch();

    const [titleErrorValid, setTitleErrorValid] = useState(false);
    const [titleInput, setTitleInput] = useState("");
    const [descriptionErrorValid, setDescriptionErrorValid] = useState(false);
    const [descriptionInput, setDescriptionInput] = useState("");
    const [statusErrorValid, setStatusErrorValid] = useState(false);
    const [statusInput, setStatusInput] = useState("");

    const titleBlur = (e) => {
        setTitleInput(e.target.value);
        if (e.target.value.trim() !== "") {
            setTitleErrorValid(false);
        } else {
            setTitleErrorValid(true);
        }
    };

    const titleChange = (e) => {
        if (e.target.value.trim() !== "") {
            setTitleErrorValid(false);
        } else {
            setTitleErrorValid(true);
        }
    };

    const descriptionBlur = (e) => {
        setDescriptionInput(e.target.value);
        if (e.target.value.trim() !== "") {
            setDescriptionErrorValid(false);
        } else {
            setDescriptionErrorValid(true);
        }
    };

    const descriptionChange = (e) => {
        if (e.target.value.trim() !== "") {
            setDescriptionErrorValid(false);
        } else {
            setDescriptionErrorValid(true);
        }
    };

    const statusBlur = (e) => {
        if (e.target.value === undefined) {
            e.target.value = "";
        }
        setStatusInput(e.target.value);
        if (e.target.value.trim() !== "") {
            setStatusErrorValid(false);
        } else {
            setStatusErrorValid(true);
        }
    };

    const statusChange = (e) => {
        setStatusInput(e.target.value);
        if (e.target.value.trim() !== "") {
            setStatusErrorValid(false);
        } else {
            setStatusErrorValid(true);
        }
    };

    const addClick = () => {
        if (titleInput.trim() === "") {
            setTitleErrorValid(true);
        } if (descriptionInput.trim() === "") {
            setDescriptionErrorValid(true);
        } if (statusInput.trim() === "") {
            setStatusErrorValid(true);
        } else if (titleInput.trim() !== "" && descriptionInput.trim() !== "" && statusInput.trim() !== "") {
            //add to firebase
            setTitleInput('');
            setDescriptionInput('');
            setStatusInput('')
            return dispatch(closeModal());
        }
    };

    const handleClose = () => {
        setTitleErrorValid(false);
        setTitleInput('');
        setDescriptionErrorValid(false);
        setDescriptionInput('');
        setStatusErrorValid(false);
        setStatusInput('');
        return dispatch(closeModal());
    };

    const statusValues = [
        {
            value: 'todo',
            label: 'todo',
        },
        {
            value: 'in progress',
            label: 'in progress',
        },
        {
            value: 'ready for QA',
            label: 'ready for QA',
        },
        {
            value: 'done',
            label: 'done',
        },
    ];

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
                            ) : modalRed.body === 'addBody' ? (
                                <>
                                    <div>
                                        <TextField
                                            className='inputFieldStyle'
                                            onBlur={titleBlur}
                                            onChange={titleChange}
                                            error={titleErrorValid ? true : false}
                                            label="Bug Title"
                                            helperText={titleErrorValid ? 'bug title is required' : ''}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            className='inputFieldStyle'
                                            onBlur={descriptionBlur}
                                            onChange={descriptionChange}
                                            error={descriptionErrorValid ? true : false}
                                            label="Bug Description"
                                            helperText={descriptionErrorValid ? 'bug description is required' : ''}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            className='inputFieldStyle'
                                            onBlur={statusBlur}
                                            onChange={statusChange}
                                            value={statusInput}
                                            error={statusErrorValid ? true : false}
                                            select
                                            label="Bug Status"
                                            helperText={statusErrorValid ? 'bug status is required' : ''}
                                        >
                                            {statusValues.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </>
                            ) : ''

                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        cancel
                    </Button>
                    <Button onClick={modalRed.body === 'addBody' ? addClick : handleClose} color="primary" autoFocus>
                        ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Modal;