"use server"

import { obtenerClientes } from "@/lib/services/cliente";
import PersonasVistaClient from "./client";



export default async function PersonasServer() {
  
  const data = await obtenerClientes()

  return (
    <PersonasVistaClient data={data}></PersonasVistaClient>
  );
}
