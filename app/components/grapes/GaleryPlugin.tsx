import type { Plugin } from "grapesjs";
import ReactDOM from "react-dom";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload } from 'lucide-react'
import Image from "next/image"
import { useEffect, useState } from "react";

export const GaleryPlugin: Plugin = (editor) => {
    // Referencia al modal que se crea para contener al plugin
    let modalContainer: HTMLDivElement | null = null;

    // Escuchar el evento cuando el Asset Manager se abre o se cierra
    editor.on('asset:custom', (props) => {
        const { open, assets, close, container } = props;

        // Si el Asset Manager está abierto, mostramos la galería
        if (open) {
            // Crear un contenedor modal si no existe
            if (!modalContainer) {
                modalContainer = document.createElement('div');
                modalContainer.classList.add('gjs-gallery-modal');
                ReactDOM.render(
                    <GaleryUI></GaleryUI>,
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
            // Renderizar las imágenes en el modal
            renderGallery(assetsPropios);
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

        // Crear un contenedor para la galería
        const gallery = document.getElementById('gallery-content');
        console.log("Galeria contenid")
        console.log(gallery)
        // Agregar cada imagen a la galería
        assets.forEach((asset) => {
            const img = document.createElement('img');
            img.src = `http://127.0.0.1:8000${asset.url}`;
            img.alt = asset.name;
            img.classList.add('gallery-image');

            // Agregar evento de selección para usar la imagen en el editor
            img.addEventListener('click', () => {
                editor.AssetManager.add(asset.src);
                editor.Commands.run('core:open-assets');
            });

            gallery?.appendChild(img);
        });
    };
};




function obtenerAssets() {
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
}




// Interfaz básica de la galería (esto se agrega dinámicamente al modal)
const GaleryUI = () => {
    const [Assets, setAssets] = useState<any[]>([])

    useEffect(() => {
        const cargarAssets = async () => {
            const data = await obtenerAssets(); // Esperamos la promesa
            setAssets(data); // Actualizamos el estado con los activos obtenidos
        };

        cargarAssets(); // Llamamos a la función asíncrona
    }, []);
    return (
        <Card className="border-none w-full mx-auto bg-transparent text-white">
            <Tabs defaultValue="upload" className="w-full bg-transparent text-white">
                <TabsList className="w-fit h-auto bg-transparent text-white flex">
                    <TabsTrigger
                        value="upload"
                        className="flex-1 bg-transparent data-[state=active]:text-primary flex flex-col items-center pb-2 relative"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                            <path d="M13 19v-4h3l-4-5-4 5h3v4z"></path>
                            <path d="M7 19h2v-2H7c-1.654 0-3-1.346-3-3 0-1.404 1.199-2.756 2.673-3.015l.581-.102.192-.558C8.149 8.274 9.895 7 12 7c2.757 0 5 2.243 5 5v1h1c1.103 0 2 .897 2 2s-.897 2-2 2h-3v2h3c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888C18.507 7.67 15.56 5 12 5 9.244 5 6.85 6.611 5.757 9.15 3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5z"></path>
                        </svg>
                        Upload asset
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary opacity-0 transition-opacity data-[state=active]:opacity-100"></div>
                    </TabsTrigger>
                    <TabsTrigger
                        value="files"
                        className="flex-1 bg-transparent data-[state=active]:text-primary flex flex-col items-center pb-2 relative"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mb-1">
                            <path d="M20 2H8c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM8 16V4h12l.002 12H8z"></path>
                            <path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8z"></path>
                            <path d="m12 12-1-1-2 3h10l-4-6z"></path>
                        </svg>
                        My files
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary opacity-0 transition-opacity data-[state=active]:opacity-100"></div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="mt-4 bg-transparent text-white w-full">
                    <div className="border-2 border-dashed rounded-lg p-12 text-center w-full">
                        <div className="mx-auto w-full">
                            <Upload className="h-12 w-12 mx-auto" />
                            <p className="mt-2 text-sm">Drag and Drop assets here</p>
                            <div className="mt-2">Or</div>
                            <Button size="sm" className="mt-2">
                                Browse
                            </Button>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                id="file-upload"
                                multiple
                            />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="files" className="mt-4 bg-transparent text-white w-full h-[calc(100vh-200px)] overflow-auto">
                    <div className="space-y-4">
                        <div className="relative">
                            <Input
                                type="search"
                                placeholder="Search files..."
                                className="w-full"
                            />
                        </div>
                        <div id="gallery-content" className="grid grid-cols-2 md:grid-cols-6 gap-4">
                            {Assets && Assets.length > 0 ? (
                                Assets.map((asset: any, i: number) => (
                                    <div key={i} className="aspect-square relative group cursor-pointer">
                                        <img src={asset.src} />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                                    </div>
                                ))
                            ) : (
                                <p>No hay imágenes disponibles.</p>
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </Card>
    )
};

