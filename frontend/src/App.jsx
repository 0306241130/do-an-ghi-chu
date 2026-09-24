import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './Home';
import Settings from './Settings';
import Private from './Private';
import { AppProvider } from './context/AppContext';

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>

                    <Route element={<Layout />}>

                        <Route
                            path="/"
                            element={<Home />}
                        />

                        <Route
                            path="/settings"
                            element={<Settings />}
                        />

                        <Route
                            path="/private"
                            element={<Private />}
                        />

                    </Route>

                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;