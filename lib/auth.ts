// lib/auth.ts
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('token'); // ou cookie si tu préfères
  return !!token;
}
