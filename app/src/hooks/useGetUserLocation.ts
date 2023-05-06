import { useEffect, useState } from "react";
import { UserLocation } from "../types/types";

export default function useGetUserLocation() {
    const [userLocation, setUserLocation] = useState<UserLocation>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setIsLoading(true);
        getLocation();
    }, []);

    const getLocation = async () => {
        return new Promise(() => {
            if (!navigator.geolocation) {
                setError("Geolocation is not supported by your browser");
            }
            const successCallback = (position: GeolocationPosition) => {
                setUserLocation([position.coords.longitude, position.coords.latitude]);
                setIsLoading(false);
            };

            const errorCallback = (error: GeolocationPositionError) => {
                setError(error.message);
            };

            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
            return null;
        });
    };

    return { userLocation, isLoading, isError: error.length, error };
}
