import { createSlice } from '@reduxjs/toolkit';

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState : {
        value: []
    },
    reducers: {
        addToFavourites : (state, action) => {
            debugger;
            console.log(state);
            console.log(action);
            const { payload } = action;
            const { id } = payload;
            state.value.push(id);
        },
        removeFromFavourites: (state, action) => {
            debugger;
            console.log(state);
            console.log(action);
            const { payload } = action;
            const { id } = payload;
            state.value.splice(state.value.indexOf(id), 1);
        }
    }
});

export const ACTION_ADD_TO_FAVOURITES:string = 'ADD_TO_FAVOURITES';
export const ACTION_REMOVE_FROM_FAVOURITES: string = 'REMOVE_FROM_FAVOURITES';

export function addToFavouritesAction(id: number) {
    return {
        type: ACTION_ADD_TO_FAVOURITES,
        id,
    };
}
export function removeFromFavouritesAction(id: number) {
    return {
        type: ACTION_REMOVE_FROM_FAVOURITES,
        id,
    };
}

export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;