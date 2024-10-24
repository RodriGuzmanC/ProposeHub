
export interface LayoutPropsLib{
    children: React.ReactNode
}


export interface OrganizacionInterface {
    id?: number
    nombre?: string
    telefono?: string
    correo?: string
    created_at?: string
    updated_at?: string
}

export interface ClienteInterface {
    id: number
    correo: string
    nombre: string
    telefono: number
    organizacionID: number
}

export interface ServicioInterface {
    id: number
    nombre: string
}

export interface RolInterface {
    id: number
    nombre: string
    descripcion: string
}

export interface UsuarioInterface {
    id: number
    nombre: string
    correo: string
    contraseña: string
    rolID: number
}

export interface PlantillaInterface{
    id: number
    nombre: string
    contenido: string
    updateAt: string
}

export interface PropuestaInterface {
    id: number
    clienteID: number
    organizacionID: number
    titulo: string
    monto: number
    estadoID: number
    plantillaID: number
    servicioID: number
    usuarioID: number
}

export interface EstadoPropuestaInterface {
    id: number
    nombre: string
}

export interface VersionPropuestaInterface {
    id: number
    propuestaID: number
    versionNumero: number
    contenido: string
}
