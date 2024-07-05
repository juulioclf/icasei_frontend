export type Video = {
    id: string;
    snippet: {
        title: string;
    };
    isFavorite: boolean;
};

export type FavoriteVideo = {
    id: string;
    videoId: string;
    title: string;
    isFavorite: boolean;
};
