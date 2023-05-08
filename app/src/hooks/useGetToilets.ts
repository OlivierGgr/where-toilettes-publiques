import { useEffect, useState } from "react";
import { getNearbyToilets } from "../api";
import { ToiletInterface } from "../types/types";
import { FilterProps } from "../components/sider/Sider";
import { readLocallyStoredData } from "../components/map/map.utils";

export default function useGetToilets(userLocation: any, filters: FilterProps) {
    const [toiletLocations, setToiletLocations] = useState<ToiletInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const favorites = readLocallyStoredData();

    useEffect(() => {
        setIsLoading(true);
        if (userLocation) fetchToiletLocations();
    }, [userLocation, filters]);

    const fetchToiletLocations = async () => {
        try {
            setToiletLocations(await getNearbyToilets(userLocation, 1000, favorites ?? void 0, filters));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { toiletLocations, isLoading };
}
