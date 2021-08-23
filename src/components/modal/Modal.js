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
import { closeModal, getData } from "../../redux/Actions";

function Modal() {

    const modalRed = useSelector((state) => state.ModalReducer);
    const dataRed = useSelector((state) => state.DataReducer);
    const dispatch = useDispatch();

    const [titleErrorValid, setTitleErrorValid] = useState(false);
    const [titleInput, setTitleInput] = useState("");
    const [descriptionErrorValid, setDescriptionErrorValid] = useState(false);
    const [descriptionInput, setDescriptionInput] = useState("");
    const [statusErrorValid, setStatusErrorValid] = useState(false);
    const [statusInput, setStatusInput] = useState("");
    const [criticalErrorValid, setCriticalErrorValid] = useState(false);
    const [criticalInput, setCriticalInput] = useState("");


    const [dataArray, setDataArray] = useState([]);

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

    const criticalBlur = (e) => {
        if(e.target.value.trim() === ""){
            e.target.value = "";
        } else if(e.target.value < 1){
            e.target.value = 1;
        }
        setCriticalInput(e.target.value);
        if (e.target.value.trim() !== "") {
            setCriticalErrorValid(false);
        } else {
            setCriticalErrorValid(true);
        }
    };

    const criticalChange = (e) => {
        if(e.target.value > 10){
            e.target.value = 10;
        }
        if (e.target.value.trim() !== "") {
            setCriticalErrorValid(false);
        } else {
            setCriticalErrorValid(true);
        }
    };

    const getFromDB = async () => {
        const response = await fetch('https://bugsmanager-9d88c-default-rtdb.firebaseio.com/bugs.json');
        const data = await response.json();

        const loadedData = [];

        for (const key in data) {
            loadedData.push({
                id: key,
                title: data[key].title,
                description: data[key].description,
                status: data[key].status,
                critical: data[key].critical
            });
        }

        setDataArray(loadedData);
        console.log('loaded data:', loadedData);

        dispatch(getData(loadedData));
    };

    const postToDB = async () => {
        const response = await fetch('https://bugsmanager-9d88c-default-rtdb.firebaseio.com/bugs.json', {
            method: 'POST',
            body: JSON.stringify({ 
                title: titleInput, 
                description: descriptionInput, 
                status: statusInput, 
                critical: criticalInput
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('post data:', data);

        getFromDB();
    };

    const addClick = () => {
        if (titleInput.trim() === "") {
            setTitleErrorValid(true);
        } if (descriptionInput.trim() === "") {
            setDescriptionErrorValid(true);
        } if (statusInput.trim() === "") {
            setStatusErrorValid(true);
        } if (criticalInput.trim() === "") {
            setCriticalErrorValid(true);
        } else if (titleInput.trim() !== "" && descriptionInput.trim() !== "" && statusInput.trim() !== "") {
            //add to firebase
            postToDB();
            setTitleInput('');
            setDescriptionInput('');
            setStatusInput('');
            setCriticalInput('');
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
        setCriticalErrorValid(false);
        setCriticalInput('');
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
                                        <div>
                                            <TextField
                                                className='inputFieldStyle'
                                                onBlur={criticalBlur}
                                                onChange={criticalChange}
                                                type='number'
                                                error={criticalErrorValid ? true : false}
                                                label="Bug Critical"
                                                helperText={criticalErrorValid ? 'bug critical is required (1-10)' : ''}
                                            />
                                        </div>
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