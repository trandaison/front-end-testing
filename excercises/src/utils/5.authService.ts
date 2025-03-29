// Viết unit test kiểm tra hàm login trong class AuthService.
// Có thể thực hiện refactor code trong quá trình làm.

interface Credentials {
  username: string;
  password: string;
}

export class AuthService {
  async fetchToken(fetchData: typeof fetch, credentials: Credentials) {
    const response = await fetchData('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Invalid login credentials');

    const data = await response.json();
    if (!data.token) throw new Error('Invalid login credentials');

    return data.token;
  };

  async fetchMe(fetchData: typeof fetch, token: string) {
    const response = await fetchData('https://fakestoreapi.com/auth/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to login');

    const userData = await response.json();
    if (!userData) throw Error('Failed to login');

    return userData;
  }


  async login(fetchData: typeof fetch, credentials: Credentials) {
    const token = await this.fetchToken(fetchData, credentials);
    const userData = await this.fetchMe(fetchData, token);

    return userData
  }
}
