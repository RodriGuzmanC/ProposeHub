import PagesLoading from '@/app/components/skeletons/PagesLoading';
import { obtenerPropuesta } from '@/lib/services/propuesta';
import React from 'react'
import PropuestaDetalle from './client';
import { obtenerClientesDeOrganizacion } from '@/lib/services/cliente';

type PageProps = {
    params: {
        id: string;
    }
}
export default async function page({params} : PageProps) {
    const { id } = params
    const propuesta = await obtenerPropuesta(parseInt(id));

    if (propuesta == undefined) return <PagesLoading></PagesLoading>
    return (
        <PropuestaDetalle data={propuesta}></PropuestaDetalle>
    )
}
