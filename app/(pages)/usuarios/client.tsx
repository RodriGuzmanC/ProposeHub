"use client"
import ContactInfoCard from '@/app/components/contactos/ContactInfoCard'
import { Filter, Plus, Briefcase, Edit2, Eye, Building2, User, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import FilterComponent from '@/app/components/global/FilterComponent'
import { Button } from '@/components/ui/button'
import ButtonTheme from '@/app/components/global/ButtonTheme'
import CustomItemCard from '@/app/components/global/CustomItemCard'
import { eliminarUsuario } from '@/lib/services/usuario'





export default function UsuariosClientPage({ usuarios }: any) {

    const [filteredData, setFilteredData] = useState([]);

    async function eliminarFun(id: number) {
        await eliminarUsuario(id)
    }

    useEffect(() => {
        setFilteredData(usuarios);
      }, [usuarios]);

    return (
        <div className="flex flex-col w-full h-screen overflow-auto bg-white text-primary">
            <main className="flex-1 h-full">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <FilterComponent data={usuarios} onFilteredDataChange={setFilteredData}>
                            <h3 className='text-2xl font-bold'>Usuarios del Sistema</h3>
                            <Link href={'usuarios/crear'}>
                                <ButtonTheme>
                                    <User className="w-5 h-5 mr-2" />
                                    <span>Agregar</span>
                                    <span className="ml-2 bg-white bg-opacity-20 text-xs font-bold py-1 px-2 rounded-full">+</span>
                                </ButtonTheme>
                            </Link>
                        </FilterComponent>
                    </div>
                    <div className="space-y-4">
                        {filteredData.map((usuario: any) => (
                            
                            <CustomItemCard
                                id={usuario.id}
                                nombre={usuario.nombre}
                                elementos={[
                                    usuario.correo
                                ]}
                                verHref='/viewer/123'
                                editarHref={`/usuarios/editar/${usuario.id}`}
                                IconCard={UserRound}
                                eliminarAction={eliminarFun}
                            ></CustomItemCard>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
