'use client'
import { obtenerClientes } from '@/lib/services/cliente'
import { EjemploPrueba } from '@/lib/services/propuesta';
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
        async function a(){
            const data = {
                id_plantilla: 6,
                id_servicio: 1,
                id_organizacion: 5,
                titulo: 'Titulo nuevo',
                monto: 1222,
                usar_ai: true,
                descripcionEmpresa: 'empresa de juguetes',
                informacion: 'Aqui ira info',
                id_usuario: 1,
                id_estado: 1,
            }
            await EjemploPrueba(data)
        }
        a()
    },[])

    return (
        <div>
            se esta enviando el correo
        </div>
    );
}
