import { renderHeader } from '../components/Header';
import { renderSearchBar } from '../components/SearchBar';
import { renderVideoList } from '../components/VideoList';
import { addFavorite, countFavorites, removeFavorite } from '../services/favoriteService';
import { searchVideos } from '../services/videoService';
import { logout } from '../services/authService';

let nextPageToken = '';
let prevPageToken = '';
let hasData = false;

function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('active');
    }
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.remove('active');
    }
}

export function renderVideos(): void {
    const app = document.getElementById('app') as HTMLElement;
    if (!app) return;

    app.innerHTML = `
        <div class="container">
            ${renderHeader()}
            <div class="videos">
                <h2>Procure por seus vídeos:</h2>
                ${renderSearchBar()}
                <div id="loading" class="loading">Loading...</div>
                <div class="video-list" id="video-list"></div>
                <div class="pagination" id="pagination" style="display: none;">
                    <button id="prev-page">Previous</button>
                    <button id="next-page">Next</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('search-button')?.addEventListener('click', search);
    document.getElementById('prev-page')?.addEventListener('click', prevPage);
    document.getElementById('next-page')?.addEventListener('click', nextPage);
    document.addEventListener('click', handleFavoriteToggle);
    document.getElementById('logout-button')?.addEventListener('click', handleLogout);

    updateFavoriteCount();
}

async function search(): Promise<void> {
    const query = (document.getElementById('search-input') as HTMLInputElement).value;
    if (!query) return;

    showLoading();
    try {
        const result = await searchVideos(query, '');
        const videoList = document.getElementById('video-list') as HTMLElement;
        videoList.innerHTML = renderVideoList(result.videos);
        nextPageToken = result.nextPageToken;
        prevPageToken = result.prevPageToken;
        hasData = result.videos.length > 0;
        updatePaginationVisibility();
    } catch (error) {
        console.error('Error searching videos:', error);
    } finally {
        hideLoading();
    }
}

function updatePaginationVisibility(): void {
    const pagination = document.getElementById('pagination') as HTMLElement;
    if (pagination) {
        pagination.style.display = hasData ? 'flex' : 'none';
    }
}

async function prevPage(): Promise<void> {
    if (!prevPageToken) return;
    const query = (document.getElementById('search-input') as HTMLInputElement).value;
    try {
        const result = await searchVideos(query, prevPageToken);
        const videoList = document.getElementById('video-list') as HTMLElement;
        videoList.innerHTML = renderVideoList(result.videos);
        nextPageToken = result.nextPageToken;
        prevPageToken = result.prevPageToken;
    } catch (error) {
        console.error('Error fetching previous page:', error);
    }
}

async function nextPage(): Promise<void> {
    if (!nextPageToken) return;
    const query = (document.getElementById('search-input') as HTMLInputElement).value;
    try {
        const result = await searchVideos(query, nextPageToken);
        const videoList = document.getElementById('video-list') as HTMLElement;
        videoList.innerHTML = renderVideoList(result.videos);
        nextPageToken = result.nextPageToken;
        prevPageToken = result.prevPageToken;
    } catch (error) {
        console.error('Error fetching next page:', error);
    }
}

async function toggleFavorite(videoId: string): Promise<void> {
    try {

        await addFavorite(videoId);
        updateFavoriteCount();

    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}

function handleFavoriteToggle(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('favorite-button')) {
        const videoId = target.getAttribute('data-video-id') || '';
        const isFavorite = target.getAttribute('data-is-favorite') === 'true';
        
        toggleFavorite(videoId);

        target.classList.toggle('favorited', isFavorite);
        target.setAttribute('data-is-favorite', String(!isFavorite));
    }
}

function updateFavoriteCount(): void {
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

function handleLogout(): void {
    logout();
    history.pushState({}, '', '/login');
    const popStateEvent = new PopStateEvent('popstate');
    window.dispatchEvent(popStateEvent);
}
