import Loader from "../Loader";
import { useState } from "react";
import GoogleMapReact from "google-map-react";
import userMarkerFactory from "./userMakerFactory";
import toiletsMarkerFactory from "./toiletsMarkerFactory";
import DetailsMapModal from "./DetailsMapModal";

import { ToiletInterface } from "../../types/types";
import "./map.css";
import "../../index.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import UserModal from "../user/UserModal";

interface MapProps {
    toiletLocations: any[];
    userLocation: any | null;
    isLoading: boolean;
    isToiletsLocationLoading: boolean;
}

const Map = ({ toiletLocations, userLocation, isLoading, isToiletsLocationLoading }: MapProps): JSX.Element => {
    const favorites = useSelector((state: RootState) => state.favorites);

    const [markerModalData, setMarkerModalData] = useState<ToiletInterface | null>(null);
    const [userFavorites, setUserFavorites] = useState(favorites);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    if (isLoading || isToiletsLocationLoading) return <Loader />;
    const defaultCenter = userLocation ? { lat: userLocation?.[1], lng: userLocation?.[0] } : { lat: 48.5, lng: 2.4 };

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCm1EsMPI2vS2i3H0czURg1kON3tXZbZy4" }}
                defaultCenter={defaultCenter}
                defaultZoom={16}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => {
                    return [
                        userMarkerFactory(map, maps, userLocation, setIsUserModalOpen),
                        toiletsMarkerFactory(map, maps, toiletLocations, setMarkerModalData),
                    ];
                }}
            ></GoogleMapReact>
            <DetailsMapModal
                markerModalData={markerModalData}
                setMarkerModalData={setMarkerModalData}
                userFavorites={userFavorites}
                setUserFavorites={setUserFavorites}
            />

            <UserModal 
                isUserModalOpen={isUserModalOpen}
                setIsUserModalOpen={setIsUserModalOpen}
                />
        </div>
    );
};

export default Map;
