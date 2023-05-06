import { ADD_IN_LOCAL_STORAGE } from "./actionTypes";

export const addToiletInLocalStorage = (toiletId: string) => ({
    type: ADD_IN_LOCAL_STORAGE,
    data: toiletId,
});
