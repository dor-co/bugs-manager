import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useStore } from "react-redux";
import './App.css';

function Second() {
    const [sliderValue, setSliderValue] = useState(0);
    const modalRed = useSelector((state) => state.ModalReducer);

    const history = useHistory();
    const myData = history.location.state?.data;

    const use = useStore();

    console.log(myData);
    console.log(modalRed);
    console.log('useStore', use.getState());
    console.log('and this is the data from submit', use.getState().NameReducer);

    function handleClick() {
        history.push("/", { data: "myData" });
    }

    const sliderChange = (e) => {
        setSliderValue(e.target.value);
    }

    return (
        <div className="App">
            <button onClick={handleClick}>Go to App</button>
            <h3>The name that I was submit is: {use.getState().NameReducer.first + ' ' + use.getState().NameReducer.last}</h3>

            <div style={{marginLeft: 200, marginRight: 200}}>
                <input className='inini' style={{padding: 0}} value={sliderValue} type='range' min='0' max='100' step='1' onChange={sliderChange} />
                <h2>{sliderValue}</h2>
            </div>
        </div>
    );
}

export default Second