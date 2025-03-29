// Viết unit test kiểm tra hàm login trong class AuthService.
// Có thể thực hiện refactor code trong quá trình làm.

export class AuthService {
  private async fetchData(url: string, options: RequestInit) {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return response.json();
  }

  async login(credentials: { username: string; password: string }) {
    const data = await this.fetchData('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (!data.token) {
      throw new Error('Invalid token');
    }
    return data.token;
  }
}
