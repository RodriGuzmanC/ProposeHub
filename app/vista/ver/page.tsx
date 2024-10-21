'use client'
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const ViewPage = () => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [cssContent, setCssContent] = useState<string | null>(null);

  useEffect(() => {
    // Recuperar el JSON almacenado en localStorage
    const savedJson = localStorage.getItem('gjsProject');
    if (savedJson) {
      const projectData = JSON.parse(savedJson);

      // Extraer el HTML de los componentes
      const html = extractHtmlFromJson(projectData);

      // Extraer el CSS de los estilos
      const css = extractCssFromJson(projectData);

      setHtmlContent(html);
      setCssContent(css);
    }
  }, []);

  // Función para extraer HTML del JSON
  const extractHtmlFromJson = (data: any) => {
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
  const extractCssFromJson = (data: any) => {
    let css = '';

    if (data.styles) {
      data.styles.forEach((style: any) => {
        css += `${style.selectors.join(', ')} { ${Object.entries(style.style).map(([key, value]) => `${key}: ${value};`).join(' ')} }`;
      });
    }

    return css;
  };

  // Función para generar HTML desde un componente
  const generateHtmlFromComponent = (component: any): string => {
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

  return (
    <div>
      {/* Header fijo con botón "Aceptar propuesta" */}
      <header className="sticky top-0 left-0 w-full bg-white shadow-md p-4 z-10">
        <button className="flex items-center text-green-600 hover:bg-gray-200 rounded px-4 py-2">
          <CheckCircle className="mr-2" />
          Aceptar propuesta
        </button>
      </header>
      {/* Inyectar el CSS si existe */}
      {cssContent && <style dangerouslySetInnerHTML={{ __html: cssContent }} />}
      
      {/* Renderizar el HTML extraído del JSON */}
      {htmlContent ? (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <p>No content available</p>
      )}
    </div>
  );
};

export default ViewPage;
