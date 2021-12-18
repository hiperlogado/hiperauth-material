import { createContext, useState, useEffect } from 'react';

const NavContext = createContext();

export const NavProvider = ({children}) => {

    const[section,setSection] = useState('login');

    return (
        <NavContext.Provider value={{
            section, setSection
        }}>
            {children}
        </NavContext.Provider>
    )

}

export const NavConsumer = NavContext.Consumer;

export default NavContext;
