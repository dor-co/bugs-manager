import './Style.css';
import FadeIn from 'react-fade-in';
import Button from "@material-ui/core/Button";
import "firebase/firestore";
import React, { useState, useEffect, useCallback } from 'react';
import Bug from '../../components/bug/Bug';
import { useSelector, useDispatch } from "react-redux";
import { openModal, closeModal, getData } from '../../redux/Actions';
import Modal from '../../components/modal/Modal';
import { useFirestore, useFirestoreDocData } from "reactfire";
import { useHistory } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';

function Main() {
    console.log('blaaaaaaa')

    const history = useHistory();

    const [asosData, setAsosData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch("https://asos2.p.rapidapi.com/v2/auto-complete?q=bikini%20top&store=US&country=US&currency=USD&sizeSchema=US&lang=en-US", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "asos2.p.rapidapi.com",
                "x-rapidapi-key": "8a617a0584msh094c2c6b13b58efp12dbe0jsn4b770a4f2fd5"
            }
        })
        const data = await response.json();
        setAsosData(data);
        console.log(data);
    };







    const dataRed = useSelector((state) => state.DataReducer);

    const modalRed = useSelector((state) => state.ModalReducer);
    const dispatch = useDispatch();

    const [firestoreData, setFirestoreData] = useState([]);
    const [dataArray, setDataArray] = useState(false);
    const db = useFirestore();

    const get = async () => {
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
        // setDataArray(loadedData);
        console.log('loaded data main:', loadedData);
        dispatch(getData(loadedData));
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://bugsmanager-9d88c-default-rtdb.firebaseio.com/bugs.json');

            console.log('ressssss', response);

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
            dispatch(getData(loadedData));
        };
        fetchData();
    }, []);


    useEffect(() => {
        get();
    }, [])


    const addBug = () => {

        dispatch(openModal('addTitle', 'addBody'));
    }

    const postToDB = async () => {
        const response = await fetch('https://bugsmanager-9d88c-default-rtdb.firebaseio.com/bugs.json', {
            method: 'POST',
            body: JSON.stringify({ firstname: 'dor', lastname: 'cohen' }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('post data:', data);

        // getFromDB();
    };





    const getFromDB = useCallback(async () => {
        const response = await get();
        return response;
    }, []);

    useEffect(() => {
        getFromDB();
    }, [getFromDB]);




    const deleteFromDB = async (id) => {
        const response = await fetch(`https://bugsmanager-9d88c-default-rtdb.firebaseio.com/bugs/${id}.json`, {
            method: 'DELETE'
        });

        const data = await response.json();
        console.log('data after delete:', data);
        // getFromDB();
    };

    const putToDB = async () => {
        const response = await fetch('https://bugsmanager-9d88c-default-rtdb.firebaseio.com/bugs/-MhdWrT9_jXMsIgscKZ4.json', {
            method: 'PUT',
            body: JSON.stringify({ firstname: 'dor111111', lastname: 'cohe' }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('post data:', data);
    };

    // // const useItems = () => {
    // //     useEffect(() => {
    // //         getFromDB();
    // //     }, []);
    // // };

    // // useItems();
    // console.log(`this is asos data:`,asosData?.suggestionGroups[0].suggestions)

    function handleClick() {
        history.push("/", { data: "myData" });
    }

    const click = () => {
        document.getElementById('2').click();
    }

    const click2 = () => {
        console.log('22222');
    }

    return (
        <div className='mainContainerStyle'>


            <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Accordion Item #1</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
























            {/* <button id='1' onClick={click}>click</button>
            <button id='2' onClick={click2}>click2</button>
            <Button onClick={postToDB}>Add Data</Button>
            <Button onClick={getFromDB}>Fetch Data</Button>
            <Button onClick={deleteFromDB}>Delete Data</Button>
            <Button onClick={putToDB}>Put Data</Button>

            {/* {dataArray.map(item => {
                return(
                    <div onClick={() => deleteFromDB(item.id)}>
                        <h1>{item.firstname}</h1>
                        <h1>{item.id}</h1>
                    </div>
                );
            })} */}
            {/* <h1 className='titleStyle'>Bugs Manager</h1> */}
            {/* <FadeIn transitionDuration='800' childTag='bodyStyle'> */}
            {/* <div className='bodyStyle'> */}
            {/* {asosData.length !== 0 && asosData.suggestionGroups[0].suggestions.map(item => {
                        return(
                            <div>
                                <h4>{item.searchTerm}</h4>
                                <h4>{item.numberOfResults}</h4>
                            </div>
                        );
                    })} */}
            {/* <Button onClick={addBug} variant="contained" className='addBugBtn'>add new bug</Button>
                    {dataRed.data.length !== 0 &&
                        <div className='bugCardStyle'>
                            <FadeIn transitionDuration='800' childTag='bodyStyle'>
                                <Bug />
                            </FadeIn>
                        </div>
                    }
                </div> */}
            {/* </FadeIn> */}
            {/* <Modal /> */}

            {/* <button onClick={handleClick}>Go to App</button> */}
        </div>
    );
}

export default Main;