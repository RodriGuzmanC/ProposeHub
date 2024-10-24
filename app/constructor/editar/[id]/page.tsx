'use client'
import LoadingFallback from '@/app/components/grapes/LoadingFallback';
import { obtenerPlantilla } from '@/lib/services/plantilla';
import dynamic from 'next/dynamic';
import { lazy, Suspense, useEffect, useState } from 'react';

// Lazy loading para GrapesJSComponent
const GrapesJSComponent = lazy(() => import('@/app/components/grapes/GrapesJSComponente'));


interface EditorPageProps{
    params: { id: string }
}

export default function EditorPage({params} : EditorPageProps) {
    const [slug, setSlug] = useState<number | null>(parseInt(params.id)); // Inicializa como null


    return (
        <div className="h-screen flex flex-col">
            {/* El editor de GrapesJS */}
            <div className="flex-grow">
                {slug !== null ? ( // Verifica si slug está disponible
                    <Suspense fallback={<LoadingFallback />}>
                        <GrapesJSComponent slug={slug} />
                    </Suspense>
                ) : (
                    <LoadingFallback /> // Muestra un cargador mientras se obtiene el slug
                )}
            </div>
        </div>
    );
};