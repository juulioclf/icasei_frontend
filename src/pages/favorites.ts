import { addFavorite, countFavorites, removeFavorite } from '../services/favoriteService';
import { renderHeader } from '../components/Header';
import { renderFavoriteVideoList } from '../components/VideoList';
import { getFavorites } from '../services/favoriteService';

let currentPage = 1;

export function renderFavorites() {
    const app = document.getElementById('app') as HTMLElement;
    if (!app) return;

    app.innerHTML = `
        <div class="container">
            ${renderHeader()}
            <div class="videos">
                <h2>Seus vídeos favoritos:</h2>
                <div class="video-list" id="video-list"></div>
                <div class="pagination">
                    <button id="prev-page" onclick="prevPage()">Previous</button>
                    <button id="next-page" onclick="nextPage()">Next</button>
                </div>
            </div>
        </div>
    `;

    fetchAndRenderFavorites();

    (window as any).prevPage = prevPage;
    (window as any).nextPage = nextPage;

    updateFavoriteCount();
}

async function fetchAndRenderFavorites(page = 1) {
    try {
        const data = await getFavorites(page);
        renderFavoriteVideoList(data.favorites);
        currentPage = data.page;
        updatePagination(data.totalPages);
    } catch (error) {
        console.error('Error fetching favorites:', error);
    }
}

function updatePagination(totalPages: number) {
    const prevPageBtn = document.getElementById('prev-page') as HTMLButtonElement;
    const nextPageBtn = document.getElementById('next-page') as HTMLButtonElement;

    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

async function prevPage() {
    if (currentPage > 1) {
        fetchAndRenderFavorites(currentPage - 1);
    }
}

async function nextPage() {
    fetchAndRenderFavorites(currentPage + 1);
}

async function toggleFavorite(videoId: string, isAdding: boolean) {
    try {
        if (isAdding) {
            await addFavorite(videoId);
        } else {
            await removeFavorite(videoId);
        }
        fetchAndRenderFavorites(currentPage);
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
