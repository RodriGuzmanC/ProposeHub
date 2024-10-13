import { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import LoadingFallback from './LoadingFallback';

const GrapesJSComponent = () => {

    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (editorRef.current) {
            const editor = grapesjs.init({
                container: editorRef.current,
                fromElement: true,
                height: '100%',
                blockManager: {
                    appendTo: '', // El contenedor donde se mostrará el panel de bloques
                },
                deviceManager: {
                    devices: [
                        {
                            name: 'A4',
                            width: '210mm',
                            height: '297mm',
                            // Puedes agregar más propiedades si es necesario
                        },
                        {
                            name: 'Horizontal',
                            width: '297mm',
                            height: '210mm',
                            // Puedes agregar más propiedades si es necesario
                        },
                    ],
                },
                // Opciones adicionales
                storageManager: {
                    type: 'local', // Type of the storage, available: 'local' | 'remote'
                    autosave: true, // Store data automatically
                    autoload: true, // Autoload stored data on init
                    stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
                    options: {
                      local: { // Options for the `local` type
                        key: 'gjsProject', // The key for the local storage
                      },
                    }
                  }
            });
            // Añadir bloques personalizados
            const blockManager = editor.BlockManager;

            // Bloque de Título
            blockManager.add('titulo-block', {
                label: 'Titulo',
                content: '<h1>Escribe tu título aquí</h1>',
                category: 'Básico',
                activate: true,
            });

            // Bloque de Texto
            blockManager.add('texto-block', {
                label: 'Texto',
                content: '<p>Escribe tu texto aquí</p>',
                category: 'Básico',
                activate: true,
            });

            // Bloque de Botón
            blockManager.add('boton-block', {
                media: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20.5 17h-17A2.502 2.502 0 0 1 1 14.5v-4A2.502 2.502 0 0 1 3.5 8h17a2.502 2.502 0 0 1 2.5 2.5v4a2.502 2.502 0 0 1-2.5 2.5zm-17-8A1.502 1.502 0 0 0 2 10.5v4A1.502 1.502 0 0 0 3.5 16h17a1.502 1.502 0 0 0 1.5-1.5v-4A1.502 1.502 0 0 0 20.5 9zM17 12H7v1h10z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>`,
                label: 'Botón',
                content: '<button class="btn btn-primary">Haz clic aquí</button>',
                category: 'Básico',
                activate: true,
            });

        }
    }, []);

    return (
        <div className="h-screen flex">

            <div ref={editorRef} className="w-3/4 h-screen" />

        </div>
    );
};

export default GrapesJSComponent;
