"use client"
import ButtonTheme from '@/app/components/global/ButtonTheme'
import CustomItemCard from '@/app/components/global/CustomItemCard'
import FilterComponent from '@/app/components/global/FilterComponent'
import { eliminarOrganizacion } from '@/lib/services/organizacion'
import { Building, Building2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'



export default function OrganizacionClient({data}: any) {
    
    async function eliminarFun (id: number){
        await eliminarOrganizacion(id)
    }

    const [filteredData, setFilteredData] = useState(data);

    return (
        <div className="flex flex-col w-full h-screen overflow-auto">
            <main className="flex-1 h-full">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-4 w-full">

                            {/*<FilterComponent data={data} onFilteredDataChange={setFilteredData}>*/}
                                <h3 className='text-2xl font-bold'>Organizaciones</h3>
                                <Link href={'organizaciones/crear'}>
                                    <ButtonTheme >
                                        <Building2 className="w-5 h-5 mr-2" />
                                        <span>Agregar</span>
                                        <span className="ml-2 bg-white bg-opacity-20 text-xs font-bold py-1 px-2 rounded-full">+</span>
                                    </ButtonTheme>
                                </Link>
                            {/*</FilterComponent>*/}

                        </div>
                    </div>
                    <div className="space-y-4">
                        {filteredData.map((organization : any) => (
                            <CustomItemCard 
                            key={organization.id} 
                            IconCard={Building} 
                            editarHref={`organizaciones/editar/${organization.id}`} 
                            verHref={`organizaciones/ver/${organization.id}`} id={organization.id} 
                            eliminarAction={eliminarFun}
                            nombre={organization.nombre} 
                            elementos={[organization.correo, organization.telefono]}></CustomItemCard>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}