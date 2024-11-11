interface Component {
    classes?: string[];
    components?: Component[];
    content?: string;
}

interface Page {
    classes?: string[];
    components?: Component[];
}

interface GrapesJS {
    assets?: any[];   // Puedes definir el tipo más específico si lo necesitas
    pages?: Page[];   // Lista de páginas
    styles?: any[];   // Puedes definir el tipo más específico si lo necesitas
}

export function findPlaceholdersInGrapesJS(grapesJS: any): any {
    const placeholders: string[] = [];
    const grapesJSParsed = JSON.parse(grapesJS);

    // Helper function to extract placeholders from content
    const extractPlaceholders = (content: string) => {
        const regex = /\{\{(.*?)\}\}/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            placeholders.push(match[1]); // Push the content between double braces
        }
    };

    // Recursive function to search through components
    const searchComponents = (components: Component[] = []) => {
        for (const component of components) {
            // Check if the component has content and if it contains placeholders
            if (component.content) {
                extractPlaceholders(component.content);
            }

            // If the component has children components, search them recursively
            if (component.components) {
                searchComponents(component.components);
            }
        }
    };

    const elementosNode: any = []
    // Verificar si la propiedad "pages" existe en el objeto GrapesJS
    if (grapesJSParsed.pages && Array.isArray(grapesJSParsed.pages)) {
        const elementosPage = grapesJSParsed.pages[0].frames[0].component.components
        elementosPage.forEach((seccion: any) => {
            let classes = seccion.classes
            classes.forEach((clase: any) => {
                if (clase == 'page') {
                    //elementosNode.push(seccion)
                    const componentes2 = seccion.components
                    componentes2.forEach((comp: any) => {
                        const bloques = comp.components
                        bloques.forEach((bloque: any) => {
                            if (bloque.type == "text") {
                                const elementosDelBloque = bloque.components
                                elementosDelBloque.forEach((elemBloque: any) => {
                                    const texto = elemBloque.content
                                    elementosNode.push(texto)
                                });
                            }
                        });
                    });
                }
            });
        });
        return elementosNode
        // Iterate through pages and look for "page" class
        /*for (const page of grapesJSParsed.pages) {
            if (page.classes && page.classes.includes("page")) {
                searchComponents(page.components || []);
            }
        }*/
    }


    return placeholders;
}


/*export function decoderGrapesJSBlocks(grapesJS: any){
    const grapesJSParsed = JSON.parse(grapesJS);
    const elementosNode: string[] = [];

    // Función para detectar si el texto está entre doble parentesis
    const isTextInDoubleBraces = (text: string): boolean => {
        return text.startsWith('{{') && text.endsWith('}}');
    };

    // Verificar si la propiedad "pages" existe en el objeto GrapesJS
    if (grapesJSParsed.pages && Array.isArray(grapesJSParsed.pages)) {
        const elementosPage = grapesJSParsed.pages[0].frames[0].component.components;

        elementosPage.forEach((seccion: any) => {
            if (seccion.classes.includes('page')) {
                seccion.components.forEach((comp: any) => {
                    comp.components.forEach((bloque: any) => {
                        if (bloque.type === "text") {
                            bloque.components.forEach((elemBloque: any) => {
                                const texto = elemBloque.content;
                                if (isTextInDoubleBraces(texto)) {
                                    elementosNode.push(texto);
                                }
                            });
                        }
                    });
                });
            }
        });
    }

    return elementosNode;
}*/




/*export function decoderGrapesJSBlocksWithReplacement(grapesJS: any, valores: { [key: string]: string }) {
    const grapesJSParsed = JSON.parse(grapesJS);

    // Función para detectar si el texto está entre doble parentesis
    const isTextInDoubleBraces = (text: string): boolean => {
        return text.startsWith('{{') && text.endsWith('}}');
    };

    // Función para reemplazar texto entre doble parentesis
    const replacePlaceholders = (texto: string): string => {
        return texto.replace(/{{(.*?)}}/g, (match, key) => {
            const trimmedKey = key.trim();
            return valores[trimmedKey] !== undefined ? valores[trimmedKey] : match;
        });
    };

    // Verificar si la propiedad "pages" existe en el objeto GrapesJS
    if (grapesJSParsed.pages && Array.isArray(grapesJSParsed.pages)) {
        const elementosPage = grapesJSParsed.pages[0].frames[0].component.components;

        elementosPage.forEach((seccion: any) => {
            if (seccion.classes.includes('page')) {
                seccion.components.forEach((comp: any) => {
                    comp.components.forEach((bloque: any) => {
                        if (bloque.type === "text") {
                            bloque.components.forEach((elemBloque: any) => {
                                const texto = elemBloque.content;
                                if (isTextInDoubleBraces(texto)) {
                                    elemBloque.content = replacePlaceholders(texto); // Reemplazar el texto directamente
                                }
                            });
                        }
                    });
                });
            }
        });
    }

    return grapesJSParsed; // Devolver el objeto GrapesJS modificado
}*/


/**
 * 
 * @param grapesJS *string
 * @returns Objec
 * 
 * La funcion obtiene la estructura basada en parentesis ( {{}} ) desde grapesJS y devuelve un objeto con la estructura 
 */
export function decodificadorEstructuraGrapesJS(grapesJS: any) {
    const grapesJSParsed = JSON.parse(grapesJS);
    const elementosNode: string[] = [];

    // Función para detectar si el texto está entre doble parentesis
    const isTextInDoubleBraces = (text: string): boolean => {
        return text.startsWith('{{') && text.endsWith('}}');
    };

    // Función recursiva para buscar textos
    const findTextsInComponents = (components: any[]) => {
        components.forEach((comp: any) => {
            
            // Verificar si tiene type y content
            if (comp.type && comp.content && (comp.type == "text" || comp.type == "textnode")) {
                const texto = comp.content;
                if (isTextInDoubleBraces(texto)) {
                    let textoLimpio = texto.slice(2, -2);
                    elementosNode.push(textoLimpio);
                }
            }
            if (Array.isArray(comp.components)) {
                // Llamar recursivamente a la función para los componentes internos
                findTextsInComponents(comp.components);
            }
        });
    };

    // Verificar si la propiedad "pages" existe en el objeto GrapesJS
    if (grapesJSParsed.pages && Array.isArray(grapesJSParsed.pages)) {
        const elementosPage = grapesJSParsed.pages[0].frames[0].component.components;

        elementosPage.forEach((seccion: any) => {
            if ((seccion.classes.includes('page') || seccion.classes.includes('page-container')) && Array.isArray(seccion.components)) {
                findTextsInComponents(seccion.components);
            }
        });
    }

    return elementosNode;
}



export function reemplazarEstructuraGrapesJS(grapesJS: any, valores: { [key: string]: string }) {
    const grapesJSParsed = JSON.parse(grapesJS);

    // Función para detectar si el texto está entre doble parentesis
    const isTextInDoubleBraces = (text: string): boolean => {
        return text.startsWith('{{') && text.endsWith('}}');
    };

    // Función para reemplazar los textos
    const replacePlaceholders = (texto: string): string => {
        return texto.replace(/{{(.*?)}}/g, (match, key) => {
            const trimmedKey = key.trim();
            return valores[trimmedKey] !== undefined ? valores[trimmedKey] : match;
        });
    };

    // Función recursiva para buscar y reemplazar textos
    const findAndReplaceTextsInComponents = (components: any[]) => {
        components.forEach((comp: any) => {
            // Verificar si tiene type y content
            if (comp.type && comp.content && (comp.type === "text" || comp.type === "textnode")) {
                const texto = comp.content;
                if (isTextInDoubleBraces(texto)) {
                    comp.content = replacePlaceholders(texto); // Reemplazar el contenido
                }
            }
            if (Array.isArray(comp.components)) {
                // Llamar recursivamente a la función para los componentes internos
                findAndReplaceTextsInComponents(comp.components);
            }
        });
    };

    // Verificar si la propiedad "pages" existe en el objeto GrapesJS
    if (grapesJSParsed.pages && Array.isArray(grapesJSParsed.pages)) {
        const elementosPage = grapesJSParsed.pages[0].frames[0].component.components;

        elementosPage.forEach((seccion: any) => {
            if ((seccion.classes.includes('page') || seccion.classes.includes('page-container')) && Array.isArray(seccion.components)) {
                findAndReplaceTextsInComponents(seccion.components);
            }
        });
    }

    return JSON.stringify(grapesJSParsed); // Devolver el objeto GrapesJS modificado
}

