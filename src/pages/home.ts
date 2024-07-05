import { renderHeader } from '../components/Header';
import { renderVideoList } from '../components/VideoList';
import { addFavorite, countFavorites, removeFavorite } from '../services/favoriteService';
import { searchVideos } from '../services/videoService';

let nextPageToken = '';
let prevPageToken = '';

export function renderVideos() {
    const app = document.getElementById('app') as HTMLElement;
    if (!app) return;

    app.innerHTML = `
        <div class="container">
            ${renderHeader()}
            <div class="videos">
                <h2>Procure por seus vídeos:</h2>
                <div class="search-bar">
                    <input type="text" id="search-input" placeholder="Pesquisar">
                    <button class="search-button" onclick="search()">🔍</button>
                </div>
                <div class="video-list" id="video-list"></div>
                <div class="pagination">
                    <button id="prev-page" onclick="prevPage()">Previous</button>
                    <button id="next-page" onclick="nextPage()">Next</button>
                </div>
            </div>
        </div>
    `;

    (window as any).search = search;
    (window as any).prevPage = prevPage;
    (window as any).nextPage = nextPage;

    updateFavoriteCount();
}

async function search() {
    const query = (document.getElementById('search-input') as HTMLInputElement).value;
    if (!query) return;

    try {
        const result = await searchVideos(query, '');
        renderVideoList(result.videos);
        nextPageToken = result.nextPageToken;
        prevPageToken = result.prevPageToken;
    } catch (error) {
        console.error('Error searching videos:', error);
    }
}

async function prevPage() {
    if (!prevPageToken) return;
    const query = (document.getElementById('search-input') as HTMLInputElement).value;
    try {
        const result = await searchVideos(query, prevPageToken);
        renderVideoList(result.videos);
        nextPageToken = result.nextPageToken;
        prevPageToken = result.prevPageToken;
    } catch (error) {
        console.error('Error fetching previous page:', error);
    }
}

async function nextPage() {
    if (!nextPageToken) return;
    const query = (document.getElementById('search-input') as HTMLInputElement).value;
    try {
        const result = await searchVideos(query, nextPageToken);
        renderVideoList(result.videos);
        nextPageToken = result.nextPageToken;
        prevPageToken = result.prevPageToken;
    } catch (error) {
        console.error('Error fetching next page:', error);
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
