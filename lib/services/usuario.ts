

// lib/usuario.ts



const UsuariosDataExample = [
  { id: 1, nombre: 'Juan Pérez', correo: 'juan.perez@example.com', createdAt: '2024-01-10', id_rol: 1 },
  { id: 2, nombre: 'María Gómez', correo: 'maria.gomez@example.com', createdAt: '2024-02-15', id_rol: 2 },
  { id: 3, nombre: 'Carlos Sánchez', correo: 'carlos.sanchez@example.com', createdAt: '2024-03-20', id_rol: 3 },
  { id: 4, nombre: 'Laura Torres', correo: 'laura.torres@example.com', createdAt: '2024-04-25', id_rol: 4 },
  { id: 5, nombre: 'Ana Martínez', correo: 'ana.martinez@example.com', createdAt: '2024-05-30', id_rol: 1 },
  { id: 6, nombre: 'Pedro Ramírez', correo: 'pedro.ramirez@example.com', createdAt: '2024-06-10', id_rol: 2 }
];

// Obtener todas las organizaciones
export const obtenerUsuarios = async () => {
    return UsuariosDataExample;
};

// Obtener una organización por ID
export const obtenerUsuario = async (id: number) => {
    return UsuariosDataExample.find(org => org.id === id) || null;
};

// Crear una nueva organización
export const crearUsuario = async (cuerpo: any) => {
    
    return true;
};

// Editar una organización
export const editarUsuario = async (id: number, cuerpo: any) => {
    try {
        return true
    } catch (error) {
        return false
    }
};

// Eliminar una organización
export const eliminarUsuario = async (id: number): Promise<boolean> => {
    const index = UsuariosDataExample.findIndex(org => org.id === id);
    if (index !== -1) {
      UsuariosDataExample.splice(index, 1);
        return true;
    }
    return false;
};


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
  
  /*
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
};*/