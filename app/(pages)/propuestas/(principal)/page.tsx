"use client"

import useSWR from 'swr'
import ListProposes from './ListProposes'
import ErrorInterface from '@/app/components/global/ErrorInterface'
import PagesLoading from '@/app/components/skeletons/PagesLoading'
import { obtenerPropuestas } from '@/lib/services/propuesta'
import { Propuesta } from '@/lib/utils/definitions'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'



export default function PropuestasClient() {

    /** Carga los datos */
    const { data, error, isLoading, mutate } = useSWR<Propuesta[]>(`/propuestas`, ()=>obtenerPropuestas('1'))

    if (error) return <ErrorInterface></ErrorInterface>
    if (data == undefined) return <PagesLoading></PagesLoading>
    if (isLoading) return <PagesLoading></PagesLoading>
    
    return (
        <div className="flex flex-col w-full h-screen overflow-auto">

            <main className="flex-1 h-full">
                <div className="h-full p-6 overflow-auto">
                    <ListProposes data={data}></ListProposes>
                </div>
            </main>
        </div>
    )
}