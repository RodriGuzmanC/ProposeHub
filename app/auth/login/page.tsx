// components/LoginForm.tsx
'use client'
import React, { FormEvent, useState } from 'react'
import { login } from '@/lib/services/usuario'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formEntries = Object.fromEntries(formData.entries())
    console.log(formEntries)
    //const result = await login(username, password)

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
          <CardTitle className="text-2xl font-semibold text-center">User Login</CardTitle>
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
                type="text"
                id='user'
                name='user'
                placeholder="Username"
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                id='password'
                name='password'
                placeholder="Password"
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
