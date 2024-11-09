// components/LoginForm.tsx
'use client'
import React, { FormEvent, useState } from 'react'
import { loginUsuario } from '@/lib/services/usuario'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { loginConToast } from '@/lib/utils/alertToast'
import { ArrowRight, Lock, Mail } from 'lucide-react'
import { setSession } from '@/lib/services/auth/auth'

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('')
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const router = useRouter()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userInfo = await loginConToast({
      correo: correo,
      clave: clave,
      event: loginUsuario
    })

    //const userInfo = await loginUsuario(correo, clave)
    console.log(userInfo)
    if (userInfo) {
      setSession(userInfo);

      window.location.href = '/contactos/personas';
    }

    

    /*if (result.success) {
      // Redirigir al usuario a la página de contactos
      router.push('/contactos')
    } else {
      // Mostrar mensaje de error si la autenticación falla
      setErrorMessage(result.message || 'Login failed. Please check your credentials.')
    }*/
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003A61] to-[#005691]">
      <Card className="w-full max-w-md overflow-hidden bg-white">
        <CardHeader className="space-y-1 bg-[#003A61] text-white">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Bienvenido de vuelta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="email"
                  value={correo}
                  id='correo'
                  name='correo'
                  onChange={(e) => { setCorreo(e.currentTarget.value) }}
                  placeholder="Tu correo"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003A61] focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="password"
                  id='clave'
                  name='clave'
                  value={clave}
                  onChange={(e) => { setClave(e.currentTarget.value) }}
                  placeholder="Contraseña"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-[#003A61] focus:border-transparent"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#003A61] hover:bg-[#004b7d] text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
        
      </Card>
    </div>
  )
  /*return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">User Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin}>
            <div className="space-y-2">
              <Input
                type="email"
                value={correo}
                id='correo'
                name='correo'
                onChange={(e)=>{setCorreo(e.currentTarget.value)}}
                placeholder="Tu correo"
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                id='clave'
                name='clave'
                value={clave}
                onChange={(e)=>{setClave(e.currentTarget.value)}}
                placeholder="Contraseña"
                className="w-full"
                required
              />
            </div>
            <CardFooter className="flex flex-col mt-4">
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Login
              </Button>
              <div className="mt-4 text-sm text-center">
                <Link href="#" className="text-blue-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )*/
}
