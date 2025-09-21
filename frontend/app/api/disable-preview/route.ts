import { NextRequest } from 'next/server';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  // Disable draft mode
  (await draftMode()).disable();

  // Get the redirect URL from query params or default to home
  const searchParams = request.nextUrl.searchParams;
  const redirectUrl = searchParams.get('redirect') || '/';

  // Redirect to the specified page
  redirect(redirectUrl);
}