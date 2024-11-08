import type { Plugin } from 'grapesjs';


interface apinterface{
    linkHome: string
}

export const AddPanels: Plugin<apinterface> = (editor, options) => {

    const linkHome = options.linkHome


    // Primer panel con botones básicos
editor.Panels.addPanel({
    id: 'basic-actions',
    el: '.panel__action-basic',
    buttons: [
        {
            id: 'home',
            command: () => window.location.href = linkHome,
            className: 'mr-4', // Espaciado a la derecha
            attributes: { title: 'ProposeHub' },
            label: 'ProposeHub', // Mostrar el texto "ProposeHub" en el botón
        },
        {
            id: 'undo',
            command: 'core:undo',
            className: '',
            attributes: { title: 'Deshacer' },
            label: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M9 10h6c1.654 0 3 1.346 3 3s-1.346 3-3 3h-3v2h3c2.757 0 5-2.243 5-5s-2.243-5-5-5H9V5L4 9l5 4v-3z"></path></svg>`
        },
        {
            id: 'redo',
            command: 'core:redo',
            className: '',
            attributes: { title: 'Rehacer' },
            label: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M9 18h3v-2H9c-1.654 0-3-1.346-3-3s1.346-3 3-3h6v3l5-4-5-4v3H9c-2.757 0-5 2.243-5 5s2.243 5 5 5z"></path></svg>`
        },
    ],
});


    editor.Panels.addPanel({
        id: 'panel-devices',
        el: '.panel__devices',
        buttons: [
          {
            id: 'set-device-desktop',
            command: (editor: any) => editor.setDevice('Desktop'),
            className: 'fa fa-desktop',
            attributes: { title: 'Escritorio' },
          },
          {
            id: 'set-device-tablet',
            command: (editor: any) => editor.setDevice('Tablet'),
            className: 'fa fa-tablet',
            attributes: { title: 'Tablet' },
          },
          {
            id: 'set-device-mobile',
            command: (editor: any) => editor.setDevice('Mobile portrait'),
            className: 'fa fa-mobile',
            attributes: { title: 'Móvil' },
          },
        ],
      });

    // Añade los "switchers" al panel superior derecho
    editor.Panels.addPanel({
        id: 'panel-switcher',
        el: '.panel__switcher',
        buttons: [
            {
                id: 'show-layers',
                active: true,
                className: 'fa fa-bars',
                command: 'show-layers',
                attributes: { title: 'Capas' },
            },
            {
                id: 'show-styles',
                className: 'fa fa-paint-brush',
                command: 'show-styles',
                attributes: { title: 'Estilos' },
            },
            {
                id: 'show-traits',
                className: 'fa fa-cog',
                command: 'show-traits',
                attributes: { title: 'Atributos' },
            },
            {
                id: 'show-blocks',
                className: 'fa fa-th-large',
                command: 'show-blocks',
                attributes: { title: 'Bloques' },
            },
        ],
    });

    // Comandos para cambiar la vista entre las distintas áreas
    editor.Commands.add('show-layers', {
        run(editor) {
            const layersContainer = document.querySelector('.layers-container') as HTMLElement;
            const stylesContainer = document.querySelector('.styles-container') as HTMLElement;
            const traitsContainer = document.querySelector('.traits-container') as HTMLElement;
            const blocksContainer = document.querySelector('.blocks-container') as HTMLElement;


            if (layersContainer) layersContainer.style.display = 'block';
            if (stylesContainer) stylesContainer.style.display = 'none';
            if (traitsContainer) traitsContainer.style.display = 'none';
            if (blocksContainer) blocksContainer.style.display = 'none';

        },
    });

    editor.Commands.add('show-styles', {
        run(editor) {
            const layersContainer = document.querySelector('.layers-container') as HTMLElement;
            const stylesContainer = document.querySelector('.styles-container') as HTMLElement;
            const traitsContainer = document.querySelector('.traits-container') as HTMLElement;
            const blocksContainer = document.querySelector('.blocks-container') as HTMLElement;


            if (layersContainer) layersContainer.style.display = 'none';
            if (stylesContainer) stylesContainer.style.display = 'block';
            if (traitsContainer) traitsContainer.style.display = 'none';
            if (blocksContainer) blocksContainer.style.display = 'none';

        },
    });

    editor.Commands.add('show-traits', {
        run(editor) {
            const layersContainer = document.querySelector('.layers-container') as HTMLElement;
            const stylesContainer = document.querySelector('.styles-container') as HTMLElement;
            const traitsContainer = document.querySelector('.traits-container') as HTMLElement;
            const blocksContainer = document.querySelector('.blocks-container') as HTMLElement;

            if (layersContainer) layersContainer.style.display = 'none';
            if (stylesContainer) stylesContainer.style.display = 'none';
            if (traitsContainer) traitsContainer.style.display = 'block';
            if (blocksContainer) blocksContainer.style.display = 'none';

        },
    });

    editor.Commands.add('show-blocks', {
        run() {
            document.querySelector('.blocks-container')?.setAttribute('style', 'display: block');
            document.querySelector('.layers-container')?.setAttribute('style', 'display: none');
            document.querySelector('.styles-container')?.setAttribute('style', 'display: none');
            document.querySelector('.traits-container')?.setAttribute('style', 'display: none');
        },
    });

    // Configuración inicial para mostrar el contenedor de bloques
    editor.Commands.run('show-layers');
}

