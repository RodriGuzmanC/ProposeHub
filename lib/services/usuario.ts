

// lib/usuario.ts

export async function login(username: string, password: string) {
    try {
      // Lógica para obtener al usuario desde una API y validar las credenciales
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ username, password }),
      // });
      // const data = await response.json();
  
      // if (data.success) {
      //   // Lógica para almacenar la sesión del usuario (e.g., con cookies, localStorage, etc.)
      //   localStorage.setItem('token', data.token);
      //   return { success: true };
      // } else {
      //   return { success: false, message: data.message };
      // }
  
      // Simulación de redirección al obtener el login correcto
      return { success: true };
    } catch (error) {
      console.error('Error en la autenticación', error);
      return { success: false, message: 'Error en la autenticación' };
    }
  }
  
  export const obtenerClientes = async () => {
    try {
        //const response = await apiClient.get('/usuarios');
        //return response.data;
        const UsuariosDataExample = [
          { id: 1, nombre: 'Juan Pérez', correo: 'juan.perez@example.com', createdAt: '2024-01-10', id_rol: 1 },
          { id: 2, nombre: 'María Gómez', correo: 'maria.gomez@example.com', createdAt: '2024-02-15', id_rol: 2 },
          { id: 3, nombre: 'Carlos Sánchez', correo: 'carlos.sanchez@example.com', createdAt: '2024-03-20', id_rol: 3 },
          { id: 4, nombre: 'Laura Torres', correo: 'laura.torres@example.com', createdAt: '2024-04-25', id_rol: 4 },
          { id: 5, nombre: 'Ana Martínez', correo: 'ana.martinez@example.com', createdAt: '2024-05-30', id_rol: 1 },
          { id: 6, nombre: 'Pedro Ramírez', correo: 'pedro.ramirez@example.com', createdAt: '2024-06-10', id_rol: 2 }
        ];
        
        return UsuariosDataExample
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error}`);
    }
};