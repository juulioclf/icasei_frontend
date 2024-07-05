import { addFavorite, countFavorites, removeFavorite, getFavorites } from '../services/favoriteService';
import { renderHeader } from '../components/Header';
import { renderFavoriteVideoList } from '../components/FavoriteList';
import { renderPagination } from '../components/Pagination';

let currentPage = 1;
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

export function renderFavorites(): void {
    const app = document.getElementById('app') as HTMLElement;
    if (!app) return;

    app.innerHTML = `
        <div class="container">
            ${renderHeader()}
            <div class="videos">
                <h2>Seus vídeos favoritos:</h2>
                <div id="loading" class="loading">Loading...</div>
                <div class="video-list" id="video-list"></div>
                ${renderPagination()}
            </div>
        </div>
    `;

    document.getElementById('prev-page')?.addEventListener('click', prevPage);
    document.getElementById('next-page')?.addEventListener('click', nextPage);
    document.addEventListener('click', handleFavoriteToggle);

    fetchAndRenderFavorites();
    updateFavoriteCount();
}

async function fetchAndRenderFavorites(page = 1): Promise<void> {
    showLoading();
    try {
        const data = await getFavorites(page);
        const videoList = document.getElementById('video-list') as HTMLElement;
        videoList.innerHTML = renderFavoriteVideoList(data.favorites);
        currentPage = data.page;
        updatePagination(data.totalPages);
    } catch (error) {
        console.error('Error fetching favorites:', error);
    } finally {
        hideLoading();
    }
}

function updatePagination(totalPages: number): void {
    const prevPageBtn = document.getElementById('prev-page') as HTMLButtonElement;
    const nextPageBtn = document.getElementById('next-page') as HTMLButtonElement;

    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

async function prevPage(): Promise<void> {
    if (currentPage > 1) {
        await fetchAndRenderFavorites(currentPage - 1);
    }
}

async function nextPage(): Promise<void> {
    await fetchAndRenderFavorites(currentPage + 1);
}

async function toggleFavorite(videoId: string): Promise<void> {
    try {
        await removeFavorite(videoId);

        await fetchAndRenderFavorites(currentPage);
        updateFavoriteCount();
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}

function handleFavoriteToggle(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('favorite-button')) {
        const videoId = target.getAttribute('data-video-id') || '';
        toggleFavorite(videoId);
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
