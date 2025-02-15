import { BrowserRouter as Router, Route, Routes } from 'react-router'
import { CHARACTERS_ROUTE_PATH, CharactersPage } from "../features/characters";

export function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path={CHARACTERS_ROUTE_PATH} element={<CharactersPage />} />
            </Routes>
        </Router>
    )
}