export const loginService = async (email: string, password: string) => {
  // Call your API for login (example with fetch)
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token); // Store token (you may choose other strategies)
};
export const registerService = async (email: string, password: string, passwordConfirm: string) => {
  // Call your API for registration (example with fetch)
  const response = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, passwordConfirm }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token); // Store token (you may choose other strategies)
  document.cookie = `token=${data.token}; path=/;`; // Store token in cookies
};