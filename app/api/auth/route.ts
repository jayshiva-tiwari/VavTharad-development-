import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { action, mobile, otp, name } = await request.json();

    if (action === 'send-otp') {
      if (!mobile || mobile.length !== 10) {
        return NextResponse.json({ error: 'Valid 10-digit mobile number required' }, { status: 400 });
      }
      return NextResponse.json({
        success: true,
        message: 'OTP sent to mobile number via Gujarat Govt SMS Gateway',
        demoOtp: '123456',
      });
    }

    if (action === 'verify-otp') {
      if (otp !== '123456' && otp !== '777777') {
        return NextResponse.json({ error: 'Invalid OTP. Please enter 123456.' }, { status: 401 });
      }

      return NextResponse.json({
        success: true,
        token: `jwt_gov_vav_tharad_${Date.now()}`,
        user: {
          name: name || 'Shiva Tiwari',
          mobile: mobile || '9876543210',
          taluka: 'Tharad',
          village: 'Tharad Town',
          isLoggedIn: true,
          role: 'citizen',
        },
      });
    }

    return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
