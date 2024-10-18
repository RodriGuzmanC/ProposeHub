
export function AddBlocks(editor: any) {
    // Añadir bloques personalizados
    const blockManager = editor.BlockManager;

    blockManager.add('page-block', {
        label: 'Página',
        content: `
        <table class="page" style="width: 100%; height: 100%; border: 1px solid #ccc; border-collapse: collapse;">
            <tr>
                <td style="vertical-align: middle; text-align: center; padding: 0;">
                    <div style="margin: 0 auto; height: 297mm; width: 210mm; border: 1px solid #ccc; box-sizing: border-box;">
                        Contenido de la Página
                    </div>
                </td>
            </tr>
        </table>
        `,
        category: 'Básico',
    });
    // Bloque de Título
    blockManager.add('titulo-block', {
        label: 'Titulo',
        content: '<h1>Escribe tu título aquí</h1>',
        category: 'Básico',
        activate: true,
    });

    // Bloque de Texto
    blockManager.add('texto-block', {
        label: 'Texto',
        content: '<p>Escribe tu texto aquí</p>',
        category: 'Básico',
        activate: true,
    });

    // Bloque de Botón
    blockManager.add('boton-block', {
        media: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20.5 17h-17A2.502 2.502 0 0 1 1 14.5v-4A2.502 2.502 0 0 1 3.5 8h17a2.502 2.502 0 0 1 2.5 2.5v4a2.502 2.502 0 0 1-2.5 2.5zm-17-8A1.502 1.502 0 0 0 2 10.5v4A1.502 1.502 0 0 0 3.5 16h17a1.502 1.502 0 0 0 1.5-1.5v-4A1.502 1.502 0 0 0 20.5 9zM17 12H7v1h10z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>`,
        label: 'Botón',
        content: '<button class="btn btn-primary">Haz clic aquí</button>',
        category: 'Básico',
        activate: true,
    });
    blockManager.add('imagen-block', {
        label: 'Imagen',
        content: '<img src="https://via.placeholder.com/150" alt="Imagen" />',
        category: 'Básico',
        activate: true,
    });
    blockManager.add('link-block', {
        label: 'Enlace',
        content: '<a href="#">Haz clic aquí</a>',
        category: 'Básico',
        activate: true,
    });
    blockManager.add('lista-ordenada-block', {
        label: 'Lista Ordenada',
        content: '<ol><li>Elemento 1</li><li>Elemento 2</li><li>Elemento 3</li></ol>',
        category: 'Básico',
        activate: true,
    });
    blockManager.add('lista-desordenada-block', {
        label: 'Lista Desordenada',
        content: '<ul><li>Elemento A</li><li>Elemento B</li><li>Elemento C</li></ul>',
        category: 'Básico',
        activate: true,
    });
    blockManager.add('video-block', {
        label: 'Video',
        content: '<video controls><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">Tu navegador no soporta el video</video>',
        category: 'Básico',
        activate: true,
    });
    blockManager.add('tabla-block', {
        label: 'Tabla',
        content: `
        <table border="1">
            <thead><tr><th>Encabezado 1</th><th>Encabezado 2</th></tr></thead>
            <tbody><tr><td>Dato 1</td><td>Dato 2</td></tr></tbody>
        </table>`,
        category: 'Básico',
        activate: true,
    });
    blockManager.add('separador-block', {
        label: 'Separador',
        content: '<hr />',
        category: 'Básico',
        activate: true,
    });
    blockManager.add('cita-block', {
        label: 'Cita',
        content: '<blockquote>Cita textual</blockquote>',
        category: 'Básico',
        activate: true,
    });
    blockManager.add('formulario-block', {
        label: 'Formulario',
        content: `
        <form>
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" />
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" />
            <button type="submit">Enviar</button>
        </form>`,
        category: 'Básico',
        activate: true,
    });
    blockManager.add('icono-block', {
        label: 'Icono',
        content: '<i class="fas fa-star"></i>', // Usando FontAwesome
        category: 'Básico',
        activate: true,
    });
}