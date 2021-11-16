import { useContext } from 'react';
import { StoreContext } from '../store/provider/Provider';
import RootStore from '../store/rootStore/Store';
import React, { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export const useStore = (): RootStore => useContext(StoreContext);
