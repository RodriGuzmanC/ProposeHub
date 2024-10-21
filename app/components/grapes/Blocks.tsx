
export function AddBlocks(editor: any) {
    // Añadir bloques personalizados
    const blockManager = editor.BlockManager;

    blockManager.add('page-block', {
        label: 'Página',
        content: `
            <div class="page" style="width: 100%; height: 100%; background-color: #f0f0f0; position: relative; display: flex; justify-content: center; align-items: center; padding-top: 15px; padding-bottom: 15px;">
                <div data-page="true" style="margin: 0 auto; height: 297mm; width: 210mm; background: white; border: 1px solid #ccc; box-sizing: border-box; position: relative;">
                    <div style="padding: 10px;">
                        Empieza escribiendo algo....
                    </div>
                </div>
            </div>
        `,
        category: 'Primario',
    });
    // Bloque de Título
    blockManager.add('titulo-block', {
        label: 'Titulo',
        content: '<h1 class="text-3xl font-bold text-center mt-4">Escribe tu título aquí</h1>',
        category: 'Otros',
        activate: true,
    });
    
    // Bloque de Texto
    blockManager.add('texto-block', {
        label: 'Texto',
        content: '<p class="text-lg text-gray-700 mt-2">Escribe tu texto aquí</p>',
        category: 'Otros',
        activate: true,
    });
    
    // Bloque de Botón
    blockManager.add('boton-block', {
        media: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20.5 17h-17A2.502 2.502 0 0 1 1 14.5v-4A2.502 2.502 0 0 1 3.5 8h17a2.502 2.502 0 0 1 2.5 2.5v4a2.502 2.502 0 0 1-2.5 2.5zm-17-8A1.502 1.502 0 0 0 2 10.5v4A1.502 1.502 0 0 0 3.5 16h17a1.502 1.502 0 0 0 1.5-1.5v-4A1.502 1.502 0 0 0 20.5 9zM17 12H7v1h10z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>`,
        label: 'Botón',
        content: '<button class="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600">Haz clic aquí</button>',
        category: 'Otros',
        activate: true,
    });
    
    // Bloque de Imagen
    blockManager.add('imagen-block', {
        label: 'Imagen',
        content: '<img class="w-full h-auto rounded shadow" src="https://via.placeholder.com/150" alt="Imagen" />',
        category: 'Otros',
        activate: true,
    });
    
    // Bloque de Enlace
    blockManager.add('link-block', {
        label: 'Enlace',
        content: '<a href="#" class="text-blue-500 underline hover:text-blue-700">Haz clic aquí</a>',
        category: 'Otros',
        activate: true,
    });
    
    // Bloque de Lista Ordenada
    blockManager.add('lista-ordenada-block', {
        label: 'Lista Ordenada',
        content: '<ol class="list-decimal pl-5 mt-2"><li>Elemento 1</li><li>Elemento 2</li><li>Elemento 3</li></ol>',
        category: 'Otros',
        activate: true,
    });
    
    // Bloque de Lista Desordenada
    blockManager.add('lista-desordenada-block', {
        label: 'Lista Desordenada',
        content: '<ul class="list-disc pl-5 mt-2"><li>Elemento A</li><li>Elemento B</li><li>Elemento C</li></ul>',
        category: 'Otros',
        activate: true,
    });
    
    // Bloque de Video
    blockManager.add('video-block', {
        label: 'Video',
        content: '<video class="w-full h-auto rounded shadow" controls><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">Tu navegador no soporta el video</video>',
        category: 'Otros',
        activate: true,
    });
    
    // Bloque de Tabla
    blockManager.add('tabla-block', {
        label: 'Tabla',
        content: `
        <table class="min-w-full border-collapse border border-gray-200">
            <thead>
                <tr>
                    <th class="border border-gray-200 px-4 py-2">Encabezado 1</th>
                    <th class="border border-gray-200 px-4 py-2">Encabezado 2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border border-gray-200 px-4 py-2">Dato 1</td>
                    <td class="border border-gray-200 px-4 py-2">Dato 2</td>
                </tr>
            </tbody>
        </table>`,
        category: 'Otros',
        activate: true,
    });
    
    // Bloque de Separador
    blockManager.add('separador-block', {
        label: 'Separador',
        content: '<hr class="border-t-2 border-gray-300 my-4" />',
        category: 'Otros',
        activate: true,
    });
    
    // Bloque de Cita
    blockManager.add('cita-block', {
        label: 'Cita',
        content: '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600">Cita textual</blockquote>',
        category: 'Otros',
        activate: true,
    });
    
    // Bloque de Formulario
    blockManager.add('formulario-block', {
        label: 'Formulario',
        content: `
        <form class="mt-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Nombre:</label>
            <input type="text" id="name" name="name" class="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <label for="email" class="block text-sm font-medium text-gray-700 mt-4">Email:</label>
            <input type="email" id="email" name="email" class="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" class="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600">Enviar</button>
        </form>`,
        category: 'Otros',
        activate: true,
    });
    
    // Bloque de Icono
    blockManager.add('icono-block', {
        label: 'Icono',
        content: '<i class="fas fa-star text-yellow-500"></i>', // Usando FontAwesome
        category: 'Otros',
        activate: true,
    });

    // Bloque de contenedor
    blockManager.add('contenedor-block', {
        label: 'Contenedor',
        content: '<div class="m-4 w-full"></div>',
        category: 'Otros',
        activate: true,
    });
}