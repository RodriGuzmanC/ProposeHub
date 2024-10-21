export function AddPdfBlocks(editor: any) {
    // Añadir bloques personalizados
    const blockManager = editor.BlockManager;

    // Bloque de Página
    blockManager.add('page-block', {
        label: 'Página',
        content: `
        <div class="page" style="width: 100%; height: 100%; border: 1px solid #ccc; border-collapse: collapse;">
            <div style="margin: 0 auto; height: 297mm; width: 210mm; border: 1px solid #ccc; box-sizing: border-box;">
                Contenido de la Página
            </div>
        </div>
        `,
        category: 'Básico',
    });

    // Bloque de Título
    blockManager.add('titulo-block', {
        label: 'Título',
        content: `
            <Text style="font-size: 24px; font-weight: bold;">Escribe tu título aquí</Text>
        `,
        category: 'Básico',
        activate: true,
    });

    // Bloque de Texto
    blockManager.add('texto-block', {
        label: 'Texto',
        content: `
            <Text style="font-size: 12px;">Escribe tu texto aquí</Text>
        `,
        category: 'Básico',
    });

    // Bloque de Imagen
    blockManager.add('imagen-block', {
        label: 'Imagen',
        content: `
            <Image src="url_de_la_imagen_aqui" style="width: 100%; height: auto;" />
        `,
        category: 'Básico',
    });

    // Bloque de Enlace
    blockManager.add('enlace-block', {
        label: 'Enlace',
        content: `
            <Link src="http://example.com" style="color: blue; text-decoration: underline;">Escribe tu enlace aquí</Link>
        `,
        category: 'Básico',
    });
    
    // Bloque de Sección
    blockManager.add('seccion-block', {
        label: 'Sección',
        content: `
        <View style="margin: 10px 0; padding: 10px; border: 1px solid #ccc;">
            <Text>Contenido de la sección</Text>
        </View>
        `,
        category: 'Básico',
    });

    blockManager.add('seccion-block', {
        label: 'Sección',
        content: `
        <View style="margin: 10px 0; padding: 10px; border: 1px solid #ccc;">
            <Text>Contenido de la sección</Text>
        </View>
        `,
        category: 'Básico',
    });
    blockManager.add('document-block', {
        label: 'Documento',
        content: `
        <Document>
            <Page size="A4" style="padding: 20px;">
                <Text>Este es el contenido del documento</Text>
            </Page>
        </Document>
        `,
        category: 'PDF',
    });
    blockManager.add('page-block', {
        label: 'Página',
        content: `
        <Page size="A4" style="padding: 20px;">
            <Text>Contenido de la página</Text>
        </Page>
        `,
        category: 'PDF',
    });
}
