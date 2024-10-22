'use client'
import ButtonTheme from '@/app/components/global/ButtonTheme';
import CustomItemCard from '@/app/components/global/CustomItemCard';
import FilterComponent from '@/app/components/global/FilterComponent';
import { eliminarPropuesta } from '@/lib/services/propuesta';
import { Briefcase, BriefcaseBusiness } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ListProposes({ data }: any) {
    async function eliminarFun (id: number){
        await eliminarPropuesta(id)
    }

    const searchParams = useSearchParams()
    const [filteredProposals, setFilteredProposals] = useState(data);


    useEffect(() => {
        const search = searchParams.get('estado') ?? 'abierto';
        const filteredPropuestas = data.filter((propuesta: any) => propuesta.estado === search);
        setFilteredProposals(filteredPropuestas);
    }, [searchParams, data]);

    return (
        <div>
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
                {filteredProposals.map((filteredProposals: any) => (
                    /*<PropuestaCard numero={propuesta.id} monto={propuesta.monto}></PropuestaCard>*/
                    <CustomItemCard 
                    key={filteredProposals.id} 
                    id={filteredProposals.id} 
                    nombre={filteredProposals.titulo} 
                    elementos={[filteredProposals.monto, filteredProposals.fecha]} 
                    verHref='/propuestas/ver' 
                    editarHref={`/propuestas/editar/${filteredProposals.id}`}
                    IconCard={Briefcase}
                    eliminarAction={eliminarFun}
                    ></CustomItemCard>
                ))}
            </div>
        </div>
    )
}
