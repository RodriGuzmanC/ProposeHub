import type { Plugin } from 'grapesjs';


export const OptionsPlantilla: Plugin = (editor, options) => {


    editor.Panels.addPanel({
        id: 'action-button-plantilla',
        el: '.panel__action-buttons', // Asegúrate de que esta clase exista en tu HTML
        buttons: [
            {
                id: 'guardar-cambios',
                command: async () => {
                    console.log('Activando el guardado');
                    const storedProjectData = await editor.store()
                },
                className: '', // Icono de publicación
                attributes: { title: 'Guardar cambios' },
                label: `<button>Guardar</button>`
            },

        ],
    });
}