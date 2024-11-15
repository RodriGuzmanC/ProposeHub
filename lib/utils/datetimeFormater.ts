export function formatearFecha(fecha: string): string {
    const date = new Date(fecha);

    // Usamos Intl.DateTimeFormat para dar un formato más amigable
    const opciones: Intl.DateTimeFormatOptions = {
        weekday: 'long', // Día de la semana, opcional
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Usar formato de 24 horas
    };

    // Retorna la fecha formateada
    return new Intl.DateTimeFormat('es-ES', opciones).format(date);
}

export function formatearFechaSimple(fecha: string): string {
    const date = new Date(fecha);

    // Opciones para mostrar solo el día, mes y año
    const opciones: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    // Retorna la fecha formateada como 'día de mes de año'
    return new Intl.DateTimeFormat('es-ES', opciones).format(date);
}