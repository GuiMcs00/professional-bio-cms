import { NextRequest, NextResponse } from 'next/server';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  const slug = searchParams.get('slug');
  const type = searchParams.get('type') || 'post';

  // Check for preview token
  if (!token || token !== process.env.STRAPI_PREVIEW_TOKEN) {
    return NextResponse.json(
      { message: 'Invalid preview token' },
      { status: 401 }
    );
  }

  // Enable draft mode
  (await draftMode()).enable();

  // Determine redirect URL
  let redirectUrl = '/';
  
  if (type === 'post' && slug) {
    redirectUrl = `/blog/${slug}`;
  } else if (type === 'homepage') {
    redirectUrl = '/';
  }

  // Add preview indicator to URL
  const url = new URL(redirectUrl, request.url);
  url.searchParams.set('preview', 'true');

  // Redirect to the preview page
  redirect(url.toString());
}