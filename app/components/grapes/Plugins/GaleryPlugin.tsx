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


        } else {
            // Si el Asset Manager se cierra, eliminar la galería
            if (modalContainer) {
                modalContainer.innerHTML = ''; // Limpiar contenido
            }

        }
    });

    
};



// Interfaz básica de la galería (esto se agrega dinámicamente al modal)

const GaleryUI = ({ editor }: { editor: any }) => {
    
    return (
        <Card className="border-none w-full mx-auto bg-transparent text-white">
            <Tabs defaultValue="upload" className="w-full bg-transparent text-white">
                <TabsList className="w-fit h-auto bg-transparent text-white flex">
                    <TabsTrigger
                        value="upload"
                        className="flex-1 bg-transparent data-[state=active]:text-primary flex flex-col items-center py-3 relative"
                    >
                        <LucideUploadCloud className="mb-1"></LucideUploadCloud>
                        Subir imagen
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary opacity-0 transition-opacity data-[state=active]:opacity-100"></div>
                    </TabsTrigger>
                    <TabsTrigger
                        value="files"
                        className="flex-1 bg-transparent data-[state=active]:text-primary flex flex-col items-center py-3 relative"
                    >
                        <Images className="mb-1"></Images>
                        Mis imagenes
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

