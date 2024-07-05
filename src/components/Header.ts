import { logout } from '../services/authService';

export function renderHeader() {
    return `
        <div class="drawer">
            <div class="drawer-links">
                <button class="drawer-button" onclick="navigateTo('/home')">Vídeos</button>
                <button class="drawer-button" onclick="navigateTo('/favorites')">Favoritos<span class="favorite-count"></span></button>
            </div>
            <button id="logout-button" class="drawer-button">Logout</button>
        </div>
    `;
}

export function handleLogout() {
    logout();
    history.pushState({}, '', '/login');
    const popStateEvent = new PopStateEvent('popstate');
    window.dispatchEvent(popStateEvent);
}
