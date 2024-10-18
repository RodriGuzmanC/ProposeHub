"use server"
import { obtenerOrganizaciones } from '@/lib/services/organizacion'
import OrganizacionClient from './client'




export default async function Contactos() {

    const data = await obtenerOrganizaciones()
    
    return (
        <OrganizacionClient data={data}></OrganizacionClient>
    )
}