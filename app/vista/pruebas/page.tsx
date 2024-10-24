'use client'
import { obtenerClientes } from '@/lib/services/cliente'
import React, { useEffect, useState } from 'react'

export default function Page() {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const data = await obtenerClientes();
                setClientes(data);
            } catch (error : any) {
                setError(error.message);
            }
        };

        fetchClientes();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    console.log(clientes)

    return (
        <div>
            a
        </div>
    );
}
