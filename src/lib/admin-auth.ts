'use client';

export const ADMIN_STORAGE_KEY = 'qxyra_admin_session';
export const ADMIN_CREDENTIALS_KEY = 'qxyra_admin_credentials';
export const ADMIN_COOKIE_NAME = 'qxyra_admin_session';

export interface AdminCredentials {
  allowedEmails: string[];
  passwordHash?: string;
  defaultPassword?: string;
}

export const DEFAULT_ADMIN_CONFIG = {
  allowedEmails: ['deshanvazi@gmail.com', 'admin@qxyra.com'],
  defaultPassword: 'Qxyra@2026',
};

/**
 * Verify admin email and password
 */
export function verifyAdminCredentials(email: string, password: string): boolean {
  const cleanEmail = email.trim().toLowerCase();
  
  // Check if custom credentials were saved in settings
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
      if (saved) {
        const custom = JSON.parse(saved);
        const matchesEmail = custom.email 
          ? custom.email.toLowerCase() === cleanEmail 
          : DEFAULT_ADMIN_CONFIG.allowedEmails.includes(cleanEmail);
        const matchesPass = custom.password 
          ? custom.password === password 
          : password === DEFAULT_ADMIN_CONFIG.defaultPassword;
        if (matchesEmail && matchesPass) return true;
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Fallback to default verified accounts
  const isEmailAllowed = DEFAULT_ADMIN_CONFIG.allowedEmails.some(e => e.toLowerCase() === cleanEmail);
  const isPasswordCorrect = password === DEFAULT_ADMIN_CONFIG.defaultPassword;

  return isEmailAllowed && isPasswordCorrect;
}

/**
 * Save active admin session in Cookie and LocalStorage
 */
export function setAdminSession(email: string) {
  if (typeof window === 'undefined') return;

  const sessionData = {
    email: email.trim().toLowerCase(),
    role: 'ADMIN',
    authenticatedAt: new Date().toISOString(),
  };

  // 1. LocalStorage
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(sessionData));

  // 2. Cookie for Middleware verification (7 days expiry)
  const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
  document.cookie = `${ADMIN_COOKIE_NAME}=true; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/**
 * Get active admin session data
 */
export function getAdminSession() {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(ADMIN_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/**
 * Check if current user has an active admin session
 */
export function checkIsAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;

  const hasCookie = document.cookie.split(';').some(c => c.trim().startsWith(`${ADMIN_COOKIE_NAME}=`));
  const hasStorage = Boolean(localStorage.getItem(ADMIN_STORAGE_KEY));

  return hasCookie || hasStorage;
}

/**
 * Clear admin session and remove cookie
 */
export function logoutAdmin() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(ADMIN_STORAGE_KEY);
  document.cookie = `${ADMIN_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
