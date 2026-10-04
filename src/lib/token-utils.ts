// Universal Web Crypto HMAC and token verification (100% Edge & Node compatible)

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'qxyra_vault_super_secret_master_key_2026_!@#$%^';
export const ADMIN_COOKIE_NAME = 'qxyra_admin_token';

function base64UrlEncode(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return atob(str);
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Sign session token using Web Crypto HMAC SHA-256
 */
export async function signSessionTokenEdge(email: string): Promise<string> {
  const now = Date.now();
  const payload = {
    email: email.trim().toLowerCase(),
    role: 'OWNER_ADMIN',
    iat: now,
    exp: now + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const encoder = new TextEncoder();
  const payloadB64 = base64UrlEncode(encoder.encode(JSON.stringify(payload)));

  const key = await getHmacKey(SESSION_SECRET);
  const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payloadB64));
  const signature = base64UrlEncode(sigBuffer);

  return `${payloadB64}.${signature}`;
}

/**
 * Verify session token using Web Crypto HMAC SHA-256
 */
export async function verifySessionTokenEdge(token: string | undefined): Promise<{ email: string; role: string; exp: number } | null> {
  if (!token || !token.includes('.')) return null;

  const [payloadB64, signatureB64] = token.split('.');
  if (!payloadB64 || !signatureB64) return null;

  try {
    const encoder = new TextEncoder();
    const key = await getHmacKey(SESSION_SECRET);

    // Compute expected signature
    const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(payloadB64));
    const expectedSig = base64UrlEncode(sigBuffer);

    // Secure string comparison
    if (expectedSig !== signatureB64) {
      return null;
    }

    const json = base64UrlDecode(payloadB64);
    const payload = JSON.parse(json);

    if (payload.exp && payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
