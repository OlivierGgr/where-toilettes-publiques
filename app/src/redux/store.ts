import { configureStore } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_FAVORITES } from "../components/map/map.utils";
import favoritesSlice from "./reducers/favoritesSlice";

const store = configureStore({
    reducer: {
        [LOCAL_STORAGE_FAVORITES]: favoritesSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
