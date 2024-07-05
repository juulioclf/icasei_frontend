import { addFavorite, countFavorites, removeFavorite } from "../services/favoriteService";

type Video = {
    id: string;
    snippet: {
        title: string;
    };
    isFavorite: boolean;
};

type FavoriteVideo = {
    id: string;
    videoId: string;
    title: string;
    isFavorite: boolean;
};

export function renderVideoList(videos: Video[]) {
    const videoList = document.getElementById('video-list') as HTMLElement;
    if (!videoList) return;

    videoList.innerHTML = videos.map(video => `
        <div class="video-item">
            <iframe width="100%" height="200" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen></iframe>
            <div class="video-details">
                <div class="video-title">${video.snippet.title}</div>
                <div class="star ${video.isFavorite ? 'favorited' : ''}" onclick="toggleFavorite('${video.id}', ${!video.isFavorite})"></div>
            </div>
        </div>
    `).join('');
}

export function renderFavoriteVideoList(videos: FavoriteVideo[]) {
    const videoList = document.getElementById('video-list') as HTMLElement;
    if (!videoList) return;

    videoList.innerHTML = videos.map(video => `
        <div class="video-item">
            <iframe width="100%" height="200" src="https://www.youtube.com/embed/${video.videoId}" frameborder="0" allowfullscreen></iframe>
            <div class="video-details">
                <div class="video-title">${video.title}</div>
                <div class="favorite-button ${video.isFavorite ? 'favorited' : ''}" onclick="toggleFavorite('${video.videoId}', ${!video.isFavorite})">⭐</div>
            </div>
        </div>
    `).join('');
}

async function toggleFavorite(videoId: string, isAdding: boolean) {
    try {
        if (isAdding) {
            await addFavorite(videoId);
        } else {
            await removeFavorite(videoId);
        }
        updateFavoriteCount();
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}

function updateFavoriteCount() {
    const favoriteCount = document.getElementById('favorite-count') as HTMLElement;
    if (!favoriteCount) return;

    countFavorites()
        .then(count => {
            favoriteCount.textContent = count.toString();
        })
        .catch(error => {
            console.error('Error updating favorite count:', error);
        });
}


