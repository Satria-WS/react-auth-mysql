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
