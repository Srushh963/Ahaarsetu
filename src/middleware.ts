import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Update session cookies first (very important for session lifespan)
  const response = await updateSession(request)
  
  const path = request.nextUrl.pathname
  const isProtectedPath = ['/donor', '/volunteer', '/ngo', '/admin'].some(prefix => path.startsWith(prefix))
  
  if (isProtectedPath) {
    const { createServerClient } = await import('@supabase/ssr')
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll() {
            // Read-only during auth check
          },
        },
      }
    )
    
    const { data: { user } } = await supabase.auth.getUser()
    
    // Check if user is logged in
    if (!user) {
      // Check if it's the admin path and the special hardcoded admin cookie is active
      const adminCookie = request.cookies.get('admin_auth')?.value
      if (path.startsWith('/admin') && adminCookie === 'true') {
        return response
      }
      
      // Redirect unauthenticated user to login
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files like logo, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
