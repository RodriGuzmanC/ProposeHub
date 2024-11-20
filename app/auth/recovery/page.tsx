'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { recuperarContrasena } from '@/lib/services/auth/recovery'
import { recuperarContrasenaConToast } from '@/lib/utils/alertToast'

export default function Component() {
    const [email, setEmail] = useState('')

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const url = process.env.NEXT_PUBLIC_ROOT;
        const urlRecovery = `${url}/auth/recovery/reset/?token=`

        const res = await recuperarContrasenaConToast({
            correo: email,
            recuperarRuta: urlRecovery,
            event: recuperarContrasena
        })
        console.log(res)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-popover">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Recuperar Contraseña</CardTitle>
                    <CardDescription>Ingresa tu correo electrónico para recuperar tu cuenta</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="tu@ejemplo.com"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={!email}>
                            Recuperar Cuenta
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}