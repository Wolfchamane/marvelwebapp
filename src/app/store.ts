import { configureStore } from '@reduxjs/toolkit'
import favouritesReducer from '../features/favourites/store';

export default configureStore({
    reducer: {
        favourites: favouritesReducer,
    }
})