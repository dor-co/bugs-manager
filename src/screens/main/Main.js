import './Style.css';
import FadeIn from 'react-fade-in';
import Button from "@material-ui/core/Button";
import "firebase/firestore";
import React, { useState, useEffect } from 'react';
import Bug from '../../components/bug/Bug';
import { useSelector, useDispatch } from "react-redux";
import { openModal, closeModal, getData } from '../../redux/Actions';
import Modal from '../../components/modal/Modal';
import { useFirestore, useFirestoreDocData } from "reactfire";

function Main() {

    const modalRed = useSelector((state) => state.ModalReducer);
    const dispatch = useDispatch();

    // const [firestoreData, setFirestoreData] = useState([]);
    const [dataArray, setDataArray] = useState([]);
    // const db = useFirestore();

    // const useItems = (itemType, callback, items) => {
    //     useEffect(() => {
    //         const fetchData = async () => {
    //             await db
    //                 .collection(itemType)
    //                 .onSnapshot((snapshot) => {
    //                     let listItems = [];
    //                     listItems = snapshot.docs.map((doc) => ({
    //                         id: doc.id,
    //                         ...doc.data(),
    //                     }));
    //                     callback(listItems);
    //                 });
    //         };
    //         fetchData();
    //     }, []);
    // };

    // useItems("Bugs", setFirestoreData, firestoreData);

    
    const addBug = () => {
        dispatch(openModal('addTitle', 'addBody'));
    }

    // const postToDB = async() => {
    //     const response = await fetch('https://bugsmanager-9d88c-default-rtdb.firebaseio.com/bugs.json', {
    //         method: 'POST',
    //         body: JSON.stringify({firstname: 'dor', lastname: 'cohen'}),
    //         headers: {
    //             'Content-Type': 'application/json' 
    //         }
    //     });
    //     const data = await response.json();
    //     console.log('post data:', data);
        
    //     // getFromDB();
    // };

    const getFromDB = async() => {
        const response = await fetch('https://bugsmanager-9d88c-default-rtdb.firebaseio.com/bugs.json');
        const data = await response.json();

        const loadedData = [];

        for(const key in data){
            loadedData.push({
                id: key,
                title: data[key].title,
                description: data[key].description,
                status: data[key].status,
                critical: data[key].critical
            });
        }

        setDataArray(loadedData);
        console.log('loaded data main:', loadedData);

        dispatch(getData(loadedData));
    };

    // const deleteFromDB = async(id) => {
    //     const response = await fetch(`https://bugsmanager-9d88c-default-rtdb.firebaseio.com/bugs/${id}.json`, {
    //         method: 'DELETE'
    //       });

    //     const data = await response.json();
    //     console.log('data after delete:', data);
    //     // getFromDB();
    // };

    // const putToDB = async() => {
    //     const response = await fetch('https://bugsmanager-9d88c-default-rtdb.firebaseio.com/bugs/-MhdWrT9_jXMsIgscKZ4.json', {
    //         method: 'PUT',
    //         body: JSON.stringify({firstname: 'dor111111', lastname: 'cohe'}),
    //         headers: {
    //             'Content-Type': 'application/json' 
    //         }
    //     });
    //     const data = await response.json();
    //     console.log('post data:', data);
    // };

    const useItems = () => {
        useEffect(() => {
            getFromDB();
        }, []);
    };

    useItems();

    return (
        <div className='mainContainerStyle'>
            {/* <Button onClick={postToDB}>Add Data</Button>
            <Button onClick={getFromDB}>Fetch Data</Button>
            <Button onClick={deleteFromDB}>Delete Data</Button>
            <Button onClick={putToDB}>Put Data</Button> */}

            {/* {dataArray.map(item => {
                return(
                    <div onClick={() => deleteFromDB(item.id)}>
                        <h1>{item.firstname}</h1>
                        <h1>{item.id}</h1>
                    </div>
                );
            })} */}
            <h1 className='titleStyle'>Bugs Manager</h1>
            <FadeIn transitionDuration='800' childTag='bodyStyle'>
                <div className='bodyStyle'>
                <Button onClick={addBug} variant="contained" className='addBugBtn'>add new bug</Button>
                    {dataArray.length !== 0 &&
                        <div className='bugCardStyle'>
                            <FadeIn transitionDuration='800' childTag='bodyStyle'>
                                        <Bug dataArray={dataArray} />
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