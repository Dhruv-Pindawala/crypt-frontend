import React, {createContext, useReducer} from 'react';

const reduceReducers = (...reducers) => (prevState, value, ...args) => {
    reducers.reduce(
        (newState, reducer) => reducer(newState, value, ...args), prevState
    );
};

const combinedReducers = reduceReducers();

const initialState = {};

const store = createContext(initialState);
const {Provider} = store;

const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(combinedReducers, initialState);

    return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export { store, StoreProvider };