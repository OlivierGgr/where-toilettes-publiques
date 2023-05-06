export const adaptMapSizeOnSiderCollapse = (collapsed: boolean): void => {
    collapsed
        ? document.documentElement.style.setProperty("--map-width-big-screen", "95%")
        : document.documentElement.style.setProperty("--map-width-big-screen", "100%");
};

export function cssValue(property: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(property);
}
