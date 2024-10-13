"use client"
import ContactInfoCard from '@/app/components/contactos/ContactInfoCard'
import { Filter, Plus, Briefcase, Edit2, Eye, Building2, User, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import FilterComponent from '@/app/components/global/FilterComponent'
import { Button } from '@/components/ui/button'
import ButtonTheme from '@/app/components/global/ButtonTheme'
import { UsuariosDataExample } from '@/lib/api'
import CustomItemCard from '@/app/components/global/CustomItemCard'


const usuarios = UsuariosDataExample

const simulateLoading = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Carga completa');
    }, 3000); // 3000 milisegundos = 3 segundos
  });
};

// Uso de la función
const loadData = async (): Promise<void> => {
  console.log('Iniciando carga...');
  const result = await simulateLoading();
  console.log(result); // Imprime "Carga completa" después de 3 segundos
};

export default function PersonasModulo() {
  const [filteredData, setFilteredData] = useState(usuarios);
  
  return (
    <div className="flex flex-col w-full h-screen overflow-auto">
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
            {filteredData.map((usuario) => (
              /*<ContactInfoCard
                key={usuario.id}
                id={usuario.id}
                correo={usuario.correo}
                nombre={usuario.nombre}
              />*/
              <CustomItemCard
                id={usuario.id}
                nombre={usuario.nombre}
                elementos={[
                  usuario.correo
                ]}
                verHref='/viewer/123'
                editarHref={`/usuarios/editar/${usuario.id}`}
                IconCard={UserRound}
              ></CustomItemCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
