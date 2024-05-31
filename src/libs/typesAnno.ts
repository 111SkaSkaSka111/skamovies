export interface User {
    name: string;
    email: string;
    image: string;
}

export interface IdPageProps {
    apiData: any;
    type: string;
    user: User;
    favorites: any;
}

export interface IdPageFavorites {
    engTitle: string;
    apiData: any;
    user: User;
    type: string;
}

export interface NavbarAction {
    link: string;
    teks: string;
    user: User;
}

export interface DashboardFavoritesProps {
    favorites: any;
    favoritesCount: number;
    type: string | undefined;
    tvCount: number;
    movieCount: number;
}
