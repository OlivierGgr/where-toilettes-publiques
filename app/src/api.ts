import axios from "axios";
import { buildSearchParams } from "./api.utils";
import { UserLocation } from "./types/types";
import { FilterProps } from "./components/sider/Sider";

const DB_URL = "http://localhost:3001/toilets";

export const getToilets = async () => {
    try {
        const toilets = (await axios.get(DB_URL))?.data?.toilets;
        return toilets;
    } catch (error) {
        console.error(error);
    }
};

export const getNearbyToilets = async (
    userLocation?: UserLocation,
    maxDistance?: number,
    favorites?: Array<string>,
    filters?: FilterProps
) => {
    try {
        const searchParams = buildSearchParams(userLocation, maxDistance, favorites, filters);

        const toilets = (await axios.get(`${DB_URL}/nearby?${searchParams}`))?.data?.toilets;
        return toilets;
    } catch (error) {
        console.error(error);
    }
};
