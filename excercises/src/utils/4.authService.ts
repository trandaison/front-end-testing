// Define interfaces for better type safety
export interface Credentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

// Define HTTP client interface to allow dependency injection
export interface HttpClient {
  post<T>(url: string, data: any): Promise<T>;
}

export class AuthService {
  private apiUrl: string;
  private httpClient: HttpClient;

  constructor(
    httpClient: HttpClient,
    apiUrl: string = "https://fakestoreapi.com/auth/login"
  ) {
    this.httpClient = httpClient;
    this.apiUrl = apiUrl;
  }

  async login(credentials: Credentials): Promise<string> {
    try {
      const data = await this.httpClient.post<AuthResponse>(
        this.apiUrl,
        credentials
      );

      if (!data.token) {
        throw new Error("Authentication failed: No token received");
      }

      return data.token;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Login failed: ${error.message}`);
      }
      throw new Error("Login failed: Unknown error");
    }
  }
}
