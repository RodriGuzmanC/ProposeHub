'use client'
import { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import '../../../public/styles/grapesjs.module.css';

import LoadingFallback from './LoadingFallback';
import { AddBlocks } from './Blocks';
import PrintPDFButton from './PrintPDFButton';
import { AddPdfBlocks } from './AddPdfBlocks';
//import 'grapesjs-blocks-basic'; // Asegúrate de que esté correctamente instalado
import blocksBasic from 'grapesjs-blocks-basic';

const GrapesJSComponent = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [htmlContent, setHtmlContent] = useState<string>('');

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
                
                storageManager: {
                    type: 'local',
                    autosave: true,
                    autoload: true,
                    stepsBeforeSave: 1,
                    options: {
                        local: {
                            key: 'gjsProject',
                        },
                    },
                },
            });
            AddBlocks(editor),

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
            <PrintPDFButton></PrintPDFButton>

            {/* Editor GrapesJS */}
            <div ref={editorRef} className="w-full h-full" />
        </div>
    );
};


export default GrapesJSComponent;
