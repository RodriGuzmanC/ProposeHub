'use client'
import dynamic from 'next/dynamic';
import { lazy, Suspense } from 'react';
import LoadingFallback from '../components/grapes/LoadingFallback';

// Lazy loading para GrapesJSComponent
const GrapesJSComponent = lazy(() => import('@/app/components/grapes/GrapesJSComponente'));



export default function EditorPage() {
    return (
        <div className="h-screen flex flex-col">

            {/* El editor de GrapesJS */}
            <div className="flex-grow">
                
            </div>
        </div>
    );
};

