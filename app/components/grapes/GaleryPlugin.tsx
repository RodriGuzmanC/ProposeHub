import type { Plugin } from "grapesjs";
import ReactDOM from "react-dom";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Images, LucideUploadCloud, Upload } from 'lucide-react'
import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import { buscarAssets, obtenerAssets } from "@/lib/services/imagenes";
import UploadImage from "./AssetsManager/Upload";
import LoadImages from "./AssetsManager/Load";

export const GaleryPlugin: Plugin = (editor) => {
    // Referencia al modal que se crea para contener al plugin
    let modalContainer: HTMLDivElement | null = null;

    async function esl() {
        return await cargarAssets()
    }

    let editorInstance = editor
    // Escuchar el evento cuando el Asset Manager se abre o se cierra
    editor.on('asset:custom', async (props) => {
        const { open, assets, close, container } = props;

        // Si el Asset Manager está abierto, mostramos la galería
        if (open) {
            // Crear un contenedor modal si no existe
            if (!modalContainer) {
                modalContainer = document.createElement('div');
                modalContainer.classList.add('gjs-gallery-modal');
                const selected = editor.getSelected();
                ReactDOM.render(
                    <GaleryUI
                        editor={editorInstance}
                    ></GaleryUI>,
                    container
                );
                container.appendChild(modalContainer);
            }

            const assetsPropios = [
                {
                    "id": 1,
                    "nombre": null,
                    "url": "/storage/images/GHkZ0I4mUchtGgkVpikOQUSAalHFB1crTPThV3Hb.png"
                },
                {
                    "id": 2,
                    "nombre": null,
                    "url": "/storage/images/LsKinGHRYqT63L1G83rjmbdBcilnLXKhFXPMyiQk.png"
                },
                {
                    "id": 3,
                    "nombre": null,
                    "url": "/storage/images/IgzO3J4ZWLDG28ImAoJUnyy2M2SgVwPPRMM3u76c.png"
                },
                {
                    "id": 4,
                    "nombre": null,
                    "url": "/storage/images/EdKjTVUUQhM5aBqaFJm1RSTb8YGRtncDR8TUF5Wg.png"
                },
                {
                    "id": 5,
                    "nombre": null,
                    "url": "/storage/images/8J6jq7o0jhN2xBhf21rPXtFDhzDAhZRXsp14ejME.png"
                },
                {
                    "id": 6,
                    "nombre": null,
                    "url": "/storage/images/4bLIS75RTCApkjdPLXPo9lAH5vaWrbJBZReRfShe.png"
                },
                {
                    "id": 7,
                    "nombre": null,
                    "url": "/storage/images/svJZxP3TWdFMFLLpAPsyJE6UfYTP1Wh3Gvtt0uoJ.png"
                },
                {
                    "id": 8,
                    "nombre": null,
                    "url": "/storage/images/K4nrfuQ4XaJuM0EIr6ZNgebEdyRuq5cdjtmUerLx.png"
                },
                {
                    "id": 9,
                    "nombre": null,
                    "url": "/storage/images/5HQhEKkcIUWDp05A3SbyiUa5tnI3oFV2CS7dNS0i.png"
                },
                {
                    "id": 10,
                    "nombre": null,
                    "url": "/storage/images/rMApPXgQmYWDR2UHta0ANex97zVAFmZCCfnKICix.png"
                },
                {
                    "id": 11,
                    "nombre": null,
                    "url": "/storage/images/s1CLN0dL03pKj94KbZr1Od3Y54NhKzrDfVxc2tKh.png"
                },
                {
                    "id": 12,
                    "nombre": "image-removebg-preview (2).png",
                    "url": "/storage/images/Wz4YNM4L387RkpbotjFr78q0fEQ7VGW88jZlqIkl.png"
                },
                {
                    "id": 13,
                    "nombre": "tresmedia-logo.png",
                    "url": "/storage/images/xijJjmuPda5UI5UvaA8HziIgAg7qRRlMZ3F3QD2a.png"
                },
                {
                    "id": 14,
                    "nombre": "supervision-del-proceso.gif",
                    "url": "/storage/images/PNYy07QMVXHKKWfbRQapypyy6KBU0MJ1Gxy4JgO4.gif"
                }
            ]

            const ele = await esl()
            // Renderizar las imágenes en el modal
            //renderGallery(assetsPropios);
        } else {
            // Si el Asset Manager se cierra, eliminar la galería
            if (modalContainer) {
                modalContainer.innerHTML = ''; // Limpiar contenido
            }

        }
    });

    // Función para renderizar las imágenes en la interfaz de la galería
    const renderGallery = (assets: any[]) => {
        if (!modalContainer) return;

        // Limpiar el modal antes de actualizarlo
        modalContainer.innerHTML = '';

        // Crear un contenedor para la galería si no existe
        const gallery = document.getElementById('gallery-content');
        console.log("Galeria contenido");
        console.log(gallery);

        if (gallery) {
            console.log("Galería encontrada.");
            renderImagesInGallery(assets, gallery);
        } else {
            console.log("Esperando que se cargue el contenedor...");

            // Si no existe, intentamos nuevamente después de un breve retraso
            setTimeout(() => {
                renderGallery(assets); // Volver a intentar
            }, 100); // Esperar 100ms antes de intentar otra vez
        }

    };

    const renderImagesInGallery = (assets: any[], gallery: HTMLElement) => {
        // Agregar las imágenes al contenedor de la galería
        assets.forEach((asset) => {
            const img = document.createElement('img');
            img.src = `http://127.0.0.1:8000${asset.url}`;
            img.alt = asset.name;
            img.classList.add('gallery-image');
            gallery.appendChild(img);
        });

        // Agregar eventos de clic a las imágenes
        let imagenes = document.getElementsByClassName('gallery-image');
        Array.from(imagenes).forEach((imagen: any) => {
            imagen.addEventListener('click', () => {
                const selected = editor.getSelected();
                if (selected && selected.get('type') === 'image') {
                    selected.set('src', imagen.src); // Cambiar el src del componente seleccionado
                }

                // Opcional: Cerrar el Asset Manager
                editor.Modal.close();
                editor.Commands.run('core:open-assets');

            });
        });
    };
};

const cargarAssets = async () => {
    //const data = await obtenerAssets(); // Esperamos la promesa
    return ''; // Actualizamos el estado con los activos obtenidos
};


/*function obtenerAssets() {
    console.log("aaaaaaaaa");

    // Realizar la solicitud para obtener las imágenes
    return fetch('http://127.0.0.1:8000/api/imagenes')
        .then(response => {
            if (!response.ok) {
                // Si la respuesta no es exitosa, lanzamos un error
                throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
            }
            return response.json(); // Convertimos la respuesta en JSON
        })
        .then(images => {
            // Mapeamos las imágenes a la estructura que GrapesJS espera
            const assets = images.map((img: any) => ({
                src: `http://127.0.0.1:8000${img.url}`,
                name: `Imagen ${img.id}`,
                type: 'image',
            }));

            console.log("Imágenes obtenidas:", assets);

            // Devolvemos los activos
            return assets;
        })
        .catch(error => {
            console.error("Error al cargar las imágenes:", error);
            return [];  // Devolvemos un array vacío en caso de error
        });
}*/




// Interfaz básica de la galería (esto se agrega dinámicamente al modal)

const GaleryUI = ({ editor }: { editor: any }) => {
    const [Assets, setAssets] = useState<any[]>([])
    const galleryRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        if (true) {
            // Obtenemos las imágenes dentro de galleryRef
            const imagenes = document.getElementsByClassName('img-galeria');

            // Iteramos sobre las imágenes y les añadimos el evento de clic
            Array.from(imagenes).forEach((imagen: Element) => {
                const imgElement = imagen as HTMLImageElement;

                imgElement.addEventListener('click', () => {
                    console.log("antes de seleccionar");
                    const selected = editor.getSelected();
                    if (selected && selected.is('image')) {
                        // Actualizamos el src del componente seleccionado con la imagen clickeada
                        //editor.set('src', imgElement.src); 
                        selected.set('src', imgElement.src);  // Usar 'set' para actualizar el atributo 'src'
                        console.log("Imagen seleccionada y actualizada");
                        //selected.addAttributes({ src: imgElement.src });

                    }
                    console.log("después de seleccionar");

                    // Si lo deseas, puedes hacer que se cierre el Asset Manager
                    editor.Commands.run('core:open-assets');
                });
            });
        }
    }, [Assets]); // Solo ejecutamos este efecto cuando `Assets` cambia

    useEffect(() => {
        const cargarAssets = async () => {
            const data = await obtenerAssets(); // Esperamos la promesa
            setAssets(data); // Actualizamos el estado con los activos obtenidos
        };

        cargarAssets(); // Llamamos a la función asíncrona
    }, []);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

        const formData = new FormData(event.currentTarget);
        const searchQuery = formData.get('search')?.toString() || '';

        try {
            let data = await buscarAssets(searchQuery)
            console.log(data)
            setAssets(data)
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
        }
    };

    return (
        <Card className="border-none w-full mx-auto bg-transparent text-white">
            <Tabs defaultValue="upload" className="w-full bg-transparent text-white">
                <TabsList className="w-fit h-auto bg-transparent text-white flex">
                    <TabsTrigger
                        value="upload"
                        className="flex-1 bg-transparent data-[state=active]:text-primary flex flex-col items-center py-3 relative"
                    >
                        <LucideUploadCloud className="mb-1"></LucideUploadCloud>
                        Upload asset
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary opacity-0 transition-opacity data-[state=active]:opacity-100"></div>
                    </TabsTrigger>
                    <TabsTrigger
                        value="files"
                        className="flex-1 bg-transparent data-[state=active]:text-primary flex flex-col items-center py-3 relative"
                    >
                        <Images className="mb-1"></Images>
                        My files
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary opacity-0 transition-opacity data-[state=active]:opacity-100"></div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="mt-4 bg-transparent text-white w-full">
                    <UploadImage></UploadImage>
                </TabsContent>
                <TabsContent value="files" className="mt-4 bg-transparent text-white w-full h-[calc(100vh-200px)] overflow-auto">
                    {/*<div className="space-y-4">
                        <div className="relative">
                            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                                <input
                                    type="search"
                                    name="search"
                                    placeholder="Search files..."
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Buscar
                                </button>
                            </form>
                        </div>
                        <div id="gallery-content" className="grid grid-cols-2 md:grid-cols-6 gap-4">
                            {Assets && Assets.length > 0 ? (
                                Assets.map((asset: any, i: number) => (
                                    <div key={i} className="aspect-square relative group cursor-pointer">
                                        <img className="img-galeria" src={asset.src} />

                                    </div>
                                ))
                            ) : (
                                <p>No hay imágenes disponibles.</p>
                            )}
                        </div>
                    </div>*/}
                    <LoadImages editor={editor}></LoadImages>
                    {/*<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />*/}
                </TabsContent>
            </Tabs>
        </Card>
    )
};

