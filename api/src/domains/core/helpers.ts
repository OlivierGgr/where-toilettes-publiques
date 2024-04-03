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

export { interpretFrStringAsBool };