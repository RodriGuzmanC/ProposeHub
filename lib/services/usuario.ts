

// lib/usuario.ts

import { getData, postData, updateData } from "../utils/methods";



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
  try {
    const data = await getData('usuarios');
    return data; // Devuelve los datos obtenidos
  } catch (error) {
    throw new Error((<Error>error).message);
  }
};

// Obtener una organización por ID
export const obtenerUsuario = async (id: number) => {
  try {
    const data = await getData(`usuarios/${id}`);
    return data; // Devuelve la organización obtenida
  } catch (error) {
    throw new Error((<Error>error).message);
  }
};

// Editar una organización
export const editarUsuario = async (id: number, cuerpo: any): Promise<boolean> => {
  try {
    const data = {
      nombre: cuerpo.nombre,
      correo: cuerpo.correo,
      id_rol: cuerpo.rol,
      contrasena: cuerpo.clave
    }
    await updateData(`usuarios/${id}`, data);
    return true; // Devuelve true si la operación se realiza correctamente
  } catch (error) {
    throw new Error((<Error>error).message);
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


export async function loginUsuario(correo: string, contrasena: string) {
  try {
    const data = {
      correo: correo,
      contrasena: contrasena
    }
    const res = await postData(`login`, data);

    return res;

  } catch (error) {
    throw new Error((<Error>error).message);
  }
}

export async function registrarUsuario(cuerpo: any) {
  try {
    const data = {
      nombre: cuerpo.nombre,
      correo: cuerpo.correo,
      contrasena: cuerpo.contrasena,
      id_rol: parseInt(cuerpo.id_rol),
    }
    const res = await postData(`register`, data);
    return res;
    /*const credentials = {
      id: 1,
      nombre: 'rodrigo',
      correo: 'rodrigo@gmail.com',
      rol_id: 1
    }

    return credentials;*/
  } catch (error) {
    throw new Error((<Error>error).message);
  }
}