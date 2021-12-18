import { useContext } from 'react';
import NavContext from '../contexts/NavContexts';

export function useNav() {
    const value = useContext(NavContext);
    return value;
}