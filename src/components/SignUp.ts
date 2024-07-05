export function renderSignup() {
    const app = document.getElementById('app') as HTMLElement;
    app.innerHTML = `
      <div>
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
      </div>
    `;
  
    const form = document.getElementById('signup-form') as HTMLFormElement;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = (document.getElementById('username') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;
      console.log('Signing up:', { username, password });
    });
  }
  