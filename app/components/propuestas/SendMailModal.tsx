'use client'

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import ModalBackground from "../global/ModalBackground"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, X } from "lucide-react"
import { enviarCoreoACliente, obtenerClientes } from "@/lib/services/cliente"
import { EnviarCorreoConToast } from "@/lib/utils/alertToast"


export default function SendMailProposeModal({ cerrarModalEvent, idOrganizacion, urlPropuesta }: { cerrarModalEvent: () => void, idOrganizacion: number | undefined, urlPropuesta: string }) {
    const [clients, setClients] = useState<{ id: string; name: string }[]>([])
    const [selectedClients, setSelectedClients] = useState<string[]>([])

    const [clientesData, setClientesData] = useState<any>([])


    useEffect(() => {
        async function obtenerClientesDeOrganizacion() {
            try {
                const clientes = await obtenerClientes();
                console.log("Clientes")
                console.log(clientes)

                const clientesDeOrganizacion = clientes.filter((cliente: any) => cliente.id_organizacion === idOrganizacion);
                setClientesData(clientesDeOrganizacion);
                console.log("CLIENTES FILTRADOS YA")
                console.log(clientesData)
            } catch (error) {
                console.error("Error al obtener clientes:", error);
            }
        }

        obtenerClientesDeOrganizacion(); // Llamar a la función aquí
    }, [idOrganizacion]);

    const handleClientChange = (clientId: string, isChecked: boolean) => {
        setSelectedClients((prev) =>
            isChecked ? [...prev, clientId] : prev.filter((id) => id !== clientId)
        )
    }


    async function realizarEnvio(datosClientes: any) {
        for (const cliente of datosClientes) {
            console.log(cliente.correo)
            const data = {
                correo: cliente.correo,
                contrasena: cliente.contrasena_hash,
                propuesta_url: urlPropuesta
            }
            await EnviarCorreoConToast({
                cuerpo: data,
                event: enviarCoreoACliente // Asegúrate de que esto también esté correctamente definido
            });
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Clientes seleccionados:", selectedClients)
        const datosDeClientes = clientesData.filter((cliente: any) =>
            selectedClients.includes(cliente.id)
        );
        console.log(datosDeClientes)
        realizarEnvio(datosDeClientes)
    }

    return (
        <ModalBackground>
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1 bg-gray-50">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold text-gray-800">Selección de Clientes</CardTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={cerrarModalEvent}
                            className="rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <X className="h-6 w-6 text-gray-500" />
                            <span className="sr-only">Cerrar</span>
                        </Button>
                    </div>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 pt-4">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-700">Clientes de la organización:</h3>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-lg font-semibold text-gray-700">Selecciona clientes</Label>

                            {clientesData && clientesData.length > 0 ? (
                                <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                                    {clientesData.map((client: any) => (
                                        <div key={client.id} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md transition-colors">
                                            <Checkbox
                                                id={client.id}
                                                checked={selectedClients.includes(client.id)}
                                                onCheckedChange={(checked: any) => handleClientChange(client.id, checked as boolean)}
                                                className="border-2 border-gray-300"
                                            />
                                            <Label htmlFor={client.id} className="flex-grow cursor-pointer text-gray-700">{client.nombre}</Label>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center space-x-2 text-gray-500 py-4">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <p>Cargando clientes...</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50">
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            Enviar
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            {/*<Card>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 relative">
                    <button onClick={cerrarModalEvent}>
                        <X className="absolute top-3 right-3"></X>
                    </button>
                    <div className="space-y-2">
                        Clientes de la organizacion:
                    </div>

                    <div className="space-y-2">
                        <Label>Selecciona clientes</Label>

                        {clientesData && clientesData.length > 0 ? (
                            clientesData.map((client : any) => (
                                <div key={client.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={client.id}
                                        checked={selectedClients.includes(client.id)}
                                        onCheckedChange={(checked: any) => handleClientChange(client.id, checked as boolean)}
                                    />
                                    <Label htmlFor={client.id}>{client.nombre}</Label>
                                </div>
                            ))
                        ) : (
                            <p>Cargando cliente.....</p> // Mensaje cuando no hay clientes
                        )}
                    </div>

                    <Button type="submit">Enviar</Button>
                </form>
            </Card>*/}
        </ModalBackground>
    )
}