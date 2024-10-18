"use server"

import { obtenerClientes } from "@/lib/services/cliente";
import PersonasClient from "./client";


export default async function PersonasServer() {
  
  const data = await obtenerClientes()

  return (
    <PersonasClient data={data}></PersonasClient>
  );
}
