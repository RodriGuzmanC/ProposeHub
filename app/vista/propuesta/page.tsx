'use client'
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PropuestaPage: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [cssContent, setCssContent] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    
    // Obtener el contenido de localStorage
    const storedHtml = localStorage.getItem('propuestaHtml');
    const storedCss = localStorage.getItem('propuestaCss');

    if (storedHtml) setHtmlContent(storedHtml);
    if (storedCss) setCssContent(storedCss);
  }, []);

  return (
    <div>
      {/* Header fijo con botón "Aceptar propuesta" */}
      <header className="sticky top-0 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-lg font-semibold">ProposeHub</span>
            </div>
            
            <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle className="mr-2 h-4 w-4" />
              Aceptar propuesta
            </Button>
          </div>
        </div>
      </header>
      {htmlContent && (
        <div>
          <style>{cssContent}</style>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      )}
      {!htmlContent && <p>No hay contenido disponible.</p>}
    </div>
  );
};

export default PropuestaPage;
