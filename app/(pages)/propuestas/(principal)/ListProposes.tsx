'use client'
import ButtonTheme from '@/app/components/global/ButtonTheme';
import ProposeCard from '@/app/components/propuestas/ProposeCard';
import SendMailProposeModal from '@/app/components/propuestas/SendMailModal';
import { eliminarPropuesta, obtenerPropuestas } from '@/lib/services/propuesta';
import { formatearFecha, formatearFechaSimple } from '@/lib/utils/datetimeFormater';
import { Propuesta } from '@/lib/utils/definitions';
import { Briefcase, BriefcaseBusiness } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'



export default function ListProposes({ data }: {data: Propuesta[]}) {

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
        //const propuestas = await obtenerPropuestas();
        //setFilteredProposals(propuestas)
    }

    /** Carga de propuestas */
    const searchParams = useSearchParams()
    const [filteredProposals, setFilteredProposals] = useState<Propuesta[]>(data);
    console.log(data)
    useEffect(() => {
        const search = searchParams.get('estado') ?? '1';
        const filteredPropuestas = data.filter((propuesta: Propuesta) => propuesta.estado?.id.toString() === search);
        console.log("Propuestas")
        console.log(filteredPropuestas)
        setFilteredProposals(filteredPropuestas);
    }, [searchParams, data]);

    return (
        <div>
            {/*modalEnviarCorreo ? <SendMailProposeModal urlPropuesta={urlPropuesta} idOrganizacion={organizacionActual} cerrarModalEvent={cerrarModal}></SendMailProposeModal> : ''*/}
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
                    filteredProposals.map((filteredProposal : Propuesta) => (
                        <ProposeCard
                            key={filteredProposal.id}
                            id={filteredProposal.id}
                            nombre={filteredProposal.titulo}
                            elementos={
                                [`S/${filteredProposal.monto}`, 
                                    filteredProposal.servicio?.nombre ?? '', 
                                    formatearFechaSimple(filteredProposal.created_at ?? '')
                                ]}
                            modalCorreo={()=> {
                                mostrarModal(filteredProposal.organizacion?.id ?? 0, `${window.location.origin}/vista/propuesta/${filteredProposal.id}`)
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
