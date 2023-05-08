function interpretFrStringAsBool(string: string): boolean {
    if (string == null) return false;
    switch (string.toLowerCase()) {
        case "oui":
            return true;
        case "non":
            return false;
        default:
            return false;
    }
}

function findIfIsWithinOpeningHours(time: string): boolean {
    switch (time.replace(/\s/g, "")) {
        case "6h-22h":
            return new Date().getHours() > 6 && new Date().getHours() < 22;
        case "24h/24":
            return true;
        default:
            return false;
    }
}

function findBoolFromString(string: string | undefined) {
    if (string == null) return false;

    if (string === "true") {
        return true;
    } else if (string === "false") {
        return false;
    }
}

function filterToilets(
    toilet: any,
    favoritesArr: string[],
    favoritesOnly?: string | undefined,
    openOnly?: string | undefined
) {
    let filteredToilets = toilet;

    if (findBoolFromString(favoritesOnly)) {
        filteredToilets = toilet.filter((t: any) => (favoritesArr || []).some((f) => f === t._id.toString()));
    }
    if (findBoolFromString(openOnly)) {
        filteredToilets = filteredToilets.filter((t: any) => findIfIsWithinOpeningHours(t.horaire));
    }

    return filteredToilets;
}

export function formatToiletData(
    toilet: any,
    favorites: string,
    favoritesOnly: string | undefined,
    openOnly: string | undefined
): any {
    const favoritesArr = favorites?.split(",");

    let resToilet = filterToilets(toilet, favoritesArr, favoritesOnly, openOnly);

    return resToilet.map((t: any) => ({
        ...t._doc,
        hasRelaisBebe: interpretFrStringAsBool(t.relais_bebe),
        hasAccessPmr: interpretFrStringAsBool(t.acces_pmr),
        isOpen: findIfIsWithinOpeningHours(t.horaire),
        isFavorite: (favoritesArr || []).some((f) => f === t._id.toString()),
    }));
}

module.exports = { formatToiletData };
