import React, { useContext, useState } from 'react';
import { UserContext } from './One'

const Three = () => {
    // const {value, temp} = useContext(UserContext);
    // const [tempUser, setTempUser] = value;

    const { user, setUser, temp } = useContext(UserContext);

    const changeHandle = (e) => {
        setUser(e.target.value)
    }

    return (
        <>
            <h1>
                Three, user: {user}, and {temp}
            </h1>
            <input onChange={(e) => changeHandle(e)} />
        </>
    );
}

export default Three;