import { renderSignup } from '../SignUp';
import '@testing-library/jest-dom';

describe('renderSignup', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it('should render the signup form', () => {
    renderSignup();
    const app = document.getElementById('app');
    expect(app).toBeInTheDocument();
    expect(app?.querySelector('h2')).toHaveTextContent('Sign Up');
    expect(app?.querySelector('form')).toBeInTheDocument();
    expect(app?.querySelector('input[name="username"]')).toBeInTheDocument();
    expect(app?.querySelector('input[name="password"]')).toBeInTheDocument();
    expect(app?.querySelector('button[type="submit"]')).toHaveTextContent('Sign Up');
  });
});
