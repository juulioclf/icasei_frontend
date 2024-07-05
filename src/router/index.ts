import { isAuthenticated } from '../services/authService';

import { renderLogin } from '../pages/login';
import { renderFavorites } from '../pages/favorites';
import { renderVideos } from '../pages/home';
import { renderSignup } from '../pages/signup';

type RouteKey = '/' | '/login' | '/signup' | '/home' | '/favorites' | '/notfound';

function navigateTo(path: string) {
  window.history.pushState({}, '', path);
  const event = new PopStateEvent('popstate');
  window.dispatchEvent(event);
}

(window as any).navigateTo = navigateTo;

const routes: Record<RouteKey, () => void> = {
  '/': () => {
    navigateTo('/login');
  },
  '/login': () => {
    if (isAuthenticated()) {
      navigateTo('/home');
    } else {
      renderLogin();
    }
  },
  '/signup': renderSignup,
  '/home': renderVideos,
  '/favorites': renderFavorites,
  '/notfound': () => {
    document.body.innerHTML = `
      <h1>Page Not Found</h1>
      <button id="back-to-login">Go to Login</button>
    `;
    document.getElementById('back-to-login')?.addEventListener('click', () => {
      navigateTo('/login');
    });
  }
};

export function initRouter() {
  window.addEventListener('popstate', () => {
    const path = window.location.pathname as RouteKey;
    if (routes[path]) {
      routes[path]();
    } else {
      navigateTo('/notfound');
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
        navigateTo('/notfound');
      }
    }
  });

  const path = window.location.pathname as RouteKey;
  if (routes[path]) {
    routes[path]();
  } else {
    navigateTo('/notfound');
  }
}
