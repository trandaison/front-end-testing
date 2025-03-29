// Viết unit test kiểm tra hàm login trong class AuthService.
// Có thể thực hiện refactor code trong quá trình làm.

export class AuthService {
  async login(credentials: { username: string; password: string }) {
    // Setp 1: get token with username and password
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (!response.ok) return 'Invalid login credentials';

    const data = await response.json();
    if (!data.token) return 'Invalid login credentials';

    // Step 2: get user with token
    const userResponse = await fetch('https://fakestoreapi.com/auth/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${data.token}`,
      },
    });
    if (!userResponse.ok) return 'Failed to login';

    const userData = await userResponse.json();
    if (!userData) return 'Failed to login';

    return userData;
  }
}

// write test case .login for AuthService with cases:
// 1. login but Failed with Invalid login credentials
// 2. login but Failed to login
// 3. login successfully
// 4. login successfully but failed to get user
// 5. login successfully and get user successfully
// Use mock Promise to mock fetch function
