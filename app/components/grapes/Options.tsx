import type { Plugin } from 'grapesjs';

interface AddOptionsInter {
    launchFunction: (html: string, css: string) => any
    abrirVersionesModal: () => void
}

export const AddOptions: Plugin<AddOptionsInter> = (editor, options) => {

    const launchFunction = options.launchFunction
    const abrirVersionesModal = options.abrirVersionesModal

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
            },
            className: 'fa fa-solid fa-upload', // Icono de publicación
            attributes: { title: 'Publicar' },
        },
        {
            id: 'versiones',
            command() {
                abrirVersionesModal();
            },
            className: 'fa-solid fa-code-branch', // Icono de versiones (historial)
            attributes: { title: 'Ver versiones' },
        },
        {
            id: 'imprimir-pdf',
            command() {
                abrirVersionesModal();
            },
            className: 'fa-solid fa-code-branch', // Icono de versiones (historial)
            attributes: { title: 'Descargar pdf' },
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