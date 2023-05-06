export interface ToiletInterface {
    acces_pmr: string;
    adresse: string;
    arrondissement: string;
    horaire: string;
    location: { coordinates: Array<number>; type: string };
    relais_bebe: string | null;
    statut: string | null;
    type: string;
    url_fiche_equipement: null;
    isOpen: boolean;
    isFavorite: boolean;
    hasRelaisBebe: boolean;
    hasAccessPmr: boolean;
    _id: string;
}

export type UserLocation = [number, number] | null;
