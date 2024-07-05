export function renderSearchBar(): string {
    return `
        <div class="search-bar">
            <input type="text" id="search-input" placeholder="Pesquisar">
            <button class="search-button" id="search-button">🔍</button>
        </div>
    `;
}
