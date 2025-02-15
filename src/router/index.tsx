import { Route, BrowserRouter as Router, Routes } from 'react-router';
import { CHARACTER_DETAILS_PATH, CharacterDetail } from '../features/character-detail';
import { CHARACTERS_ROUTE_PATH, CharactersPage } from '../features/characters';

export function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path={CHARACTERS_ROUTE_PATH} element={<CharactersPage />} />
				<Route path={CHARACTER_DETAILS_PATH} element={<CharacterDetail />} />
			</Routes>
		</Router>
	);
}
