
import { obtenerPropuestas } from '@/lib/services/propuesta'
import PropuestasClient from './client'



export default async function Propuestas() {

  const propuestas = await obtenerPropuestas();

  return (
    <PropuestasClient data={propuestas}></PropuestasClient>
  )
}
