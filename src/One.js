import React, { useState, createContext } from 'react';
import Two from './Two';

export const UserContext = createContext();

const One = () => {
    const [user, setUser] = useState('Dor Cohen');
    const temp = 'this is temp';

    const value = {
        user,
        setUser,
        temp
    }
    // value={{ value: [user, setUser], temp: temp}}
    return (
        <UserContext.Provider value={value}>
            <h1>
                One, user: {user}
                <Two />
            </h1>
        </UserContext.Provider>
    );
}

export default One;