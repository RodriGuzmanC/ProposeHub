
export interface LayoutPropsLib{
    children: React.ReactNode
}


export interface Organizacion {
    id: number
    nombre: string
    telefono: string
    correo: string
    created_at: string
    updated_at: string
}

export interface Cliente {
    id: number
    correo: string
    nombre: string
    telefono: string
    created_at?: string
    updated_at?: string
    organizacion: Organizacion
    contrasena_hash: string
}

export interface Servicio {
    id: number
    nombre: string
    descripcion: string
}

export interface Rol {
    id: number
    nombre: string
    descripcion: string
}

export interface Usuario {
    id: number
    nombre: string
    correo: string
    contraseña: string
    rolID: number
}

export interface Plantilla{
    id: number
    nombre: string
    contenido: string
    descripcion: string
    is_active: boolean
    created_at?: string
    updated_at?: string
}

export interface EstadosPropuesta{
    id: number
    nombre: string
    created_at?: string
    updated_at?: string

}

export interface Propuesta {
    id: number
    id_cliente?: number
    cliente?: Cliente
    id_organizacion?: number
    organizacion?: Organizacion
    id_estado?: number
    estado?: EstadosPropuesta
    id_plantilla?: number
    plantilla?: Plantilla
    id_servicio?: number
    servicio?: Servicio
    id_usuario?: number
    usuario?: Usuario
    titulo: string
    monto: number
    informacion: string | null
    created_at?: string
    updated_at?: string
    version_publicada: number | null
    html?: string | null
    css?: string | null
}


export interface VersionPropuesta {
    id: number
    id_propuesta: number
    version_numero?: number
    contenido: string
    fecha_creacion?: string
    generado_por_ia: boolean
    en_edicion: boolean
}


export const respuestaDeIaEjemplo = {
    titulo: 'Propuesta comercial para Loopsy',
    descripcion: 'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).',
    presupuesto: '2000',
    conclusion: 'Muchas gracias'
}