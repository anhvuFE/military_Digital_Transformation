// Placeholder HTTP client for future integration
export async function request<T>(url: string, options?: RequestInit): Promise<T> {
  console.info("Mock request", url, options);
  return new Promise((resolve) => setTimeout(() => resolve({} as T), 300));
}
