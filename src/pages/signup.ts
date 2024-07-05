import { createUser } from "../services/userService";

export function renderSignup() {
    const app = document.getElementById('app') as HTMLElement;
    app.innerHTML = `
      <div class="container-form">
        <h2>Sign Up</h2>
        <form id="signup-form">
          <div>
            <label for="username">Username</label>
            <input type="text" id="username" name="username">
          </div>
          <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password">
          </div>
          <button type="submit">Sign Up</button>
          <a class="signup-link" href="/">Already have an account? Sign In</a>
        </form>
        <div id="signup-message" class="signup-message">
          <span class="success-icon">✔</span>
          <p>User successfully created!</p>
        </div>
      </div>
    `;
  
    const form = document.getElementById('signup-form') as HTMLFormElement;
    const messageContainer = document.getElementById('signup-message') as HTMLElement;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = (document.getElementById('username') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;
      try {
        const createdUser = await createUser(username, password);
        
        messageContainer.classList.add('active');

        setTimeout(() => {
          history.pushState({}, '', '/login');
          const popStateEvent = new PopStateEvent('popstate');
          window.dispatchEvent(popStateEvent);
        }, 3000);
        
      } catch (error) {
        console.error('Sign Up failed', error);
      }
    });
  }
