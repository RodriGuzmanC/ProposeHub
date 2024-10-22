'use client'
import LoadingFallback from '@/app/components/grapes/LoadingFallback';
import dynamic from 'next/dynamic';
import { lazy, Suspense } from 'react';

// Lazy loading para GrapesJSComponent
const GrapesJSComponent = lazy(() => import('@/app/components/grapes/GrapesJSComponente'));


interface EditorPageProps{
    params: { slug: string }
}

export default function EditorPage({params} : EditorPageProps) {
    return (
        <div className="h-screen flex flex-col">
            <p>{params.slug}</p>
            {/* El editor de GrapesJS */}
            <div className="flex-grow">
                <Suspense fallback={<LoadingFallback />}>
                    <GrapesJSComponent />
                </Suspense>
            </div>
        </div>
    );
};