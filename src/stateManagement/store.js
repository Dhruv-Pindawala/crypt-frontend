import React, {createContext, useReducer} from 'react';

const store = createContext({});
const {Provider} = store;

const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(() => {}, {});

    return <Provider value={{state, dispatch}}>{children}</Provider>;
};
