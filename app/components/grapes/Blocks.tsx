
export function AddBlocks(editor: any) {
    // Añadir bloques personalizados
    const blockManager = editor.BlockManager;

    blockManager.add('page-block', {
        label: 'Página',
        content: `
            <div class="page-container" style="width: 100%; height: 100%; background-color: #f0f0f0; position: relative; display: flex; justify-content: center; align-items: center; padding-top: 15px; padding-bottom: 15px;">
                <div data-page="true" style="margin: 0 auto; height: 297mm; width: 210mm; background: white; border: 1px solid #ccc; box-sizing: border-box; position: relative;">
                    <div style="padding: 10px;">
                        Empieza escribiendo algo....
                    </div>
                </div>
            </div>
        `,
        category: 'Advanced',
    });
    
    blockManager.add('boton-block', {
        media: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path d="M20 12H4" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>`,
        label: 'Botón',
        content: '<button style="color: white; background-color: black; padding: 10px; border: none; border-radius: 5px;">Haz clic aquí</button>',
        category: 'Otros',
        activate: true,
    });
    
    blockManager.add('lista-ordenada-block', {
        media: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path d="M6 12h12M6 18h12M6 6h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>`,
        label: 'Lista Ordenada',
        content: '<ol style="padding-left: 20px; margin: 10px 0; list-style-type: decimal;"><li>Elemento 1</li><li>Elemento 2</li><li>Elemento 3</li></ol>',
        category: 'Otros',
        activate: true,
    });
    
    blockManager.add('tabla-block', {
        media: ``,
        label: 'Tabla',
        content: '<table style="width: 100%; border-collapse: collapse; margin: 10px 0;"><tr><th style="border: 1px solid #ccc; padding: 8px;">Header 1</th><th style="border: 1px solid #ccc; padding: 8px;">Header 2</th></tr><tr><td style="border: 1px solid #ccc; padding: 8px;">Cell 1</td><td style="border: 1px solid #ccc; padding: 8px;">Cell 2</td></tr></table>',
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
        media: ``,
        label: 'Cita',
        content: '<blockquote style="border-left: 2px solid #ccc; padding-left: 10px; margin: 10px 0;">Aquí va una cita interesante.</blockquote>',
        category: 'Otros',
        activate: true,
    });
    
}