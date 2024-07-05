import { Video, FavoriteVideo } from '../types/types';

export function renderVideoList(videos: Video[]): string {
    return videos.map(video => `
        <div class="video-item">
            <iframe width="100%" height="200" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen></iframe>
            <div class="video-details">
                <div class="video-title">${video.snippet.title}</div>
                <div class="star ${video.isFavorite ? 'favorited' : ''}" data-video-id="${video.id}" data-is-favorite="${!video.isFavorite}">★</div>
            </div>
        </div>
    `).join('');
}

export function renderFavoriteVideoList(videos: FavoriteVideo[]): string {
    return videos.map(video => `
        <div class="video-item">
            <iframe width="100%" height="200" src="https://www.youtube.com/embed/${video.videoId}" frameborder="0" allowfullscreen></iframe>
            <div class="video-details">
                <div class="video-title">${video.title}</div>
                <div class="favorite-button ${video.isFavorite ? 'favorited' : ''}" data-video-id="${video.videoId}" data-is-favorite="${!video.isFavorite}">★</div>
            </div>
        </div>
    `).join('');
}
