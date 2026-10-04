import crypto from 'crypto';
import { 
  signSessionTokenEdge, 
  verifySessionTokenEdge, 
  ADMIN_COOKIE_NAME 
} from './token-utils';

export { ADMIN_COOKIE_NAME, signSessionTokenEdge as signSessionToken, verifySessionTokenEdge as verifySessionToken };

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'qxyra_vault_super_secret_master_key_2026_!@#$%^';

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
  const now = Date.now();
  const record = loginAttempts.get(identifier);

  if (!record) {
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }

  // Check if currently locked out
  if (record.lockedUntil && record.lockedUntil > now) {
    return { 
      allowed: false, 
      remaining: 0, 
      lockedUntil: record.lockedUntil 
    };
  }

  // Window expired, reset
  if (now - record.firstAttempt > ATTEMPT_WINDOW_MS && (!record.lockedUntil || record.lockedUntil <= now)) {
    loginAttempts.delete(identifier);
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }

  const remaining = Math.max(0, MAX_ATTEMPTS - record.count);
  return { 
    allowed: record.count < MAX_ATTEMPTS, 
    remaining 
  };
}

/**
 * Record a failed attempt
 */
export function recordFailedAttempt(identifier: string): { remaining: number; isLocked: boolean; lockMinutes: number } {
  const now = Date.now();
  const record = loginAttempts.get(identifier) || { count: 0, firstAttempt: now };

  record.count += 1;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_WINDOW_MS;
    loginAttempts.set(identifier, record);
    return { remaining: 0, isLocked: true, lockMinutes: 15 };
  }

  loginAttempts.set(identifier, record);
  return { 
    remaining: MAX_ATTEMPTS - record.count, 
    isLocked: false, 
    lockMinutes: 0 
  };
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
  const defaultOwnerEmail = (process.env.ADMIN_EMAIL || 'deshanvazi@gmail.com').toLowerCase();
  const defaultMasterPassword = process.env.ADMIN_PASSWORD || 'Qxyra@2026';

  // 1. Check custom dynamically updated password
  if (dynamicCustomPassword) {
    const isEmail = dynamicCustomPassword.email === cleanEmail;
    const isPass = dynamicCustomPassword.passwordHash === hashPassword(password);
    if (isEmail && isPass) return true;
  }

  // 2. Check default master owner credentials using timing-safe comparison
  const isEmailMatch = cleanEmail === defaultOwnerEmail || cleanEmail === 'admin@qxyra.com';
  if (!isEmailMatch) return false;

  const inputHash = hashPassword(password);
  const expectedHash = hashPassword(defaultMasterPassword);

  try {
    return crypto.timingSafeEqual(Buffer.from(inputHash), Buffer.from(expectedHash));
  } catch {
    return false;
  }
}
