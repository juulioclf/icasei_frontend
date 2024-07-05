export function renderHeader() {
    return `
        <div class="drawer">
            <div class="drawer-links">
                <button class="drawer-button" onclick="navigateTo('/home')">Vídeos</button>
                <button class="drawer-button" onclick="navigateTo('/favorites')">Favoritos<span class="favorite-count"></span></button>
            </div>
        </div>
    `;
}