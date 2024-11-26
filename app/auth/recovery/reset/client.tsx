'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cambiarContrasena, validarToken } from '@/lib/services/auth/recovery'
import { cambiarContrasenaConToast } from '@/lib/utils/alertToast'
import { Suspense } from 'react';

export default function RecoveryPassClient({tokenParam} : {tokenParam: string}) {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmWord, setConfirmWord] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isButtonEnabled, setIsButtonEnabled] = useState(false)
    const [passwordMismatch, setPasswordMismatch] = useState(false)
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState<number | null>(null)
    const [isTokenValid, setIsTokenValid] = useState(false)  // Estado para controlar la validez del token
    const [isSubmitting, setIsSubmitting] = useState(false)  // Estado para manejar la solicitud

    // Estado para habilitar el botón de envío solo cuando los campos sean válidos
    useEffect(() => {
        const passwordsMatch = newPassword === confirmPassword
        const confirmWordCorrect = confirmWord.toLowerCase() === 'confirmar'
        const allFieldsFilled = newPassword && confirmPassword && confirmWord
        if(passwordsMatch && confirmWordCorrect && allFieldsFilled){
            setIsButtonEnabled(true)
        }
        setPasswordMismatch(newPassword !== '' && confirmPassword !== '' && !passwordsMatch)
    }, [newPassword, confirmPassword, confirmWord])

    //const searchParams = useSearchParams()

    // Validación del token y obtención de datos del usuario
    useEffect(() => {
        //const tokenFromQuery = searchParams.get('token') ?? ''
        const tokenFromQuery = tokenParam ?? ''

        setToken(tokenParam)

        if (tokenFromQuery) {
            // Validar el token al cargar la página
            validarToken(tokenFromQuery).then((response) => {
                if (response) {
                    setUserId(response.id_usuario)  // Guardar el ID del usuario
                    setIsTokenValid(true)  // Token válido, mostrar formulario
                } else {
                    setIsTokenValid(false)  // Token no válido, ocultar formulario
                }
            })
        }
    }, [])

    // Enviar el formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (isSubmitting) return;  // Evitar envíos si ya hay una solicitud en curso

        setIsSubmitting(true);  // Iniciar la solicitud

        try {
            // Cambiar la contraseña
            if (userId && token) {
                await cambiarContrasenaConToast({
                    id_usuario: userId,
                    contrasena: newPassword,
                    event: cambiarContrasena
                })
                console.log('Nueva contraseña establecida:', newPassword)
            }
        } catch (error) {
            console.error("Error al cambiar la contraseña", error)
        } finally {
            setIsSubmitting(false);  // Finalizar la solicitud, habilitar el botón nuevamente
        }
    }



    // Si el token no es válido, no mostrar el formulario
    if (!isTokenValid) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <p>Token no válido o expirado. Por favor, revisa el enlace o intenta nuevamente.</p>
        </div>
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
        <div className="flex items-center justify-center min-h-screen bg-popover">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Establecer Nueva Contraseña</CardTitle>
                    <CardDescription>Por favor, ingresa y confirma tu nueva contraseña</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">Nueva Contraseña</Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Repetir Nueva Contraseña</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </Button>
                            </div>
                            {passwordMismatch && (
                                <p className="text-sm text-red-500 mt-1">Las contraseñas no coinciden</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmWord">Escribe "Confirmar"</Label>
                            <Input
                                id="confirmWord"
                                type="text"
                                value={confirmWord}
                                onChange={(e) => setConfirmWord(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full"  disabled={!isButtonEnabled || isSubmitting}>
                            Recuperar Cuenta
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
        </Suspense>
    )
}
