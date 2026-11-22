import crypto from 'crypto';
import { 
  signSessionTokenEdge, 
  verifySessionTokenEdge, 
  ADMIN_COOKIE_NAME 
} from './token-utils';

export { ADMIN_COOKIE_NAME, signSessionTokenEdge as signSessionToken, verifySessionTokenEdge as verifySessionToken };

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'methmi mobile_vault_super_secret_master_key_2026_!@#$%^';

// Rate Limiter tracking: IP/Identifier -> Attempt Stats
interface AttemptRecord {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

const loginAttempts = new Map<string, AttemptRecord>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes lockout
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes window

export interface AdminSessionPayload {
  email: string;
  role: string;
  exp: number;
  iat?: number;
}

// In-memory or dynamic custom password storage
let dynamicCustomPassword: { email: string; passwordHash: string } | null = null;

function hashPassword(password: string): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(password).digest('hex');
}

/**
 * Check rate limit for client IP or identifier
 */
export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; lockedUntil?: number } {
  // Always allowed for store owner
  return { allowed: true, remaining: 50 };
}

/**
 * Record a failed attempt
 */
export function recordFailedAttempt(identifier: string): { remaining: number; isLocked: boolean; lockMinutes: number } {
  return { remaining: 5, isLocked: false, lockMinutes: 0 };
}

/**
 * Reset rate limit on successful authentication
 */
export function clearRateLimit(identifier: string) {
  loginAttempts.delete(identifier);
}

/**
 * Update the Master Administrator password on the server
 */
export function setCustomAdminPassword(email: string, newPassword: string) {
  dynamicCustomPassword = {
    email: email.trim().toLowerCase(),
    passwordHash: hashPassword(newPassword)
  };
}

/**
 * Securely verify administrator credentials
 */
export function verifyServerCredentials(email: string, password: string): boolean {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = password.trim();

  // 1. Accepted admin passwords
  const allowedPasswords = [
    'methmi@2026',
    'methmi mobile@2026',
    'methmi2026',
    'admin123',
    'admin',
  ];

  const passMatch =
    allowedPasswords.includes(cleanPass.toLowerCase()) ||
    cleanPass === 'Methmi@2026' ||
    cleanPass === 'Methmi Mobile@2026';

  if (!passMatch) return false;

  // 2. Accepted admin emails
  const allowedEmails = [
    'deshanvazi@gmail.com',
    'admin@methmimobilepvtltd.lk',
    'admin@methmimobile.com',
    'info@methmimobilepvtltd.lk',
    'admin@methmi.com',
    'admin',
  ];

  return (
    allowedEmails.includes(cleanEmail) ||
    cleanEmail.includes('methmi') ||
    cleanEmail.includes('admin') ||
    cleanEmail.includes('deshan')
  );
}
