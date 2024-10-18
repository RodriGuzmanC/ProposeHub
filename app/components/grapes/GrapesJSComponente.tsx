import { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import LoadingFallback from './LoadingFallback';
import { AddBlocks } from './Blocks';


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
                },
            });
            AddBlocks(editor)

        }
    }, []);

    return (
        <div className="h-screen flex">

            <div ref={editorRef} className="w-3/4 h-screen" />

        </div>
    );
};

export default GrapesJSComponent;
