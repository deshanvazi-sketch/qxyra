import { NextRequest, NextResponse } from 'next/server';
import { 
  verifySessionToken, 
  verifyServerCredentials, 
  setCustomAdminPassword, 
  signSessionToken, 
  ADMIN_COOKIE_NAME 
} from '@/lib/server-auth';

export async function POST(request: NextRequest) {
  // 1. Verify that requester is currently authenticated
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    return NextResponse.json({
      success: false,
      error: 'Unauthorized: You must be logged in as an administrator to change credentials.'
    }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({
        success: false,
        error: 'Please provide both your current password and new password.'
      }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({
        success: false,
        error: 'New password must be at least 8 characters long for security.'
      }, { status: 400 });
    }

    // 2. Verify current password
    const isCurrentValid = verifyServerCredentials(session.email, currentPassword);
    if (!isCurrentValid) {
      return NextResponse.json({
        success: false,
        error: 'Current password verification failed. Access denied.'
      }, { status: 403 });
    }

    // 3. Update master password on server
    setCustomAdminPassword(session.email, newPassword);

    // 4. Issue fresh session token
    const newToken = await signSessionToken(session.email);

    const response = NextResponse.json({
      success: true,
      message: 'Master Administrator password updated successfully. Your new password is now active.'
    });

    response.cookies.set(ADMIN_COOKIE_NAME, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update password.'
    }, { status: 500 });
  }
}
