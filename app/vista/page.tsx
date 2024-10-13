'use client'
import dynamic from 'next/dynamic';
import { lazy, Suspense } from 'react';
import LoadingFallback from '../components/grapes/LoadingFallback';

const GrapesJSComponent = lazy(() => import('@/app/components/grapes/GrapesJSComponente'));

const EditorPage = () => {
    return (
        <div className="h-screen">
            <Suspense fallback={<LoadingFallback />}>
                <GrapesJSComponent />
            </Suspense>
        </div>
    );
};

export default EditorPage;
