import { ToiletInterface } from "../../types/types";

export default function toiletsMarkerFactory(
    map: any,
    maps: any,
    toiletLocations: ToiletInterface[],
    setMarkerModalData: (arg: ToiletInterface) => void
) {
    return toiletLocations.map((loc: any) => {
        let marker = new maps.Marker({
            position: { lat: loc.location.coordinates[1], lng: loc.location.coordinates[0] },
            map,
            title: `${loc.adresse} - ${loc.arrondissement}`,
            onClick: () => console.log(loc),
        });

        marker.addListener("click", () => {
            setMarkerModalData(loc);
        });

        return marker;
    });
}
