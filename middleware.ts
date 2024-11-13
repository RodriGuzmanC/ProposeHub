// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


function isAuthenticated(request: NextRequest): boolean {
  // Obtiene la información del usuario de las cookies
  const userInfo = request.cookies.get('userInfo');
  return Boolean(userInfo); // Retorna verdadero si hay información del usuario
}

function isClientAuthenticated(request: NextRequest): boolean {
  // Obtiene la información del usuario de las cookies
  const clientInfo = request.cookies.get('clientInfo');
  return Boolean(clientInfo); // Retorna verdadero si hay información del usuario
}


const publicRoutes = ['/vista/propuesta/login', '/auth/login', '/auth/signin'];

// MIDDLEWARE
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone(); // Clonamos la url

  // Si la ruta es pública, permite el acceso
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Comprobar si la ruta comienza con 'vista/propuesta/'
  const isPropuestaRoute = pathname.startsWith('/vista/propuesta/');

  // Si el usuario no está autenticado y está intentando acceder a una vista de propuestas
  if (!isAuthenticated(request) && isPropuestaRoute) {
    if (isClientAuthenticated(request) && isPropuestaRoute) {
      return NextResponse.next();
      
    }
    // Crear una respuesta de redirección
    const response = NextResponse.redirect(new URL('/vista/propuesta/login', request.url));

    response.cookies.set({
      name: 'redirect_to',
      value: pathname,
      httpOnly: false,
      path: '/',
    });

    return response;
    //return NextResponse.redirect(new URL('/vista/propuesta/login', request.url));
  } 


  // Si el usuario no está autenticado y está intentando acceder a una ruta privada
  if (!isAuthenticated(request) && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Si el usuario está autenticado y está intentando acceder a la página de login, redirigir
  if (isAuthenticated(request) && pathname === '/auth/login') {
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