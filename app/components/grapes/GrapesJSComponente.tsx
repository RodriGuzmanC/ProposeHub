'use client'
import { useEffect, useRef, useState } from 'react';
import grapesjs, { usePlugin } from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import '../../../public/styles/grapesjscustom.css';
import 'font-awesome/css/font-awesome.min.css';

import LoadingFallback from './LoadingFallback';
import { AddBlocks } from './Plugins/Blocks';
import { AddStorage } from './Plugins/Storage'
import { AddOptions } from './Plugins/Options';
import { AddPdfBlocks } from './AddPdfBlocks';
//import 'grapesjs-blocks-basic'; // Asegúrate de que esté correctamente instalado
import blocksBasic from 'grapesjs-blocks-basic';
import { guardarPlantilla, obtenerContenidoPlantilla } from '@/lib/services/plantilla';
import { useRouter } from 'next/navigation';
import { editarHtmlCssPropuesta } from '@/lib/services/propuesta';
import HistorialVersionesModal from './Plugins/HistorialVersionesModal';
import { cambiarEstadoVersionPropuesta } from '@/lib/services/versionPropuesta';
import { AddPanels } from './Plugins/Panels';
import { OptionsPlantilla } from './Plugins/OptionsPlantilla';
import { CustomToolbars } from './Toolbars';
import { MailModalPlugin } from './Plugins/SendMailModal';
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
import { PdfPreviewModalPlugin } from './Plugins/PdfPreviewPlugin';
import { GaleryPlugin } from './Plugins/GaleryPlugin';
// @ts-ignore
import es from 'grapesjs/locale/es.js';
// @ts-ignore
import grapesStyleBorder from 'grapesjs-style-border';
// @ts-ignore
import MaterialIconsPlugin from 'grapesjs-google-material-icons';

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
  const [projectID, setProjectID] = useState<number>(slug)

  const [modalVersionesOpen, setModalVersionesOpen] = useState(false);

  const abrirVersionesModal = () => setModalVersionesOpen(true);
  const cerrarVersionesModal = () => setModalVersionesOpen(false);


  // Inicializa el array de plugins
  const plugins = [
    grapesStyleBorder,
    blocksBasic,
    AddBlocks,
    MaterialIconsPlugin,
    //CustomToolbars,
    usePlugin(AddPanels, {
      // Parámetros 
      linkHome: linkHome,
    }),

    usePlugin(GaleryPlugin, {

    }),

    usePlugin(AddStorage, {
      // Parámetros 
      loadFunction: loadFunction,
      storeFunction: storeFunction
    }),
  ];

  // Condición para agregar un plugin si isProposeEditor es verdadero
  if (isProposeEditor) {
    plugins.push(
      usePlugin(AddOptions, {
        launchFunction: launchFunction,
        abrirVersionesModal: abrirVersionesModal,
        storeFunction: storeFunction,
        projectID: projectID
      })
    );

    plugins.push(usePlugin(PdfPreviewModalPlugin, {
      slug: slug
    })
    );

    plugins.push(usePlugin(MailModalPlugin, {
      // Parámetros 
      slug: slug,
    })
    );
  } else {
    plugins.push(usePlugin(OptionsPlantilla, {
      storeFunction: storeFunction
    }));
  }


  const editorGrapesRef = useRef<any | null>(null);
  useEffect(() => {
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
              <div className="panel__action-buttons ml-2" style={{ display: 'flex' }}></div>
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
