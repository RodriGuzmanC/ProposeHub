'use client'

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import ModalBackground from "../global/ModalBackground"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import { enviarCoreoACliente, obtenerClientes } from "@/lib/services/cliente"
import { EnviarCorreoConToast } from "@/lib/utils/alertToast"


export default function SendMailProposeModal({ cerrarModalEvent, idOrganizacion, urlPropuesta }: { cerrarModalEvent: () => void, idOrganizacion: number | undefined, urlPropuesta:string }) {
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


    async function realizarEnvio(datosClientes: any){
        for (const cliente of datosClientes) {
            console.log(cliente.correo)
            const data = {
                correo: cliente.correo,
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
            <Card>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 relative">
                    <button onClick={cerrarModalEvent}>
                        <X className="absolute top-3 right-3"></X>
                    </button>
                    <div className="space-y-2">
                        Organizacion aqui
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
                            <p>No hay clientes disponibles.</p> // Mensaje cuando no hay clientes
                        )}
                    </div>

                    <Button type="submit">Enviar</Button>
                </form>
            </Card>
        </ModalBackground>
    )
}