export const nonNullBackdrop = (item: any[]) => {
    const firstNonNullBackdrop = item.find((item: { backdrop_path: null }) => item.backdrop_path !== null);
    return firstNonNullBackdrop ? firstNonNullBackdrop.backdrop_path : "No Image Available";
};
