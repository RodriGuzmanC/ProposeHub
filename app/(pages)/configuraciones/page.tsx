"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { editarConToast } from "@/lib/utils/alertToast"
import { actualizarContrasenaUsuario } from "@/lib/services/usuario"

export default function UserSettings() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (newPassword !== confirmPassword) {
      setError("Las nuevas contraseñas no coinciden.")
      return
    }

    if (newPassword.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres.")
      return
    }

    // Aquí iría la lógica para cambiar la contraseña en el backend
    // Por ahora, simularemos una respuesta exitosa después de un breve retraso
    try {
      await editarConToast({
        id: 1,
        cuerpo: {
          contrasena_actual: currentPassword,
          contrasena_nueva: newPassword,
        },
        event: actualizarContrasenaUsuario
      })
      setSuccess(true)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      // Contraseña de eduis.carranza123@gmail.com : $2y$12$JDKdCtdowIUWzu52TKE2t.SxLdiWD3lc0pefojEb3LgBru.WFALKe
      
    } catch (err) {
      setError("Ocurrió un error al cambiar la contraseña. Por favor, inténtalo de nuevo.")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto text-primary">
      <CardHeader>
        <CardTitle>Configuración de Usuario</CardTitle>
        <CardDescription className="text-primary">Cambia tu contraseña aquí</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Contraseña actual</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Nueva contraseña</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="default" className="border-green-500 bg-green-50 text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Contraseña cambiada exitosamente.</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Cambiar Contraseña
        </Button>
      </CardFooter>
    </Card>
  )
}