export async function handleResponse(response: Response) {
  if (response.ok) {
    // If it's a 204 No Content, just return null
    if (response.status === 204) return null;

    // Check if there is content to parse
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    if (contentType && contentType.includes("text/plain")) {
      return response.text();
    }
    return null;
  }

  // Handle errors
  let errorMessage = `Помилка: ${response.status} ${response.statusText}`;
  const contentType = response.headers.get("content-type");

  try {
    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } else {
      const textError = await response.text();
      if (textError) errorMessage = textError;
    }
  } catch (e) {
    // Fallback to default errorMessage
  }

  throw new Error(errorMessage);
}
