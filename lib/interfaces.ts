export interface OrganizacionInterface {
    id: number
    nombre: string
    telefono: number
    correo: string
}

export interface ContactoInterface {
    id: number
    correo: string
    nombre: string
    telefono: number
    organizacion: number
    estado: string
}