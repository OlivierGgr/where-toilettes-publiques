import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_FAVORITES, readLocallyStoredData } from "../../components/map/utils/map.utils";

export const favoritesSlice = createSlice({
    name: LOCAL_STORAGE_FAVORITES,
    initialState: readLocallyStoredData(),
    reducers: {
        add: (state) => {
            debugger;
            state = readLocallyStoredData();
        },
    },
});

export const { add } = favoritesSlice.actions;

export default favoritesSlice.reducer;
