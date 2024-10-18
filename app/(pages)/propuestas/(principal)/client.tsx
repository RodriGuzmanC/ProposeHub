"use client"
import ButtonTheme from '@/app/components/global/ButtonTheme'
import CustomItemCard from '@/app/components/global/CustomItemCard'
import FilterComponent from '@/app/components/global/FilterComponent'
import PropuestaCard from '@/app/components/PropuestaCard'
import { obtenerPropuestas } from '@/lib/services/propuesta'
import { Filter, Plus, Briefcase, Edit2, Eye, User, BriefcaseBusiness } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ListProposes from './ListProposes'



export default async function PropuestasClient({ data }: { data: Array<any> }) {
    

    return (
        <div className="flex flex-col w-full h-screen overflow-auto">

            <main className="flex-1 h-full">
                <div className="h-full p-6">
                    <ListProposes data={data}></ListProposes>
                </div>
            </main>
        </div>
    )
}