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
import axios from 'axios';

function Main() {

    const [dataArray, setDataArray] = useState(false);
    const [data, setData] = useState([]);

    const get = async () => {
        console.log('loaded data main:');

        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=446a3341cdcb176c41d6d6cfde13d33a');
        const data = await response.json();
        // const loadedData = [];

        // for (const key in data) {
        //     loadedData.push({
        //         id: key,
        //         title: data[key].title,
        //         description: data[key].description,
        //         status: data[key].status,
        //         critical: data[key].critical
        //     });
        // }

        setDataArray(data.results);
    }


    useEffect(() => {
        get();
    }, [])


    const postToDB = async () => {
        axios.post('https://api.themoviedb.org/3/movie/popular?api_key=446a3341cdcb176c41d6d6cfde13d33a', 
            {
                adult: false,
                backdrop_path: "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
                genre_ids: [28, 12, 878],
                id: 634649,
                original_language: "en",
                original_title: "Spider-Man: No Way Home",
                overview: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
                popularity: 15424.687,
                poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
                release_date: "2021-12-15",
                title: "test!",
                video: false,
                vote_average: 8.4,
                vote_count: 7014
            }
        )
            .then((response) => {
                console.log(response.data.results);
            }).catch((error) => {
                console.log(error);
            });

        // const response = await fetch('https://bugsmanager-9d88c-default-rtdb.firebaseio.com/bugs.json', {
        //     method: 'POST',
        //     body: JSON.stringify({ critical: 'test', description: 'test', status: 'test', title: 'test' }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });

        // const data = await response.json();

        // console.log('post data:', data);
        // get();
    };

    console.log(dataArray)

    return (
        <div className='mainContainerStyle'>
            {!dataArray ? (
                <h1>no data</h1>
            ) : (
                <>
                    <button onClick={() => postToDB()}>post</button>
                    {dataArray?.map((item, i) => {
                            return (
                                <div>
                                    <h1 style={{fontSize: 18}}>{item.title}</h1>
                                </div>
                            );
                    })}
                </>
            )}
        </div>
    );
}

export default Main;