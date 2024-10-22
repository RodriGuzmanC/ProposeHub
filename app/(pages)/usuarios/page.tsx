"use server"
import UsuariosClientPage from './client'
import { obtenerUsuarios } from '@/lib/services/usuario'



export default async function UsuariosServePage() {
  
  const usuarios = await obtenerUsuarios()

  return (
    <UsuariosClientPage usuarios={usuarios} ></UsuariosClientPage>
  );
}
