import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cambiarEstadoVersionPropuesta, obtenerVersionesPropuesta, obtenerVersionPropuesta, obtenerVersionPublicada } from "@/lib/services/versionPropuesta"
import { editarConToast } from "@/lib/utils/alertToast"
import { VersionPropuestaInterface } from "@/lib/utils/definitions"
import grapesjs from "grapesjs"
import { ArrowDownRight, X } from "lucide-react"
import { useEffect, useState } from "react"
import '../../../public/styles/pruebaeliminar.css';


interface HistorialVersionesModalProps {
  idPropuesta: number;
  onClose: () => void;
  onCardClick: (version: string) => void;
}

export default function HistorialVersionesModal({ idPropuesta, onClose, onCardClick }: HistorialVersionesModalProps) {

  const [versionesPropuesta, setVersionesPropuesta] = useState<VersionPropuestaInterface[]>([])
  const [versionPublicada, setVersionPublicada] = useState<VersionPropuestaInterface>()

  const [dataEstaCargada, setDataEstaCargada] = useState(false)

  async function cambiarVersion(id_propuesta: number, id_version: number) {
    await editarConToast({
      id: id_propuesta,
      cuerpo: {
        id_version: id_version
      },
      event: cambiarEstadoVersionPropuesta
    })
    // Recargamos la pagina para hidratar al editor GrapesJS con la version en edicion
    window.location.reload();
  }

  function cambiarPrevisualizacionVersion(id_version: number) {
    PreviewVersion(id_version)
  }

  // Carga de todas las versiones
  useEffect(() => {
    async function cargar(id: number) {
      try {
        let data = await obtenerVersionesPropuesta(id)
        // Carga todas las versiones de la propuesta
        setVersionesPropuesta(data)
        
        let dataVersionPublicada = await obtenerVersionPublicada(id)
        // Carga la version que actualmente esta publicada
        if (dataVersionPublicada) {
          setVersionPublicada(dataVersionPublicada)

        }

        setDataEstaCargada(true)
      } catch (error) {
        console.error(`Error al cargar la propuesta: ${error instanceof Error ? error.message : String(error)}`);
        // Puedes manejar el error aquí sin interrumpir el flujo
        // Por ejemplo, puedes establecer un estado para manejar errores o simplemente ignorar el error
      }
    }
    if (!dataEstaCargada) {
      cargar(idPropuesta)

    }
  }, [idPropuesta])


  // Constructor

  function PreviewVersion(versionId: number) {

    const editorPreview = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#gjs-preview',
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Size of the editor
      height: '100%',
      width: '100%',
      // Disable the storage manager for the moment
      storageManager: { autoload: false },
      // Avoid any default panel
      panels: { defaults: [] },
    });

    // Deshabilita edición en canvas: elimina los eventos de drag y drop
    editorPreview.on('component:selected', (component) => {
      component.set({ selectable: false, draggable: false, hoverable: false, editable: false, copyable: false, removable: false });
    });

    // Función para cargar la versión en el editor
    async function cargarVersion(versionId: number) {
      try {
        let data = await obtenerVersionPropuesta(versionId);

        if (data && data.contenido) {
          // Convertir la cadena JSON a un objeto JavaScript
          let contenido = JSON.parse(data.contenido);

          // Cargar los datos directamente en el editor
          editorPreview.loadProjectData(contenido);
          console.log("Datos de la versión cargados en el editor");
        } else {
          console.error("Datos de versión no encontrados o en formato incorrecto");
        }
      } catch (err) {
        console.error("Error al cargar la versión: ", err);
      }
    }

    // Llama a cargarVersion con el id de la versión que necesitas cargar
    cargarVersion(versionId);
  }


  return (
    <div className="fixed inset-0 bg-background text-foreground flex flex-col z-50 h-screen">
      <header className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
        <h1 className="text-2xl font-bold">Historial de Versiones</h1>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar">
          <X className="h-6 w-6" />
        </Button>
      </header>
      <div className="flex-grow flex h-[calc(100vh-64px)]">
        {/* Versiones en la columna izquierda */}
        <div className="w-1/4 border-r h-full">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4 overflow-auto">
              {versionesPropuesta ? (
                versionesPropuesta.map((versionActual) => (
                  <Card
                    key={versionActual.id ?? ''}
                    className="hover:bg-accent hover:text-foreground transition-colors"
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => cambiarPrevisualizacionVersion(versionActual.id)}
                    >
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg flex justify-between items-center">
                          {versionActual.id}
                          <div className="flex gap-2">
                            <div className="flex gap-2">
                              {versionActual.en_edicion == true ? <Badge variant="secondary" className="text-xs">En edición</Badge> : ''}
                              {versionPublicada && versionActual.id == versionPublicada.id ? <Badge variant="default" className="text-xs">Publicada</Badge> : ''}
                            </div>

                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex justify-between items-center p-4 pt-0">
                        <p className="text-sm"><strong>Fecha:</strong> {versionActual.fecha_creacion}</p>
                        <Button
                          className="w-fit p-1 h-fit"
                          onClick={() => { cambiarVersion(idPropuesta, versionActual.id) }}
                        >
                          <ArrowDownRight height={'20px'} width={'20px'} color="white"></ArrowDownRight>
                        </Button>
                      </CardContent>
                    </div>

                  </Card>
                ))
              ) : (
                <p>Cargando versiones...</p>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Área de previsualización en la columna derecha */}
        <div className="w-3/4">
          <div className="bg-muted h-full rounded-lg flex items-center justify-center">
            <div id="gjs-preview" className="w-full h-full">
              <h1 className="text-center mt-4">La version seleccionada se renderizara ¡AQUI!</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}