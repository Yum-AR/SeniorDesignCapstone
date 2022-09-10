// src/context/state.js
import { createContext, useContext, useState } from 'react';

//CREATES A GLOBAL FUNCTIONALITY
const ActiveRestaurantContext = createContext();
const UpdateActiveRestaurantContext = createContext();

export function useActiveRestaurantContext() {
    return useContext(ActiveRestaurantContext);
}

export function useUpdateActiveRestaurantContext() {
    return useContext(UpdateActiveRestaurantContext);
}

//CHILDREN IS ALL OF THE COMPONENTS UNDERNEATH THIS
export default function ActiveRestaurantContextProvider({ children }) {
    const [activeRestaurant, setActiveRestaurant] = useState()

    //PASS FETCHED RESTAURANT DATA FROM DIFFERENT COMPONENT TO SET THE STATE GLOBALLY
    function updateRestaurant(active) {
        setActiveRestaurant(active)
    }

    return (
        <ActiveRestaurantContext.Provider value={activeRestaurant}>
            <UpdateActiveRestaurantContext.Provider value={updateRestaurant}>
                {children}
            </UpdateActiveRestaurantContext.Provider>
        </ActiveRestaurantContext.Provider>
    );
}
