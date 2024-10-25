'use client'
import { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import '../../../public/styles/grapesjscustom.css';

import LoadingFallback from './LoadingFallback';
import { AddBlocks } from './Blocks';
import PrintPDFButton from './PrintPDFButton';
import { AddPdfBlocks } from './AddPdfBlocks';
//import 'grapesjs-blocks-basic'; // Asegúrate de que esté correctamente instalado
import blocksBasic from 'grapesjs-blocks-basic';
import { guardarPlantilla, obtenerContenidoPlantilla } from '@/lib/services/plantilla';
import { useRouter } from 'next/navigation';

interface gsjs{
    slug: number
    loadFunction: () => any
    storeFunction: (GrapesJsContentJSON : any) => any
}

const GrapesJSComponent = ({slug, loadFunction, storeFunction} : gsjs) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter()
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [projectID, setProjectID] = useState(slug)
    const projectEndpoint = `http://127.0.0.1:8000/api/plantillas/contenido/${projectID}`;

    useEffect(() => {
        if (editorRef.current) {
            const editor = grapesjs.init({
                container: editorRef.current,
                fromElement: true,
                height: '100%',
                plugins: [blocksBasic],
                pluginsOpts: {
                    blocksBasic: { /* Opciones del plugin */ }
                },

                /*storageManager: {
                    type: 'local',
                    autosave: true,
                    autoload: true,
                    stepsBeforeSave: 1,
                    options: {
                        local: {
                            key: 'gjsProject',
                        },
                    },
                },*/

                storageManager: {
                    type: 'remote',
                    // ...
                    stepsBeforeSave: 1,
                    options: {
                        remote: {
                            urlLoad: projectEndpoint,
                            urlStore: projectEndpoint,
                        }
                    },
                  }
            });
            // Guardado
            editor.Storage.add('remote', {
                async load() {
                  let data = await loadFunction()
                  console.log(data)
                  return data
                },
              
                async store(data) {
                    let almacenado = await storeFunction(data)
                    console.log(almacenado);
                },
              });
            // Agrega mas bloques
            AddBlocks(editor);
            // Agrega botones en el menu
            editor.Panels.addButton('options', {
                id: 'publish-button',
                className: 'fa fa-upload my-custom-button',
                label: 'Publicar',
                command() {
                    const html = editor.getHtml();
                    const css = editor.getCss();

                    // Almacenar en localStorage
                    localStorage.setItem('propuestaHtml', html);
                    localStorage.setItem('propuestaCss', css ?? '');

                    alert('Contenido publicado en localStorage con éxito!');
                },
                attributes: { title: 'Publicar' },
            });
            editor.Panels.addButton('options', {
                id: 'exit-button',
                className: 'fa fa-exit btn-salir-editor',
                label: 'Salir',
                command() {
                    router.push('/plantillas')
                },
                attributes: { title: 'Salir' },
            });
            //
            /*editor.Panels.addButton('options', {
                id: 'export-pdf',
                className: 'pdf-ico',
                label: 'PDF',
                attributes: { title: 'Pdf' },
            });*/

            // Obtén el contenido de GrapesJS cada vez que cambie
            editor.on('update', () => {
                const html = editor.getHtml();
                setHtmlContent(html);
            });
        }
    }, []);

    // Componente PDF para exportar el contenido de GrapesJS


    return (
        <div className="h-screen flex flex-col">
            {/* Editor GrapesJS */}
            <div ref={editorRef} className="w-full h-full" />
        </div>
    );
};


export default GrapesJSComponent;
