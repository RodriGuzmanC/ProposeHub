'use client'
import ButtonTheme from '@/app/components/global/ButtonTheme';
import CustomItemCard from '@/app/components/global/CustomItemCard';
import FilterComponent from '@/app/components/global/FilterComponent';
import ProposeCard from '@/app/components/propuestas/ProposeCard';
import SendMailProposeModal from '@/app/components/propuestas/SendMailModal';
import { eliminarPropuesta, obtenerPropuestas } from '@/lib/services/propuesta';
import { Briefcase, BriefcaseBusiness } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'



export default function ListProposes({ data }: any) {

    /** Funcion para abrir el modal de envio de correos */
    const [modalEnviarCorreo, setModalEnviarCorreo] = useState(false)
    const [organizacionActual, setOrganizacionActual] = useState<number>()
    const [urlPropuesta, setUrlPropuesta] = useState('')

    function mostrarModal(idOrganizacion: number, urlPropuesta: string){
        setModalEnviarCorreo(true)
        setOrganizacionActual(idOrganizacion)
        setUrlPropuesta(urlPropuesta)
    }

    function cerrarModal(){
        setModalEnviarCorreo(false)

    }


    async function eliminarFun(id: number) {
        await eliminarPropuesta(id)
        const propuestas = await obtenerPropuestas();
        setFilteredProposals(propuestas)
    }

    /** Carga de propuestas */
    const searchParams = useSearchParams()
    const [filteredProposals, setFilteredProposals] = useState(data);

    useEffect(() => {
        const search = searchParams.get('estado') ?? '1';
        const filteredPropuestas = data.filter((propuesta: any) => propuesta.id_estado.toString() === search);
        setFilteredProposals(filteredPropuestas);
    }, [searchParams, data]);

    return (
        <div>
            {modalEnviarCorreo ? <SendMailProposeModal urlPropuesta={urlPropuesta} idOrganizacion={organizacionActual} cerrarModalEvent={cerrarModal}></SendMailProposeModal> : ''}
            <div className="w-full">
                <div className="flex space-x-4 mb-6 items-end">
                    <h3 className='text-2xl font-bold'>Propuestas</h3>
                    <Link href={'propuestas/crear/'}>
                        <ButtonTheme>
                            <BriefcaseBusiness className="w-5 h-5 mr-2" />
                            <span>Agregar</span>
                            <span className="ml-2 bg-white bg-opacity-20 text-xs font-bold py-1 px-2 rounded-full">+</span>
                        </ButtonTheme>
                    </Link>

                </div>
            </div>
            <div className="space-y-4">
                {filteredProposals.length === 0 ? (
                    <p>No se han encontrado resultados.</p>
                ) : (
                    filteredProposals.map((filteredProposal : any) => (
                        <ProposeCard
                            key={filteredProposal.id}
                            id={filteredProposal.id}
                            nombre={filteredProposal.titulo}
                            elementos={[filteredProposal.monto, filteredProposal.estado_nombre, filteredProposal.plantilla_nombre, filteredProposal.servicio_nombre, filteredProposal.usuario_nombre]}
                            modalCorreo={()=> {
                                mostrarModal(filteredProposal.id_organizacion, `${window.location.origin}/vista/propuesta/${filteredProposal.id}`)
                            }}
                            editarHref={`/constructor/propuesta/editar/${filteredProposal.id}`}
                            IconCard={Briefcase}
                            eliminarAction={eliminarFun}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
