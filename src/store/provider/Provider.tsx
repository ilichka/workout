import React, { createContext } from 'react';
import store from '../store';

type Props = {
    children: React.ReactChild;
};

export const StoreContext = createContext(store);

export const Provider: React.FC<Props> = ({ children }) => {
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
