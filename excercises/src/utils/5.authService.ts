// Viết unit test kiểm tra hàm login trong class AuthService.
// Có thể thực hiện refactor code trong quá trình làm.

export class AuthService {
  async fetchToken(credentials: {
    username: string;
    password: string;
  }): Promise<string | null> {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (!response.ok) return null;

    const data = await response.json();
    return data.token || null;
  }

  async fetchUser(token: string): Promise<any | null> {
    const response = await fetch("https://fakestoreapi.com/auth/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) return null;

    try {
      return await response.json();
    } catch (error) {
      return null; // Bắt lỗi JSON parse
    }
  }

  async login(credentials: { username: string; password: string }) {
    const token = await this.fetchToken(credentials);
    if (!token) return "Invalid login credentials";

    const userData = await this.fetchUser(token);
    if (!userData || !userData?.id) return "Failed to login";

    return userData;
  }
}
