'use client';

export const ADMIN_STORAGE_KEY = 'qxyra_admin_session';

export interface AdminSession {
  email: string;
  role: string;
  authenticatedAt: string;
}

/**
 * Get active admin session data from browser storage
 */
export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(ADMIN_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/**
 * Check if user has an active admin session
 */
export function checkIsAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(localStorage.getItem(ADMIN_STORAGE_KEY));
}

/**
 * Clear admin session and call server logout API
 */
export async function logoutAdmin() {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    await fetch('/api/admin/auth', { method: 'DELETE' });
  } catch (err) {
    console.error('Logout error', err);
  }
}
