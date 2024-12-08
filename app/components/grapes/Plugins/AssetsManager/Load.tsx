import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { buscarAssets, cargarAssetsExtras, eliminarAsset, obtenerAssets } from '@/lib/services/imagenes';
import { notificacionAsyncrona, notificacionToast } from '@/lib/utils/alertToast';
import { Imagen } from '@/lib/utils/definitions';
import { Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

export default function LoadImages({ editor }: { editor: any }) {
  const [Assets, setAssets] = useState<Imagen[]>([])
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const { Modal } = editor;
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
          Modal.close()
          // Si lo deseas, puedes hacer que se cierre el Asset Manager
          //editor.Commands.run('core:open-assets');
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
      setAssets(data.data)
      setNextPageUrl(data.next_page_url);
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


  async function eliminarFuncion(id: number) {
    try {
      // Llama a la función para eliminar el asset en el backend
      await notificacionAsyncrona(eliminarAsset(id), 'Eliminando...', 'Imagen eliminada', 'Hubo un error al eliminar la imagen')
      // Filtra el array para eliminar el elemento con el ID especificado
      setAssets((prevAssets) => prevAssets.filter((asset) => asset.id !== id));
    } catch (error) {
      console.error("Error al eliminar el asset:", error);
    }
  }

  return (
    <div className="space-y-6 p-4">
      <div className="relative">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative flex-grow">
            <Input
              type="search"
              name="search"
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white border-gray-600 rounded-md focus:ring-primary focus:border-primary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <Button
            type="submit"
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white"
          >
            Buscar
          </Button>
        </form>
      </div>
      <div id="gallery-content" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Assets && Assets.length > 0 ? (
          Assets.map((asset: Imagen, i: number) => (
            <div
              key={i}
              className="gallery-image aspect-square relative group cursor-pointer rounded-lg overflow-hidden border border-gray-700 hover:border-popover hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              onClick={() => {/* Implementa la lógica del clic aquí */ }}
            >
              <div className="gallery-delete-btn bg-red-500 text-white rounded-sm p-1 hover:bg-red-600 cursor-pointer"
                onClick={() => eliminarFuncion(asset.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" style={{ fill: '#fff' }} ><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path></svg>
              </div>
              <img
                className="img-galeria w-full h-auto object-contain max-h-full"
                src={asset.url}
                alt={`Asset ${i + 1}`}
              />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">No hay imágenes disponibles.</p>
        )}
      </div>
      {nextPageUrl && (
        <div className="mt-6 text-center">
          <Button
            onClick={cargarMasAssets}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-full transition-colors"
          >
            Cargar más
          </Button>
        </div>
      )}
    </div>
  )
}
