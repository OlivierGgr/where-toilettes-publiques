import { FilterProps } from "./components/sider/Sider";
import { UserLocation } from "./types/types";

export const buildSearchParams = (
    userLocation?: UserLocation,
    maxDistance?: number,
    favorites?: any,
    filters?: FilterProps
) => {
    const searchParams = new URLSearchParams();
    // @ts-ignore
    userLocation && searchParams.append("userLocation", userLocation);
    maxDistance && searchParams.append("maxDistance", maxDistance.toString());
    favorites && searchParams.append("favorites", favorites.toString());

    for (const filter in filters) {
        if (filters[filter as keyof FilterProps]) {
            searchParams.append(filter, "true");
        }
    }

    return searchParams;
};
