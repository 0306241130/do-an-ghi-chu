import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [displayName, setDisplayName] = useState('Sinh viên');
    const [theme, setTheme] = useState('light');

    return (
        <AppContext.Provider
            value={{
                displayName,
                setDisplayName,
                theme,
                setTheme,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}