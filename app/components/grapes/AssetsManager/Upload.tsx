'use client';

import React, { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { subirAsset } from '@/lib/services/imagenes';
import { subirImagenConToast } from '@/lib/utils/alertToast';

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            console.log('Archivo seleccionado:', event.target.files[0].name);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Por favor selecciona una imagen.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            await subirImagenConToast({
                body: [selectedFile],
                event: subirAsset
            })
            setSelectedFile(null)
            console.log('imagen subida correctamente');
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    };

    return (
        <div className="border-2 border-dashed rounded-lg p-12 text-center w-full">
            <Upload className="h-12 w-12 mx-auto" />
            <p className="mt-2 text-sm">Drag and Drop assets here</p>
            <div className="mt-2">Or</div>
            <Button
                size="sm"
                className="mt-2"
                onClick={() => document.getElementById('file-upload')?.click()}
            >
                Browse
            </Button>
            <input
                type="file"
                className="hidden"
                accept="image/*"
                id="file-upload"
                onChange={handleFileChange}
            />

            {selectedFile && (
                <div className="mt-4">
                    <p className="text-sm">Archivo seleccionado: {selectedFile.name}</p>
                    <Button size="sm" className="mt-2" onClick={handleUpload}>
                        Subir imagen
                    </Button>
                </div>
            )}
        </div>
    );
};

export default UploadImage;
