
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
    clienteID: number | null
    organizacionID: number
    titulo: string
    monto: number
    estadoID: number
    plantillaID: number
    servicioID: number
    usuarioID: number
    informacion: string | null
    createdAt: string
    updatedAt: string
    versionPublicadaID: number | null
    html: string | null
    css: string | null
}

export interface EstadoPropuestaInterface {
    id: number
    nombre: string
}

export interface VersionPropuestaInterface {
    id: number
    id_propuesta: number
    version_numero: number
    contenido: string
    fecha_creacion: string
    en_edicion: boolean
}


export const respuestaDeIaEjemplo = {
    titulo: 'Propuesta comercial para Loopsy',
    descripcion: 'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).',
    presupuesto: '2000',
    conclusion: 'Muchas gracias'
}