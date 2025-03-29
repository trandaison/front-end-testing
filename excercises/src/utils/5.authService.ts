// Viết unit test kiểm tra hàm login trong class AuthService.
// Có thể thực hiện refactor code trong quá trình làm.
// auth.service.ts
interface Credentials {
  username: string;
  password: string;
}

interface TokenResponse {
  token: string;
}

interface UserData {
  [key: string]: any;
}

export class AuthService {
  private readonly BASE_URL = 'https://fakestoreapi.com';

  constructor(private fetchClient = fetch) {} // Allow dependency injection

  async login(credentials: Credentials): Promise<UserData | string> {
    const data = await this.getAuthToken(credentials);
    if (typeof data === 'string') return data;

    const userData = await this.getUserData(data.token);
    if (typeof userData === 'string') return userData;

    return userData;
  }

  private async getAuthToken(credentials: Credentials): Promise<TokenResponse | string> {
    const response = await this.fetchClient(`${this.BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return 'Invalid login credentials';

    const data: TokenResponse = await response.json();

    if (!data.token) return 'Invalid login credentials';

    return data;
  }

  private async getUserData(token: string): Promise<UserData | string> {
    const response = await this.fetchClient(`${this.BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return 'Failed to login';

    const userData = await response.json();
    return userData ?? 'Failed to login';
  }
}
