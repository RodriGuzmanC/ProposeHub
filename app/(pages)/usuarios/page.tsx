import ContactInfoCard from '@/app/components/contactos/ContactInfoCard'
import { Filter, Plus, Briefcase, Edit2, Eye, Building2, User, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import FilterComponent from '@/app/components/global/FilterComponent'
import { Button } from '@/components/ui/button'
import ButtonTheme from '@/app/components/global/ButtonTheme'
import CustomItemCard from '@/app/components/global/CustomItemCard'
import UsuariosClientPage from './client'
import { obtenerUsuarios } from '@/lib/services/usuario'



export default async function UsuariosServePage() {
  
  const usuarios = await obtenerUsuarios()

  return (
    <UsuariosClientPage usuarios={usuarios} ></UsuariosClientPage>
  );
}
