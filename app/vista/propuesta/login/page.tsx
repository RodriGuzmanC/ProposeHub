'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Mail, Lock } from 'lucide-react'
import { loginConToast } from '@/lib/utils/alertToast'
import { validarCredencialesCliente } from '@/lib/services/cliente'
import { toast } from 'react-toastify'

export default function LoginForm() {
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
    console.log('Nombre:', correo)
    console.log('Clave:', clave)

    try {

        const clienteInfo = await loginConToast({
            correo: correo,
            clave: clave,
            event: validarCredencialesCliente
        })
        console.log(clienteInfo)
        // Guardamos los datos del cliente
        if (clienteInfo) {
          document.cookie = `clientInfo=${encodeURIComponent(JSON.stringify(clienteInfo))}; path=/;`;
          toast.success("Vuelve a ingresar a la url")
        }
        // Por ejemplo, podrías redirigir al usuario después de un inicio de sesión exitoso
        //router.push('/vista/propuesta/')

    } catch (error) {
        console.error("Error papa")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="correo">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <Input
                id="correo"
                name="correo"
                type="email"
                placeholder="tu@email.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="clave">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <Input
                id="clave"
                name="clave"
                type="password"
                placeholder="••••••••"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Iniciar Sesión
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}