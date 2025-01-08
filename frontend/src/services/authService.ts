
//login service
export const loginService = async (email: string, password: string) => {
  // cari cookie
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  // Check if the token already exists in cookies
  const existingToken = getCookie('token');
  if (existingToken) {
    console.log('Token already exists in cookies');
    return;
  }

  try {
    // Send login request to API
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Login failed');
    }

    // Parse the response data and extract token
    const data = await response.json();
    console.log(data);
    // Store the token in localStorage and cookies
    // localStorage.setItem('token', data.token); // Store in localStorage
    document.cookie = `token=${data.token}; path=/;`; // Store in cookies
  } catch (error) {
    console.error('An error occurred during login:', error);
  }
};

//register service
export const registerService = async (_name: string, email: string, password: string, confirmPassword: string) => {
  try {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Registration successful:", data);
      // You can redirect the user or show a success message
    } else {
      console.error("Registration failed:", data.msg);
      console.log("Registration failed:", data.msg);
      
      // Show error message to the user
    }
  } catch (error) {
    console.error("Server error:", error);
    console.log(error)
  }
};