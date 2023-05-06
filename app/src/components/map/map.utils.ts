export const LOCAL_STORAGE_FAVORITES = "favorites";

export function readLocallyStoredData(): string[] | null {
    const favoritesInLocalStorage = localStorage.getItem(LOCAL_STORAGE_FAVORITES);
    if (favoritesInLocalStorage == null) return [];
    return JSON.parse(atob(favoritesInLocalStorage)) ?? [];
}
