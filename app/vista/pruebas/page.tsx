'use client'
import { obtenerClientes } from '@/lib/services/cliente'
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
        sendEmail()
    },[])

    return (
        <div>
            se esta enviando el correo
        </div>
    );
}
