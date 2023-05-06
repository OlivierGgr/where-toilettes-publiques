import farmerIcon from "../../assets/avatars/8840997891598811062-128.png";

export default function userMarkerFactory(map: any, maps: any, userLocation: any) {
    let marker = new maps.Marker({
        position: { lat: userLocation[1], lng: userLocation[0] },
        map,
        icon: farmerIcon,
        title: "Hello World!",
    });
    return marker;
}
