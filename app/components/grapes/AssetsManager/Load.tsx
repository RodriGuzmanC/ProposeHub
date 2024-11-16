import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { buscarAssets, cargarAssetsExtras, obtenerAssets } from '@/lib/services/imagenes';
import React, { useEffect, useRef, useState } from 'react'

export default function LoadImages({ editor }: { editor: any }) {
    const [Assets, setAssets] = useState<any[]>([])
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (true) {
            // Obtenemos las imágenes dentro de galleryRef
            const imagenes = document.getElementsByClassName('img-galeria');

            // Iteramos sobre las imágenes y les añadimos el evento de clic
            Array.from(imagenes).forEach((imagen: Element) => {
                const imgElement = imagen as HTMLImageElement;

                imgElement.addEventListener('click', () => {
                    const selected = editor.getSelected();
                    if (selected && selected.is('image')) {
                        // Actualizamos el src del componente seleccionado con la imagen clickeada
                        //editor.set('src', imgElement.src); 
                        selected.set('src', imgElement.src);  // Usar 'set' para actualizar el atributo 'src'
                        //selected.addAttributes({ src: imgElement.src });
                    }

                    // Si lo deseas, puedes hacer que se cierre el Asset Manager
                    editor.Commands.run('core:open-assets');
                });
            });
        }
    }, [Assets]); // Solo ejecutamos este efecto cuando `Assets` cambia

    useEffect(() => {
        const cargarAssets = async () => {
            const data = await obtenerAssets(); // Esperamos la promesa
            setAssets(data.data); // Actualizamos el estado con los activos obtenidos
            setNextPageUrl(data.next_page_url); // Actualizamos el estado con los activos obtenidos
        };

        cargarAssets(); // Llamamos a la función asíncrona
    }, []);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

        const formData = new FormData(event.currentTarget);
        const searchQuery = formData.get('search')?.toString() || '';

        if (!searchQuery) {
            alert('Por favor ingresa un término de búsqueda.');
            return;
        }

        try {
            let data = await buscarAssets(searchQuery)
            console.log(data)
            setAssets(data)
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
        }
    };


    const cargarMasAssets = async () => {
        if (!nextPageUrl) return; // Si no hay URL para la siguiente página, no hacemos nada
    
        try {
            const data = await cargarAssetsExtras(nextPageUrl);
    
            setAssets((prevAssets) => [...prevAssets, ...data.data]); // Añadimos las nuevas imágenes a la lista existente
            setNextPageUrl(data.next_page_url); // Actualizamos la URL de la siguiente página
        } catch (error) {
            console.error('Error al cargar más imágenes:', error);
        }
    };

    return (
        <div className="space-y-4">
            <div className="relative">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    
                    <Input
                    type="search"
                    name="search"
                    placeholder="Search files..."
                    className="w-full px-4 py-2 border rounded-md">
                    </Input>
                    <Button
                        type="submit"
                        className="px-4 py-2 "
                    >
                        Buscar
                    </Button>
                </form>
            </div>
            <div id="gallery-content" className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {Assets && Assets.length > 0 ? (
                    Assets.map((asset: any, i: number) => (
                        <div key={i} className="aspect-square relative group cursor-pointer">
                            <img className="img-galeria" src={asset.url} />

                        </div>
                    ))
                ) : (
                    <p>No hay imágenes disponibles.</p>
                )}

            </div>
            {/* Botón de cargar más */}
            {nextPageUrl && (
                <div className="mt-4 text-center">
                    <button onClick={cargarMasAssets} className="btn btn-primary">
                        Cargar más
                    </button>
                </div>
            )}
        </div>
    )
}
