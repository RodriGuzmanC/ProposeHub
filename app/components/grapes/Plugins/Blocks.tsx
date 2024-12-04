
export function AddBlocks(editor: any) {
    // Añadir bloques personalizados
    const blockManager = editor.BlockManager;

    blockManager.add('page-block', {
        media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm8 7h-1V4l5 5h-4z"></path></svg>`,
        label: 'Página',
        content: `
            <div class="page-container" style="width: 100%; height: 100%; background-color: #f0f0f0; position: relative; display: flex; justify-content: center; align-items: center; padding-top: 15px; padding-bottom: 15px;">
                <div data-page="true" style="line-height: 1.5; margin: 0 auto; height: 297mm; width: 210mm; background: white; border: 1px solid #ccc; box-sizing: border-box; position: relative;">
                    <div style="padding: 10px;">
                        Empieza escribiendo algo....
                    </div>
                </div>
            </div>
        `,
        category: 'Advanced',
    });

    blockManager.add('boton-block', {
        media: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 17h-17A2.502 2.502 0 0 1 1 14.5v-4A2.502 2.502 0 0 1 3.5 8h17a2.502 2.502 0 0 1 2.5 2.5v4a2.502 2.502 0 0 1-2.5 2.5zm-17-8A1.502 1.502 0 0 0 2 10.5v4A1.502 1.502 0 0 0 3.5 16h17a1.502 1.502 0 0 0 1.5-1.5v-4A1.502 1.502 0 0 0 20.5 9zM17 12H7v1h10z"/><path fill="none" d="M0 0h24v24H0z"/></svg>`,
        label: 'Botón',
        content: '<a href="#" style="text-decoration: none; color: white; background-color: #1a7edb; padding: 10px; border: none; border-radius: 5px;">Haz clic aquí</a>',
        category: 'Otros',
        activate: true,
        type: 'link',
        traits: [
            {
              type: 'text',
              label: 'Texto',
              name: 'title',
              changeProp: 1,  // Indica que cuando el valor cambia, el cambio se refleja en el componente
            },
            {
              type: 'url',
              label: 'Enlace',
              name: 'href',  // Definir el atributo href como editable
              changeProp: 1,  // Indica que cuando el valor cambia, el cambio se refleja en el componente
            },
          ],
    });

    blockManager.add('lista-ordenada-block', {
        media: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path d="M6 12h12M6 18h12M6 6h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>`,
        label: 'Lista Ordenada',
        content: '<ol style="padding-left: 20px; margin: 10px 0; list-style-type: decimal;"><li>Elemento 1</li><li>Elemento 2</li><li>Elemento 3</li></ol>',
        category: 'Otros',
        activate: true,
    });

    blockManager.add('lista-desordenada-block', {
        media: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path d="M6 12h12M6 18h12M6 6h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>`,
        label: 'Lista Desordenada',
        content: '<ul style="padding-left: 20px; margin: 10px 0; list-style-type: disc;"><li>Elemento 1</li><li>Elemento 2</li><li>Elemento 3</li></ul>',
        category: 'Otros',
        activate: true,
    });

    blockManager.add('tabla-block', {
        media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M4 21h15.893c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zm0-2v-5h4v5H4zM14 7v5h-4V7h4zM8 7v5H4V7h4zm2 12v-5h4v5h-4zm6 0v-5h3.894v5H16zm3.893-7H16V7h3.893v5z"></path></svg>`,
        label: 'Tabla',
        content: '<table style="width: 100%; border-collapse: collapse; margin: 10px 0;"><tr><th style="border: 1px solid #ccc; padding: 8px;"><div>Header 1</div></th><th style="border: 1px solid #ccc; padding: 8px;"><div>Header 2</div></th></tr><tr><td style="border: 1px solid #ccc; padding: 8px;"><div>Cell 1</div></td><td style="border: 1px solid #ccc; padding: 8px;"><div>Cell 2</div></td></tr></table>',
        category: 'Otros',
        activate: true,
    });

    blockManager.add('separador-block', {
        media: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path d="M3 12h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>`,
        label: 'Separador',
        content: '<hr style="border: 1px solid #ccc; margin: 20px 0;">',
        category: 'Otros',
        activate: true,
    });

    blockManager.add('cita-block', {
        media: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.318.142-.686.238-1.028.466-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.945-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35l.539-.222.474-.197-.485-1.938-.597.144c-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162-.293.408-.492.856-.702 1.299-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539l.025.168.026-.006A4.5 4.5 0 1 0 17.5 10z"></path></svg>`,
        label: 'Cita',
        content: '<blockquote style="border-left: 2px solid #ccc; padding-left: 10px; margin: 10px 0;">Aquí va una cita interesante.</blockquote>',
        category: 'Otros',
        attributes: {
            class: 'page-block'
        },
        //activate: true,
    });




    // Función para actualizar la propiedad droppable en múltiples elementos
    function actualizarDroppableParaPageContainers() {
        const pageContainers = editor.DomComponents.getWrapper().find('.page-container');

        pageContainers.forEach((pageContainer: any) => {
            const pageElement = pageContainer.find('[data-page="true"]')[0];

            if (pageContainer) {
                pageContainer.set({
                    droppable: false, // Impide agregar elementos directamente al contenedor
                });
            }

            if (pageElement) {
                pageElement.set({
                    droppable: true, // Permite agregar elementos solo dentro de "page"
                });
            }
        });
    }

    // Llama a actualizarDroppableParaPageContainers cada vez que se agrega un bloque
    editor.on('block:drag:stop', actualizarDroppableParaPageContainers);

}