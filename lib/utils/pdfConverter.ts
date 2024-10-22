// Función para extraer HTML del JSON
export const extractHtmlFromJson = (data: any) => {
    // Aquí puedes implementar la lógica para convertir el JSON a HTML
    // Si GrapesJS tiene alguna estructura particular, debes reconstruirla aquí
    // Este es un ejemplo básico que depende de cómo hayas almacenado los datos
    let html = '';

    if (data.pages && data.pages[0].frames && data.pages[0].frames[0].component) {
      const component = data.pages[0].frames[0].component;
      html = generateHtmlFromComponent(component);
    }

    return html;
  };

  // Función para extraer CSS del JSON
  export const extractCssFromJson = (data: any) => {
    let css = '';

    if (data.styles) {
      data.styles.forEach((style: any) => {
        css += `${style.selectors.join(', ')} { ${Object.entries(style.style).map(([key, value]) => `${key}: ${value};`).join(' ')} }`;
      });
    }

    return css;
  };

  // Función para generar HTML desde un componente
  export const generateHtmlFromComponent = (component: any): string => {
    let html = `<${component.tagName || 'div'} ${component.attributes ? Object.entries(component.attributes).map(([key, value]) => `${key}="${value}"`).join(' ') : ''}>`;

    if (component.components && component.components.length > 0) {
      component.components.forEach((child: any) => {
        html += generateHtmlFromComponent(child);
      });
    } else if (component.type === 'textnode') {
      html += component.content || '';
    }

    html += `</${component.tagName || 'div'}>`;
    return html;
  };