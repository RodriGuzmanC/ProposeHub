import { cambiarEstadoVersionPropuesta, crearVersionPropuesta, obtenerVersionEnEdicion } from '@/lib/services/versionPropuesta';
import type { Plugin } from 'grapesjs';

interface AddOptionsInter {
    launchFunction: (html: string, css: string) => any
    abrirVersionesModal: () => void
    storeFunction: (data: any) => any
    projectID: number
}

export const AddOptions: Plugin<AddOptionsInter> = (editor, options) => {

    const launchFunction = options.launchFunction
    const abrirVersionesModal = options.abrirVersionesModal
    const storeFunction = options.storeFunction
    const projectID = options.projectID

// Segundo panel para Publicar y Ver versiones
editor.Panels.addPanel({
    id: 'action-buttons',
    el: '.panel__action-buttons', // Asegúrate de que esta clase exista en tu HTML
    buttons: [
        {
            id: 'publicar',
            command: async () => {
                const html = editor.getHtml();
                const css = editor.getCss() ?? '';
                await launchFunction(html, css);
                // Obtiene la version en edicion actual
                let versionEnEdicion = await obtenerVersionEnEdicion(projectID)
                //  Crea la version
                let versionCreada = await crearVersionPropuesta({
                    id_propuesta: projectID,
                    contenido: versionEnEdicion.contenido,
                    en_edicion: true,
                    generado_por_ia: false,
                    
                }) 
                // Cambia el estado de la nueva version
                await cambiarEstadoVersionPropuesta(projectID, {
                    id_version: versionCreada.id
                })
            },
            className: '', // Icono de publicación
            attributes: { title: 'Publicar' },
            label: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M11 15h2V9h3l-4-5-4 5h3z"></path><path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path></svg>`
        },
        {
            id: 'versiones',
            command() {
                abrirVersionesModal();
            },
            className: 'fa fas fa-code-branch', // Icono de versiones (historial)
            attributes: { title: 'Ver versiones' },
            label: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="transform: ;msFilter:;"><path d="M17.5 4C15.57 4 14 5.57 14 7.5c0 1.554 1.025 2.859 2.43 3.315-.146.932-.547 1.7-1.23 2.323-1.946 1.773-5.527 1.935-7.2 1.907V8.837c1.44-.434 2.5-1.757 2.5-3.337C10.5 3.57 8.93 2 7 2S3.5 3.57 3.5 5.5c0 1.58 1.06 2.903 2.5 3.337v6.326c-1.44.434-2.5 1.757-2.5 3.337C3.5 20.43 5.07 22 7 22s3.5-1.57 3.5-3.5c0-.551-.14-1.065-.367-1.529 2.06-.186 4.657-.757 6.409-2.35 1.097-.997 1.731-2.264 1.904-3.768C19.915 10.438 21 9.1 21 7.5 21 5.57 19.43 4 17.5 4zm-12 1.5C5.5 4.673 6.173 4 7 4s1.5.673 1.5 1.5S7.827 7 7 7s-1.5-.673-1.5-1.5zM7 20c-.827 0-1.5-.673-1.5-1.5a1.5 1.5 0 0 1 1.482-1.498l.13.01A1.495 1.495 0 0 1 7 20zM17.5 9c-.827 0-1.5-.673-1.5-1.5S16.673 6 17.5 6s1.5.673 1.5 1.5S18.327 9 17.5 9z"></path></svg>`
        },
        
        
    ],
});

editor.Panels.addPanel({
    id: 'action-button-autosave',
    el: '.panel__action-autosave', // Asegúrate de que esta clase exista en tu HTML
    buttons: [
        {
            id: 'guardar-cambios',
            command: async () => {
                console.log('Activando el guardado');
                const storedProjectData = await editor.store()
            },
            className: '', // Icono de publicación
            attributes: { title: 'Guardar cambios' },
            label: `<button style="font-size: 16px;">Guardar</button>`
        },
        
    ],
});
    /*// Agrega botones en el menu
    editor.Panels.addButton('options', {
        id: 'publish-button',
        className: 'fa fa-upload my-custom-button',
        label: 'Publicar',
        command: async () => {
            const html = editor.getHtml();
            const css = editor.getCss() ?? '';

            await launchFunction(html, css)

        },
        attributes: { title: 'Publicar' },
    });



    editor.Panels.addButton('options', {
        id: 'open-versions',
        className: 'fa fa-exit btn-salir-editor',
        label: 'Ver versiones',
        command() {
            abrirVersionesModal()
        },
        attributes: { title: 'Ver versiones' },
    });*/

}