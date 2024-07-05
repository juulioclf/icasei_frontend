import { renderSignup } from '../components/SignUp';
import { renderHome } from '../pages/login';
import { renderFavorites } from '../pages/favorites';
import { isAuthenticated } from '../services/authService';
import { renderVideos } from '../pages/home';

// Definindo um tipo para as rotas
type RouteKey = '/' | '/signup' | '/home' | '/favorites';

function navigateTo(path: string) {
  window.history.pushState({}, '', path);
  const event = new PopStateEvent('popstate');
  window.dispatchEvent(event);
}

(window as any).navigateTo = navigateTo;

const routes: Record<RouteKey, () => void> = {
  '/': () => {
    if (isAuthenticated()) {
      navigateTo('/home');
    } else {
      renderHome();
    }
  },
  '/signup': renderSignup,
  '/home': renderVideos,
  '/favorites': renderFavorites,
};

export function initRouter() {
  window.addEventListener('popstate', () => {
    const path = window.location.pathname as RouteKey;
    if (routes[path]) {
      routes[path]();
    } else {
      console.error(`Rota não encontrada: ${path}`);
    }
  });

  document.body.addEventListener('click', (event) => {
    const target = event.target as HTMLAnchorElement;
    if (target.tagName === 'A' && target.href) {
      event.preventDefault();
      const path = target.getAttribute('href') as RouteKey;
      window.history.pushState({}, '', target.href);
      if (routes[path]) {
        routes[path]();
      } else {
        console.error(`Rota não encontrada: ${path}`);
      }
    }
  });

  const path = window.location.pathname as RouteKey;
  if (routes[path]) {
    routes[path]();
  } else {
    console.error(`Rota não encontrada: ${path}`);
  }
}


