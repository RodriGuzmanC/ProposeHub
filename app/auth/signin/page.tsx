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

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('')
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const router = useRouter()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(correo, clave)
    const userInfo = await loginUsuario(correo, clave)
    console.log(userInfo)
    /*if (userInfo) {
      document.cookie = `userInfo=${encodeURIComponent(JSON.stringify(userInfo))}; path=/;`;

      router.push('/contactos/personas')
    }*/

    /*await loginConToast({
      correo: correo,
      clave: clave,
      event: loginUsuario
    })*/

    /*if (result.success) {
      // Redirigir al usuario a la página de contactos
      router.push('/contactos')
    } else {
      // Mostrar mensaje de error si la autenticación falla
      setErrorMessage(result.message || 'Login failed. Please check your credentials.')
    }*/
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Registrate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorMessage && (
            <div className="text-red-500 text-center">
              {errorMessage}
            </div>
          )}
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
  )
}
