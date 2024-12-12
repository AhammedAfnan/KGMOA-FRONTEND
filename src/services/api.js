import { API_BASE_URL } from "./config";

export async function registerUser(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }
  
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  