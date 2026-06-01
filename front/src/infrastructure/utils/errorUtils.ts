export function getErrorMessage(error: unknown, fallback: string): string {
  const e = error as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } }
  if (e?.response?.data?.message) return e.response.data.message
  if (e?.response?.data?.errors) return Object.values(e.response.data.errors).flat().join('. ')
  return fallback
}
