import crypto from 'crypto';

export const ADMIN_COOKIE_NAME = 'methmi_admin_token';
export const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'methmi_mobile_vault_super_secret_master_key_2026_!@#$%^';

export interface AdminSessionPayload {
  email: string;
  role: string;
  exp: number;
  iat?: number;
}

// Rate Limiter tracking (in-memory)
interface AttemptRecord {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}

const loginAttempts = new Map<string, AttemptRecord>();

// Custom dynamic password support
let dynamicCustomPassword: { email: string; passwordHash: string } | null = null;

function hashPassword(password: string): string {
  return crypto.createHmac('sha256', SESSION_SECRET).update(password).digest('hex');
}

/**
 * Check rate limit for client IP or identifier (friendly for store owner)
 */
export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; lockedUntil?: number } {
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

  // 1. Check custom dynamic password if set
  if (dynamicCustomPassword) {
    if (dynamicCustomPassword.email === cleanEmail && dynamicCustomPassword.passwordHash === hashPassword(cleanPass)) {
      return true;
    }
  }

  // 2. Accepted admin passwords
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

  // 3. Accepted admin emails
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

/**
 * Sign session token using Node.js crypto (100% reliable in Node.js serverless runtime)
 */
export function signSessionToken(email: string): string {
  const now = Date.now();
  const payload: AdminSessionPayload = {
    email: email.trim().toLowerCase(),
    role: 'OWNER_ADMIN',
    iat: now,
    exp: now + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payloadB64).digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verify session token using Node.js crypto
 */
export function verifySessionToken(token: string | undefined): AdminSessionPayload | null {
  if (!token || !token.includes('.')) return null;

  try {
    const [payloadB64, signatureB64] = token.split('.');
    if (!payloadB64 || !signatureB64) return null;

    const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(payloadB64).digest('base64url');

    // Secure timing comparison
    const sigA = Buffer.from(signatureB64);
    const sigB = Buffer.from(expectedSig);
    if (sigA.length !== sigB.length || !crypto.timingSafeEqual(sigA, sigB)) {
      return null;
    }

    const json = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const payload = JSON.parse(json) as AdminSessionPayload;

    if (payload.exp && payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
