import { renderHome } from '../login';
import '@testing-library/jest-dom';

describe('renderHome', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render the login form with signup link', () => {
    renderHome();
    const app = document.getElementById('app');
    expect(app).toBeInTheDocument();
    expect(app?.querySelector('h2')).toHaveTextContent('Login');
    expect(app?.querySelector('form')).toBeInTheDocument();
    expect(app?.querySelector('a.signup-link')).toHaveTextContent("Don't have an account? Sign Up");
  });
});
