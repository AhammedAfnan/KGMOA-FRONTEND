import { API_BASE_URL } from "./config";

export async function registerUser(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    // Check if the response is not ok (status code 2xx)
    if (!response.ok) {
      const error = await response.json(); // Assuming the server returns JSON in case of error
      console.error('Error response from server:', error);  // Log the error response
      throw new Error(error.error || 'Something went wrong'); // Provide a fallback message
    }

    const responseData = await response.json();  // Assuming the response is in JSON format
    return responseData;  // Return the server response if everything goes fine

  } catch (error) {
    console.error('Error in registerUser function:', error); // Log the error details
    throw new Error(error.message || 'An error occurred during registration');
  }
}
