import { renderHeader } from '../components/Header';
import { renderSearchBar } from '../components/SearchBar';
import { renderVideoList, renderFavoriteVideoList } from '../components/VideoList';
import { renderPagination } from '../components/Pagination';
import { addFavorite, countFavorites, removeFavorite } from '../services/favoriteService';
import { searchVideos } from '../services/videoService';
import { Video, FavoriteVideo } from '../types/types';
import { logout } from '../services/authService';

let nextPageToken = '';
let prevPageToken = '';

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
                <div id="loading" class="loading">Loading...</div> <!-- Elemento de loading -->
                <div class="video-list" id="video-list"></div>
                ${renderPagination()}
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
    } catch (error) {
        console.error('Error searching videos:', error);
    } finally {
        hideLoading();
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

async function toggleFavorite(videoId: string, isAdding: boolean): Promise<void> {
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

function handleFavoriteToggle(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('star') || target.classList.contains('favorite-button')) {
        const videoId = target.getAttribute('data-video-id') || '';
        const isFavorite = target.getAttribute('data-is-favorite') === 'true';
        
        toggleFavorite(videoId, isFavorite);
        
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
