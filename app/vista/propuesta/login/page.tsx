'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { loginConToast } from '@/lib/utils/alertToast'
import { validarCredencialesCliente } from '@/lib/services/cliente'
import { toast } from 'react-toastify'
import { getRedirection, setClientSession } from '@/lib/services/auth/auth'
import { deleteCookie, getCookie } from '@/lib/services/auth/cookies'

export default function LoginForm() {
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Correo:', correo)
    console.log('Clave:', clave)

    try {
      const clienteInfo = await loginConToast({
        correo: correo,
        clave: clave,
        event: validarCredencialesCliente
      })
      console.log(clienteInfo)
      if (clienteInfo) {
        setClientSession(clienteInfo)
        //const redirectTo = getCookie('redirect_to') || '/vista/propuesta/login';
      
        // Limpia la cookie después de redirigir
        //deleteCookie('redirect_to');
        
        // Redirige a la URL de destino o a la página principal
        const redirectTo = getRedirection()
        router.push(redirectTo);
        //console.log(redirectTo)
        toast.success("Pronto seras redireccionado a la pagina inicial..")
      }
    } catch (error) {
      console.error("Error en el inicio de sesión")
      toast.error("Error al iniciar sesión. Por favor, intente de nuevo.")
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-full flex items-center justify-center bg-primary">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="space-y-1 flex flex-col items-center justify-center">
            <img className='mb-3' src='https://th.bing.com/th/id/OIP.BMdzpSRYQGL8y7ioWhckVgHaBR?rs=1&pid=ImgDetMain' width={250}></img>
            <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="correo" className="text-sm font-medium text-gray-700">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="correo"
                    name="correo"
                    type="email"
                    placeholder="tu@email.com"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2  focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clave" className="text-sm font-medium text-gray-700">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    id="clave"
                    name="clave"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    className="pl-10 pr-12 py-2 w-full border rounded-md focus:ring-2  focus:border-transparent"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary text-white transition-all duration-300 ease-in-out"
              >
                Iniciar Sesión
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


/*'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { loginConToast } from '@/lib/utils/alertToast'
import { validarCredencialesCliente } from '@/lib/services/cliente'
import { toast } from 'react-toastify'
import { setClientSession } from '@/lib/services/auth/auth'

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
          //document.cookie = `clientInfo=${encodeURIComponent(JSON.stringify(clienteInfo))}; path=/;`;
          setClientSession(clienteInfo)
          toast.success("Vuelve a ingresar a la url")
        }
        // Por ejemplo, podrías redirigir al usuario después de un inicio de sesión exitoso
        //router.push('/vista/propuesta/')

    } catch (error) {
        console.error("Error papa")
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003A61] to-[#005691]">
      <Card className="w-full max-w-md overflow-hidden bg-white">
        <CardHeader className="space-y-1 bg-[#003A61] text-white">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="correo" className="text-sm font-medium text-gray-700">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="tu@email.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003A61] focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="clave" className="text-sm font-medium text-gray-700">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="clave"
                  name="clave"
                  type="password"
                  placeholder="••••••••"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003A61] focus:border-transparent"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#003A61] hover:bg-[#004b7d] text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Iniciar Sesión
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
        
      </Card>
    </div>
  )
  
}*/