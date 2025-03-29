// Define interfaces for better type safety
export interface Credentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserData {
  id?: number;
  username?: string;
  email?: string;
  [key: string]: any; // For other possible user properties
}

// Define HTTP client interface to allow dependency injection
export interface HttpClient {
  post<T>(url: string, data: any, headers?: Record<string, string>): Promise<T>;
  get<T>(url: string, headers?: Record<string, string>): Promise<T>;
}

export class AuthService2 {
  private authApiUrl: string;
  private userApiUrl: string;
  private httpClient: HttpClient;

  constructor(
    httpClient: HttpClient,
    authApiUrl: string = "https://fakestoreapi.com/auth/login",
    userApiUrl: string = "https://fakestoreapi.com/auth/user"
  ) {
    this.httpClient = httpClient;
    this.authApiUrl = authApiUrl;
    this.userApiUrl = userApiUrl;
  }

  async login(credentials: Credentials): Promise<UserData> {
    const token = await this.getToken(credentials);
    const userData = await this.getUserData(token);
    if (!userData) {
      throw new Error("Authentication failed: Invalid token");
    }

    return userData;
  }

  async getToken(credentials: Credentials): Promise<string> {
    try {
      const authResponse = await this.httpClient.post<AuthResponse>(
        this.authApiUrl,
        credentials
      );

      return authResponse.token || "";
    } catch (error) {
      return "";
    }
  }

  async getUserData(token: string): Promise<UserData | null> {
    if (!token) return null;

    try {
      const userData = await this.httpClient.get<UserData>(this.userApiUrl, {
        Authorization: `Bearer ${token}`,
      });

      return userData ?? null;
    } catch (error) {
      return null;
    }
  }
}
