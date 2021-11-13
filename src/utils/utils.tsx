import { useContext } from 'react';
import { StoreContext } from '../store/provider/Provider';
import RootStore from '../store/rootStore/Store';
import React, { useState, useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            savedCallback.current();
        }
        if (delay !== null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export const useStore = (): RootStore => useContext(StoreContext);
