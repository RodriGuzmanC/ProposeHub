// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isAuthenticated(): boolean {
  
  return true; // Cambiar a true para simular que el usuario está logueado
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si el usuario ya está en /auth/login y no está autenticado, no redirigir
  if (pathname === '/auth/login' && !isAuthenticated()) {
    return NextResponse.next();
  }

  // Si el usuario ya está en /contactos y está autenticado, no redirigir
  if (pathname === '/contactos' && isAuthenticated()) {
    return NextResponse.next();
  }

  // Si el usuario no está autenticado y está intentando acceder a otra ruta que no sea /auth/login
  if (!isAuthenticated() && pathname !== '/auth/login') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Si el usuario está autenticado y esta intentando acceder a /auth/login
  if (isAuthenticated() && pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/contactos', request.url));
  }

  // Si ninguna de las condiciones anteriores aplica, continúa
  return NextResponse.next();
}

// para aplicar el middleware a todas las rutas
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // Evitar recursos estáticos y de imágenes
  ],
};