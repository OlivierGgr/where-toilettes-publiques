import { Badge, Modal, Space } from "antd";
import { LOCAL_STORAGE_FAVORITES, setFavoritesInLocalStorage } from "./utils/map.utils";
import { FileTextOutlined, StarFilled } from "@ant-design/icons";
import { ToiletInterface } from "../../types/types";

type DetailsMapModalProps = {
    markerModalData: ToiletInterface | null;
    setMarkerModalData: (arg: null | any) => void;
    userFavorites: any;
    setUserFavorites: (arg: any) => void;
};

export const DetailsMapModal = ({
    markerModalData,
    setMarkerModalData,
    userFavorites,
    setUserFavorites,
}: DetailsMapModalProps) => {
    if (markerModalData == null) return <></>;

    return (
        <Modal title="Détails" open={markerModalData != null} onCancel={() => setMarkerModalData(null)} footer={null}>
            <Space direction="vertical">
                <Badge text={markerModalData!.horaire} color={markerModalData!.isOpen ? "#52c41a" : "#faad14"} />
                <Badge
                    text={`Accès PMR: ${markerModalData!.acces_pmr}`}
                    color={markerModalData!.hasAccessPmr ? "#52c41a" : "#faad14"}
                />
                <Badge
                    text={`Relais bébé: ${markerModalData!.relais_bebe ?? "Non-renseigné"}`}
                    color={markerModalData!.hasRelaisBebe ? "#52c41a" : "#faad14"}
                />
                <p className="type">Type: {markerModalData.type}</p>
                <p className="adress">
                    {markerModalData.adresse} - {markerModalData.arrondissement}
                </p>

                <Space direction="horizontal" size={50}>
                    {markerModalData.url_fiche_equipement && (
                        <a href={markerModalData.url_fiche_equipement} referrerPolicy="no-referrer" target="_blank">
                            <Space direction="vertical" align="center">
                                <button className="button">
                                    <FileTextOutlined />
                                    <br />
                                </button>
                                Fiche
                            </Space>
                        </a>
                    )}

                    <Space
                        direction="vertical"
                        align="center"
                        className={
                            userFavorites.find((fav: string) => fav === markerModalData._id)
                                ? "favorite is-favorite"
                                : "favorite"
                        }
                    >
                        <button className="button" onClick={() => setFavoritesInLocalStorage(userFavorites, markerModalData, setUserFavorites)}>
                            <StarFilled />
                            <br />
                        </button>
                        Favori
                    </Space>
                </Space>
            </Space>
        </Modal>
    );
};

export default DetailsMapModal;
