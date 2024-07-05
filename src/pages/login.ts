import { login } from '../services/authService';

export function renderLogin() {
  const app = document.getElementById('app') as HTMLElement;
  app.innerHTML = `
    <div class="container-form">
      <h2>Login</h2>
      <form id="login-form">
        <div>
          <label for="username">Username</label>
          <input type="text" id="username" name="username">
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password">
        </div>
        <button type="submit">Login</button>
        <a class="signup-link" href="/signup">Don't have an account? Sign Up</a>
      </form>
    </div>
  `;

  const form = document.getElementById('login-form') as HTMLFormElement;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    try {
      const { token, user } = await login(username, password);
      saveToken(token);
      saveUserId(user.userId); 
      history.pushState({}, '', '/home');
      const popStateEvent = new PopStateEvent('popstate');
      window.dispatchEvent(popStateEvent);
    } catch (error) {
      console.error('Login failed', error);
    }
  });
}

function saveToken(token: string) {
  localStorage.setItem('jwt_token', token);
}

function saveUserId(userId: string) {
  localStorage.setItem('userId', userId);
}
