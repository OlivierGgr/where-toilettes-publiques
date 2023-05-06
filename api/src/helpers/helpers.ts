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

export function formatToiletData(toilet: any, favorites: string): any {
    return toilet.map((t: any) => ({
        ...t._doc,
        hasRelaisBebe: interpretFrStringAsBool(t.relais_bebe),
        hasAccessPmr: interpretFrStringAsBool(t.acces_pmr),
        isOpen: findIfIsWithinOpeningHours(t.horaire),
        isFavorite: (favorites?.split(",") || []).some((f) => f === t._id.toString()),
    }));
}

module.exports = { formatToiletData };
