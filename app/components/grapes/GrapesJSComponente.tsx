'use client'
import { useEffect, useRef, useState } from 'react';
import grapesjs, { usePlugin } from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import '../../../public/styles/grapesjscustom.css';
import 'font-awesome/css/font-awesome.min.css';

import LoadingFallback from './LoadingFallback';
import { AddBlocks } from './Blocks';
import { AddStorage } from './Storage'
import { AddOptions } from './Options';
import PrintPDFButton from './PrintPDFButton';
import { AddPdfBlocks } from './AddPdfBlocks';
//import 'grapesjs-blocks-basic'; // Asegúrate de que esté correctamente instalado
import blocksBasic from 'grapesjs-blocks-basic';
import { guardarPlantilla, obtenerContenidoPlantilla } from '@/lib/services/plantilla';
import { useRouter } from 'next/navigation';
import { editarHtmlCssPropuesta } from '@/lib/services/propuesta';
import HistorialVersionesModal from '../propuestas/HistorialVersionesModal';
import { cambiarEstadoVersionPropuesta } from '@/lib/services/versionPropuesta';
import { AddPanels } from './Panels';
import { OptionsPlantilla } from './OptionsPlantilla';
import { CustomToolbars } from './Toolbars';
import { MailModalPlugin } from '../propuestas/SendMailModal';
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
import { PdfPreviewModalPlugin } from './PdfPreviewPlugin';
import { GaleryPlugin } from './GaleryPlugin';
// @ts-ignore
import es from 'grapesjs/locale/es.js';

interface gsjs {
    slug: number
    loadFunction: () => any
    storeFunction: (GrapesJsContentJSON: any) => any
    isProposeEditor: boolean
    launchFunction: (html: string, css: string) => any | null
    linkHome: string
}

const GrapesJSComponent = ({ slug, loadFunction, storeFunction, isProposeEditor, launchFunction, linkHome }: gsjs) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter()
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [projectID, setProjectID] = useState(slug)
    const projectEndpoint = `http://127.0.0.1:8000/api/plantillas/contenido/${projectID}`;

    const [modalVersionesOpen, setModalVersionesOpen] = useState(false);

    const abrirVersionesModal = () => setModalVersionesOpen(true);
    const cerrarVersionesModal = () => setModalVersionesOpen(false);


    // Inicializa el array de plugins
    const plugins = [
        blocksBasic,
        AddBlocks,
        //CustomToolbars,
        usePlugin(AddPanels, {
            // Parámetros 
            linkHome: linkHome,
        }),
        usePlugin(PdfPreviewModalPlugin, {
          
        }),
        usePlugin(GaleryPlugin, {
          
        }),
        usePlugin(MailModalPlugin, {
          // Parámetros 
          idOrgnizacion: 1,
          urlPropuesta: 'asd'
      }),
        usePlugin(AddStorage, {
            // Parámetros 
            loadFunction: loadFunction,
            storeFunction: storeFunction
        }),
    ];

    // Condición para agregar un plugin si isProposeEditor es verdadero
    if (isProposeEditor) {
        plugins.push(usePlugin(AddOptions, {
            launchFunction: launchFunction,
            abrirVersionesModal: abrirVersionesModal,
            storeFunction: storeFunction,
        }));
    } else{
      plugins.push(usePlugin(OptionsPlantilla, {
        storeFunction: storeFunction
    }));
    }
    

    const editorGrapesRef = useRef<any | null>(null);
    useEffect(()=>{
        if (!editorGrapesRef.current) {
        const editor = grapesjs.init({
            container: '#gjs',
            fromElement: false,
            height: '100%',
            width: '100%',
            panels: { defaults: [] }, // Deja vacío para evitar paneles predeterminados
            i18n: {
              // locale: 'en', // default locale
              // detectLocale: true, // by default, the editor will detect the language
              // localeFallback: 'en', // default fallback
              messages: { es },
            },
            selectorManager: {
                componentFirst: true,
            },
            plugins: plugins,
            pluginsOpts: {
                blocksBasic: { /* Opciones del plugin */ },
            },
            
            // Configuración de almacenamiento y carga
            storageManager: {
                type: 'remote',
                // ...
                stepsBeforeSave: 6,
                options: {
                    remote: {
                    }
                },
            },
            
            // Configuracion de carga de imagenes
            assetManager: {
                custom: true,
                assets: [
                  { 
                    src: 'http://127.0.0.1:8000/storage/images/GHkZ0I4mUchtGgkVpikOQUSAalHFB1crTPThV3Hb.png', 
                    name: 'Imagen 1' 
                  },
                  { 
                    src: 'http://127.0.0.1:8000/storage/images/rMApPXgQmYWDR2UHta0ANex97zVAFmZCCfnKICix.png', 
                    name: 'Imagen 2' 
                  },
                ], // Puedes inicializarlo vacío o cargar imágenes si lo prefieres
                upload: 'http://127.0.0.1:8000/api/imagenes', // Ruta en Laravel para subir imágenes
                uploadName: 'file', // Nombre del campo en el backend
                autoAdd: true, // Añadir automáticamente al gestor de activos al subir
                openAssetsOnDrop: true, // Abre el modal de assets cuando se hace drop
            
                // Función personalizada para cargar las imágenes desde el servidor
                customFetch: (url, options) => {
                  console.log("aaaaaaaaa")

                  // Devolver una promesa que resuelve los assets
                  return new Promise((resolve, reject) => {
                    // Realizar la solicitud para obtener las imágenes
                    fetch('http://127.0.0.1:8000/api/imagenes')
                      .then(response => {
                        if (!response.ok) {
                          // Si la respuesta no es exitosa, rechazamos la promesa
                          reject(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
                        }
                        return response.json();
                      })
                      .then(images => {
                        // Mapeamos las imágenes a la estructura que GrapesJS espera
                        const assets = images.map((img : any) => ({
                          src: `http://127.0.0.1:8000${img.url}`,
                          name: `Imagen ${img.id}`,
                          type: 'image',
                        }));
                
                        console.log("Imágenes obtenidas:", assets);
                
                        // Resolvemos la promesa con los assets
                        resolve(assets);
                      })
                      .catch(error => {
                        // Si ocurre algún error en la solicitud, rechazamos la promesa
                        console.error("Error al cargar las imágenes:", error);
                        reject(error);
                      });
                  });
                },
            
                // Función personalizada para la subida de archivos
                uploadFile: (e: any) => {
                  const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
                  console.log("Files")
                  console.log(files)
                  const formData = new FormData();
                  for (let i = 0; i < files.length; i++) {
                    formData.append('image', files[i]); // Nombre del archivo
                  }
            
                  fetch('http://127.0.0.1:8000/api/imagenes', { // Endpoint en Laravel para manejar la subida
                    method: 'POST',
                    body: formData,
                  })
                    .then(res => res.json())
                    .then(data => {
                      // Añade cada imagen al gestor de activos
                      data.forEach((image: any) => editor.AssetManager.add(`http://127.0.0.1:8000${image.url}`));
                    })
                    .catch(err => console.error('Error al subir la imagen:', err));
                },
            
                // Otras configuraciones opcionales
                showUrlInput: true,
                multiUpload: true, 
              },
          
            // Configuración de los paneles personalizados
            blockManager: {
              appendTo: '.blocks-container',
            },
            layerManager: {
              appendTo: '.layers-container',
            },
            styleManager: {
              appendTo: '.styles-container',
            },
            traitManager: {
              appendTo: '.traits-container',
            },
            deviceManager: {
              appendTo: '.panel__devices',
            } as any,
          });

          editor.on('load', () => {
            console.log('Editor cargado, agregando imágenes al AssetManager...');
            
            // Aquí agregamos imágenes dinámicamente, por ejemplo, desde tu API
            fetch('http://127.0.0.1:8000/api/imagenes')
              .then(response => response.json())
              .then(images => {
                // Mapeamos las imágenes obtenidas a un formato compatible con GrapesJS
                images.forEach((img:any) => {
                  editor.AssetManager.add({
                    src: `http://127.0.0.1:8000${img.url}`,  // La URL completa de la imagen
                    name: `Imagen ${img.nombre ?? img.id}`, // Nombre opcional
                    type: 'image',  // Tipo de asset
                  });
                });
          
                console.log('Imágenes añadidas:', images);
              })
              .catch(error => {
                console.error('Error al cargar las imágenes:', error);
              });
          });
          // Carga imagenes

          editorGrapesRef.current = editor;
          
          // Añade las acciones al panel superior izquierdo
          
        }
    }, [])

    // Componente PDF para exportar el contenido de GrapesJS


    return (
        <div className="h-screen flex flex-col">
            {modalVersionesOpen ? <HistorialVersionesModal idPropuesta={projectID} onCardClick={() => (console.log("a"))} onClose={cerrarVersionesModal} ></HistorialVersionesModal> : ''}
            {/* Editor GrapesJS */}
            {/*<div ref={editorRef} className="w-full h-full"/>*/}
            <div className="editor">
                {/* Panel superior */}
                <div className="panel__top">
                    <div className="panel__left">
                        <div className="panel__basic-actions">
                            <div className="panel__action-basic"></div>
                            <div className="panel__action-buttons ml-2" style={{display: 'flex'}}></div>
                            <div className="panel__action-autosave ml-2"></div>
                        </div>
                    </div>
                    <div className="panel__center">
                        <div className="panel__devices"></div>
                    </div>
                    <div className="panel__right">
                        <div className="panel__switcher"></div>
                    </div>
                </div>

                {/* Área de contenido */}
                <div className="editor-content">
                    {/* Canvas principal a la izquierda */}
                    <div id="gjs"></div>

                    {/* Panel derecho para edición */}
                    <div className="panel__right">
                        <div className="blocks-container"></div>
                        <div className="layers-container"></div>
                        <div className="styles-container"></div>
                        <div className="traits-container"></div>
                    </div>
                </div>
            </div>

        </div>
    );
};


export default GrapesJSComponent;
