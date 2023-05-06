import Map from "./map/Map";
import Sider, { FilterProps } from "./sider/Sider";
import useGetUserLocation from "../hooks/useGetUserLocation";
import useGetToilets from "../hooks/useGetToilets";
import { Layout as AntdLayout } from "antd";
import { useState } from "react";

const Layout = (): JSX.Element => {
    const [filters, setFilters] = useState<FilterProps>({
        isFavorites: false,
        isOpen: false,
    });

    const { userLocation, isLoading } = useGetUserLocation();
    const { toiletLocations, isLoading: isToiletsLocationLoading } = useGetToilets(userLocation, filters);

    return (
        <AntdLayout style={{ minHeight: "100vh", background: "#A9CEF4" }}>
            <Sider filters={filters} setFilters={setFilters} />
            <Map
                toiletLocations={toiletLocations}
                userLocation={userLocation}
                isLoading={isLoading}
                isToiletsLocationLoading={isToiletsLocationLoading}
            />
        </AntdLayout>
    );
};

export default Layout;
