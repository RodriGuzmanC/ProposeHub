import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import ModalBackground from "../global/ModalBackground";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, X } from "lucide-react";
import { enviarCoreoACliente, obtenerClientes, obtenerClientesDeOrganizacion } from "@/lib/services/cliente";
import { EnviarCorreoConToast } from "@/lib/utils/alertToast";
import type { Plugin } from 'grapesjs';
import ReactDOM from 'react-dom'; // Asegúrate de importar ReactDOM correctamente
import { obtenerPropuesta } from "@/lib/services/propuesta";

interface OptionsInterface{
    slug: number,
}

export const MailModalPlugin: Plugin<OptionsInterface> = (editor, opts) => {
    // Referencia al modal que se crea para contener al plugin
    let modalContainer: HTMLDivElement | null = null;
    // Obtener el panel de acción donde están los botones
    const actionButtonsPanel = editor.Panels.getPanel('action-buttons');
    
    // Verificar si el panel ya contiene botones
    const existingButtons = actionButtonsPanel ? actionButtonsPanel.get('buttons') : [];

    
    // Panel de botones en el panel de acción de GrapesJS
    editor.Panels.addPanel({
        id: 'enviar-correo-boton',
        el: '.panel__action-buttons', // Asegúrate de que esta clase exista en tu HTML
        buttons: [
            {
                id: 'enviar-correo',
                command() {
                    if (!modalContainer) {
                        // Crear un contenedor para el modal solo si no existe
                        modalContainer = document.createElement("div");
                        modalContainer.id = "modal-container";  // Puedes agregar un id si lo deseas
                        document.body.appendChild(modalContainer);  // Lo añadimos al body del documento
                    }

                    // Renderizar el modal dentro del contenedor
                    abrirModalCorreo(modalContainer);
                },
                className: '', // Cambié el icono a uno más adecuado
                attributes: { title: 'Enviar Propuesta' },
                label: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M20 4H6c-1.103 0-2 .897-2 2v5h2V8l6.4 4.8a1.001 1.001 0 0 0 1.2 0L20 8v9h-8v2h8c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-7 6.75L6.666 6h12.668L13 10.75z"></path><path d="M2 12h7v2H2zm2 3h6v2H4zm3 3h4v2H7z"></path></svg>`  // El texto que aparece junto al ícono
            },
        ],
    });

    // Función para montar el modal dentro del contenedor creado
    const abrirModalCorreo = (container: HTMLDivElement) => {
        const { slug } = opts;

        // Renderizar el modal de React en el contenedor dinámico
        ReactDOM.render(
            <SendMailProposeModal
                cerrarModalEvent={() => cerrarModalCorreo(container)}
                slug={slug}
            />,
            container
        );
    };

    // Función para cerrar el modal y limpiar el contenedor
    const cerrarModalCorreo = (container: HTMLDivElement) => {
        // Desmontar el componente React
        ReactDOM.unmountComponentAtNode(container);
        // Eliminar el contenedor del DOM
        document.body.removeChild(container);
        // Opcional: Reiniciar la referencia del contenedor
        modalContainer = null;
    };

};


export default function SendMailProposeModal({ cerrarModalEvent, slug }: { cerrarModalEvent: () => void, slug: number | undefined }) {

    const [clients, setClients] = useState<{ id: string; name: string }[]>([]);
    const [selectedClients, setSelectedClients] = useState<string[]>([]);
    const [clientesData, setClientesData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);  // Agregar estado de carga

    useEffect(() => {
        async function cargarClientesDeOrganizacion() {
            try {
                if (!slug) {
                    throw new Error("No se porporciono el id de la propuesta")
                    
                }
                const propuesta = await obtenerPropuesta(slug)

                const clientesDeOrganizacion = await obtenerClientesDeOrganizacion(propuesta.id_organizacion);
                console.log("Clientes obtenidos de bd");
                console.log(clientesDeOrganizacion);

                /*const clientesDeOrganizacion = clientes.filter((cliente: any) =>
                    cliente.id_organizacion === Number(idOrganizacion) // Fuerza la conversión de `idOrganizacion` a número
                );*/
                setClientesData(clientesDeOrganizacion);  // Actualiza el estado con los datos filtrados
                setLoading(false);  // Deja de mostrar el estado de "Cargando"
            } catch (error) {
                console.error("Error al obtener clientes:", error);
                setLoading(false);  // En caso de error también cambia el estado de carga
            }
        }

        if (slug) {
            setLoading(true);  // Cuando se hace una nueva llamada, activamos el estado de carga
            cargarClientesDeOrganizacion();  // Llamar a la función aquí
        }
    }, [slug]);

    const handleClientChange = (clientId: string, isChecked: boolean) => {
        setSelectedClients((prev) =>
            isChecked ? [...prev, clientId] : prev.filter((id) => id !== clientId)
        );
    };

    async function realizarEnvio(datosClientes: any) {
        for (const cliente of datosClientes) {
            console.log(cliente.correo);
            const data = {
                correo: cliente.correo,
                contrasena: cliente.contrasena_hash,
                organizacion: cliente.organizacion,
                propuesta_url: `${process.env.NEXT_PUBLIC_ROOT}/vista/propuesta/${slug}`
            };
            await EnviarCorreoConToast({
                cuerpo: data,
                event: enviarCoreoACliente // Asegúrate de que esto también esté correctamente definido
            });
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Clientes seleccionados:", selectedClients);
        const datosDeClientes = clientesData.filter((cliente: any) =>
            selectedClients.includes(cliente.id)
        );
        console.log(datosDeClientes);
        realizarEnvio(datosDeClientes);
    };

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

                            {loading ? (
                                <div className="flex items-center justify-center space-x-2 text-gray-500 py-4">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <p>Cargando clientes...</p>
                                </div>
                            ) : (
                                <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                                    {clientesData && clientesData.length > 0 ? (
                                        clientesData.map((client: any) => (
                                            <div key={client.id} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md transition-colors">
                                                <Checkbox
                                                    id={client.id}
                                                    checked={selectedClients.includes(client.id)}
                                                    onCheckedChange={(checked: any) => handleClientChange(client.id, checked as boolean)}
                                                    className=""
                                                />
                                                <Label htmlFor={client.id} className="flex-grow cursor-pointer text-gray-700">{client.nombre}</Label>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center text-gray-500">No hay clientes disponibles.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50">
                        <Button
                            type="submit"
                            className="w-full bg-primary text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            Enviar
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </ModalBackground>
    );
}
