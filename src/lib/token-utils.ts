// Universal Web Crypto HMAC and token verification (100% Edge runtime compatible)

export const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'methmi_mobile_vault_super_secret_master_key_2026_!@#$%^';
export const ADMIN_COOKIE_NAME = 'methmi_admin_token';

function toBase64Url(buffer: ArrayBuffer | Uint8Array): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(buffer as any).toString('base64url');
  }
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64Url(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64url').toString('utf8');
  }
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return atob(str);
}

/**
 * Sign session token in Edge runtime
 */
export async function signSessionTokenEdge(email: string): Promise<string> {
  const now = Date.now();
  const payload = {
    email: email.trim().toLowerCase(),
    role: 'OWNER_ADMIN',
    iat: now,
    exp: now + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const payloadJson = JSON.stringify(payload);
  const encoder = new TextEncoder();
  const payloadB64 = toBase64Url(encoder.encode(payloadJson));

  const webCrypto = typeof globalThis !== 'undefined' && globalThis.crypto ? globalThis.crypto : null;
  if (webCrypto?.subtle) {
    const key = await webCrypto.subtle.importKey(
      'raw',
      encoder.encode(SESSION_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const sigBuffer = await webCrypto.subtle.sign('HMAC', key, encoder.encode(payloadB64));
    const signature = toBase64Url(sigBuffer);
    return `${payloadB64}.${signature}`;
  }

  return `${payloadB64}.session_${now}`;
}

/**
 * Verify session token using Web Crypto HMAC SHA-256 (Used in Next.js middleware)
 */
export async function verifySessionTokenEdge(token: string | undefined): Promise<{ email: string; role: string; exp: number } | null> {
  if (!token || !token.includes('.')) return null;

  const [payloadB64, signatureB64] = token.split('.');
  if (!payloadB64 || !signatureB64) return null;

  try {
    const encoder = new TextEncoder();
    const webCrypto = typeof globalThis !== 'undefined' && globalThis.crypto ? globalThis.crypto : null;

    if (webCrypto?.subtle) {
      const key = await webCrypto.subtle.importKey(
        'raw',
        encoder.encode(SESSION_SECRET),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign', 'verify']
      );

      const sigBuffer = await webCrypto.subtle.sign('HMAC', key, encoder.encode(payloadB64));
      const expectedSig = toBase64Url(sigBuffer);

      if (expectedSig !== signatureB64) {
        return null;
      }
    }

    const json = fromBase64Url(payloadB64);
    const payload = JSON.parse(json);

    if (payload.exp && payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
