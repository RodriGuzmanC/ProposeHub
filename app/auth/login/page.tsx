// components/LoginForm.tsx

'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react"
import { setSession } from '@/lib/services/auth/auth'
import { loginConToast } from '@/lib/utils/alertToast'
import { loginUsuario } from '@/lib/services/usuario'

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('')
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!correo.trim() || !clave.trim()) {
      setErrorMessage('Por favor, complete todos los campos.')
      return
    }

    try {
      const userInfo = await loginConToast({
        correo: correo,
        clave: clave,
        event: loginUsuario
      })

      if (userInfo) {
        setSession(userInfo);
        window.location.href = '/contactos/personas';
      }
    } catch (error) {
      setErrorMessage('Error al iniciar sesión. Por favor, intente de nuevo.')
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 relative">
      <img
  src="https://xmarts.com/wp-content/uploads/2024/11/propuesta-comercial-impactante-xmarts-pandadoc.webp"
  alt="Login illustration"
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
        
      </div>
      <div className="w-1/2 flex items-center justify-center bg-primary">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Bienvenido de vuelta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="correo" className="text-sm font-medium text-gray-700">Correo electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="email"
                    id="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Tu correo"
                    className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="clave" className="text-sm font-medium text-gray-700">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="clave"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    placeholder="Contraseña"
                    className="pl-10 pr-12 py-2 w-full border rounded-md focus:ring-2 focus:border-transparent"
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
              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              <Button 
                type="submit" 
                className="w-full bg-primary text-white transition-all duration-300 ease-in-out"
              >
                Iniciar sesión
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
  
}*/
