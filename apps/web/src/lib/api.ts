export const API_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:8080";

export const DEFAULT_CLERK_ID = "test-user-123";

async function handleResponse<T = unknown>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "An error occurred";
    try {
      const errorData = await response.json();
      message = errorData.message || errorData.error || message;
    } catch {
      // Ignore body parsing error
    }
    throw new Error(message);
  }

  try {
    return (await response.json()) as T;
  } catch {
    return null as unknown as T;
  }
}

export const apiClient = {
  async get<T = unknown>(endpoint: string, clerkId?: string): Promise<T> {
    try {
      const response = await fetch(`${API_URL}/api/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-clerk-user-id": clerkId || DEFAULT_CLERK_ID,
        },
      });
      return await handleResponse<T>(response);
    } catch (error) {
      console.error(`API GET /${endpoint} failed:`, error);
      throw error;
    }
  },

  async post<T = unknown>(endpoint: string, data: unknown, clerkId?: string): Promise<T> {
    try {
      const response = await fetch(`${API_URL}/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-clerk-user-id": clerkId || DEFAULT_CLERK_ID,
        },
        body: JSON.stringify(data),
      });
      return await handleResponse<T>(response);
    } catch (error) {
      console.error(`API POST /${endpoint} failed:`, error);
      throw error;
    }
  },

  async patch<T = unknown>(endpoint: string, data: unknown, clerkId?: string): Promise<T> {
    try {
      const response = await fetch(`${API_URL}/api/${endpoint}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-clerk-user-id": clerkId || DEFAULT_CLERK_ID,
        },
        body: JSON.stringify(data),
      });
      return await handleResponse<T>(response);
    } catch (error) {
      console.error(`API PATCH /${endpoint} failed:`, error);
      throw error;
    }
  },

  async delete<T = unknown>(endpoint: string, clerkId?: string): Promise<T> {
    try {
      const response = await fetch(`${API_URL}/api/${endpoint}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-clerk-user-id": clerkId || DEFAULT_CLERK_ID,
        },
      });
      return await handleResponse<T>(response);
    } catch (error) {
      console.error(`API DELETE /${endpoint} failed:`, error);
      throw error;
    }
  },
};
