'use client'
import { obtenerClientes } from '@/lib/services/cliente'
import { obtenerPlantilla } from '@/lib/services/plantilla';
import { EjemploPrueba, llamarGeminiApi } from '@/lib/services/propuesta';
import { decodificadorEstructuraGrapesJS, reemplazarEstructuraGrapesJS } from '@/lib/utils/placeholderExtract';
import React, { useEffect, useState } from 'react'

const sendEmail = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/enviar-correo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: 'alondramd.19@gmail.com',
            subject: 'Prueba de correo',
            body: 'This is a test email sent from Next.js using Laravel API.'
        }),
    });

    const data = await response.json();
    console.log(data);
};


export default function Page() {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        async function a() : Promise<any>{
            const data = {
                id_plantilla: 14,
                id_servicio: 1,
                id_organizacion: 1,
                titulo: 'Propuesta Tienda Virtual Loopsy.pe',
                monto: 1222,
                usar_ai: true,
                descripcionEmpresa: 'loopsy es una empresa de venta y alquiler de juguetes para niños.',
                informacion: 'No hay indicaciones',
                id_usuario: 1,
                id_estado: 1,
            }
            return await llamarGeminiApi(data)
        }
        
        const res = a()
    },[])

    return (
        <div>
            Se obtiene respuesta de la AI
        </div>
    );
}
