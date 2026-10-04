import { NextRequest, NextResponse } from 'next/server';
import { 
  verifyServerCredentials, 
  signSessionToken, 
  verifySessionToken, 
  checkRateLimit, 
  recordFailedAttempt, 
  clearRateLimit, 
  ADMIN_COOKIE_NAME 
} from '@/lib/server-auth';

function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown-client';
}

/**
 * Check current authentication state
 */
export async function GET(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: session.email,
      role: session.role,
    }
  });
}

/**
 * Handle Administrator Login
 */
export async function POST(request: NextRequest) {
  const ip = getClientIdentifier(request);

  // 1. Check Rate Limiting / Lockout Status
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    const minutesLeft = rateLimit.lockedUntil 
      ? Math.ceil((rateLimit.lockedUntil - Date.now()) / 60000)
      : 15;

    return NextResponse.json({
      success: false,
      locked: true,
      error: `Security Lockout: Too many failed login attempts. Access is locked for ${minutesLeft} minute(s) to protect against unauthorized access.`
    }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { email, password, honeypot } = body;

    // 2. Honeypot Bot Trap Protection
    if (honeypot) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request'
      }, { status: 400 });
    }

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'Please provide both Administrator Email and Master Password.'
      }, { status: 400 });
    }

    // 3. Verify Server-Side Credentials
    const isValid = verifyServerCredentials(email, password);

    if (!isValid) {
      const attempt = recordFailedAttempt(ip);

      if (attempt.isLocked) {
        return NextResponse.json({
          success: false,
          locked: true,
          error: 'Security Lockout Activated: 5 consecutive failed attempts. Access is locked for 15 minutes.'
        }, { status: 429 });
      }

      return NextResponse.json({
        success: false,
        error: `Access Denied: Invalid credentials. ${attempt.remaining} attempt(s) remaining before security lockout.`
      }, { status: 401 });
    }

    // 4. Success: Clear rate limit & Generate signed token
    clearRateLimit(ip);
    const token = await signSessionToken(email);

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful. Access granted.',
      user: {
        email: email.trim().toLowerCase(),
        role: 'OWNER_ADMIN'
      }
    });

    // 5. Set HttpOnly Cryptographic Cookie (Unreadable by browser JS)
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;

  } catch (error) {
    console.error('Admin Auth Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server verification error. Please try again.'
    }, { status: 500 });
  }
}

/**
 * Handle Administrator Logout
 */
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Administrator session terminated.'
  });

  // Wipe cookie completely
  response.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
