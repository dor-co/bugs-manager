import './Style.css';
import FadeIn from 'react-fade-in';
import Button from "@material-ui/core/Button";
import { useFirestore } from "reactfire";
import "firebase/firestore";
import React, { useState, useEffect } from 'react';
import Bug from '../../components/bug/Bug';
import { useSelector, useDispatch } from "react-redux";
import { openModal, closeModal } from '../../redux/Actions';
import Modal from '../../components/modal/Modal';

function Main() {

    const modalRed = useSelector((state) => state.ModalReducer);
    const dispatch = useDispatch();

    const [firestoreData, setFirestoreData] = useState([]);

    const db = useFirestore();

    const useItems = (itemType, callback, items) => {
        useEffect(() => {
            const fetchData = async () => {
                await db
                    .collection(itemType)
                    .onSnapshot((snapshot) => {
                        let listItems = [];
                        listItems = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        callback(listItems);
                    });
            };
            fetchData();
        }, []);
    };

    useItems("Bugs", setFirestoreData, firestoreData);

    const addBug = () => {
        dispatch(openModal('addTitle'));
    }

    return (
        <div className='mainContainerStyle'>
            <h1 className='titleStyle'>Bugs Manager</h1>
            <FadeIn transitionDuration='800' childTag='bodyStyle'>
                <div className='bodyStyle'>
                <Button onClick={addBug} variant="contained" className='addBugBtn'>add new bug</Button>
                    {firestoreData.length !== 0 &&
                        <div className='bugCardStyle'>
                            <FadeIn transitionDuration='800' childTag='bodyStyle'>
                                {/* {firestoreData.map(item => { */}
                                    {/* return ( */}
                                        <Bug firestoreData={firestoreData} />
                                    {/* ); */}
                                {/* })} */}
                            </FadeIn>
                        </div>
                    }
                </div>
            </FadeIn>
            <Modal />
        </div>
    );
}

export default Main;