import { LayoutPropsLib } from '@/lib/utils/definitions';
import React, { createContext, useContext, useState } from 'react';

// Define la forma delestado
interface GlobalState {
    id: number;
}

// Proporciona un valor predeterminado
const defaultState: GlobalState = { id: 0 };

// Crea el contexto
const GlobalContext = createContext<{
    state: GlobalState;
    updateId: (id: number) => void;
} | undefined>(undefined);



export const GlobalProvider = ({ children }: LayoutPropsLib) => {
    const [state, setState] = useState<GlobalState>(defaultState);
    
    const updateId = (id: number) => {
        setState({ ...state, id });
    };

    return (
        <GlobalContext.Provider value={{ state, updateId }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Hook para usar el contexto
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};
