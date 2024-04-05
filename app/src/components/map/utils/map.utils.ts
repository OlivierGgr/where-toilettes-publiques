export const LOCAL_STORAGE_FAVORITES = "favorites";

export function readLocallyStoredData(): string[] | null {
    const favoritesInLocalStorage = localStorage.getItem(LOCAL_STORAGE_FAVORITES);
    if (favoritesInLocalStorage == null) return [];
    return JSON.parse(atob(favoritesInLocalStorage)) ?? [];
}

export function setFavoritesInLocalStorage(userFavorites: any, markerModalData: any, setter: (arg0: any) => void) {
    try {
        if (userFavorites == null) {
            localStorage.setItem(LOCAL_STORAGE_FAVORITES, btoa(JSON.stringify(markerModalData._id)));
            return;
        }

        const favoritesInLocalStorageUpdated = Array.isArray(userFavorites)
            ? [...userFavorites, markerModalData._id]
            : [userFavorites, markerModalData._id];

        localStorage.setItem(LOCAL_STORAGE_FAVORITES, btoa(JSON.stringify(favoritesInLocalStorageUpdated)));
        return;
    } catch (error) {
        console.error(error);
    } finally {
        setter((old: any) => [...old, markerModalData._id]);
    }
};