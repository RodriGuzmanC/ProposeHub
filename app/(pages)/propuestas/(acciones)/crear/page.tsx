'use client'
import Breadcrumb from '@/app/components/Breadcrumb';
import React, { useEffect, useState } from 'react'
import Paso1 from './paso1';
import Paso2 from './paso2';
import Paso3 from './paso3';
import Paso4 from './paso4';
import { crearPropuesta } from '@/lib/services/propuesta';
import { obtenerPlantillas } from '@/lib/services/plantilla';
import { obtenerServicios } from '@/lib/services/servicio';
import { obtenerOrganizaciones } from '@/lib/services/organizacion';
import PagesLoading from '@/app/components/skeletons/PagesLoading';
import { crearConToast, notificacionAsyncrona } from '@/lib/utils/alertToast';
import { getUserIdFromSession } from '@/lib/services/auth/auth';
import { Organizacion, Plantilla, Propuesta, Servicio } from '@/lib/utils/definitions';
import { useRouter } from 'next/navigation';

export default function Page() {
    {/** Breadcrumb */ }
    const [step, setStep] = useState(0);
    const nextStep = () => setStep(step + 1);
    const previousStep = () => setStep(step - 1);

    {/** Datos seleccionados */ }
    const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<number>(0);
    const [organizacionSeleccionada, setOrganizacionSeleccionada] = useState<number>(0);
    const [selectedService, setSelectService] = useState();
    const [tituloPropuesta, setTituloPropuesta] = useState('')
    const [orgDescripcion, setOrgDescripcion] = useState('')
    const [presupuesto, setPresupuesto] = useState('')
    const [instruccionesAi, setInstruccionesAi] = useState('')
    const [usarAi, setUsarAi] = useState(true)

    const [formData, setFormData] = useState({
        titulo: '',
        informacion: '',
        monto: '',
        comentariosAdicionales: ''
    });

    const router = useRouter()
    async function postPropuesta() {

        /*const propuestaData = {
            id_plantilla: plantillaSeleccionada,
            id_servicio: selectedService,
            id_organizacion: organizacionSeleccionada,
            titulo: tituloPropuesta,
            monto: parseInt(presupuesto),
            usar_ai: usarAi,
            descripcionEmpresa: orgDescripcion,
            informacion: "nada",
            instrucciones_adicionales: instruccionesAi,
            id_usuario: getUserIdFromSession(),
            id_estado: 1,
        }*/
        try {
            /*await crearConToast({
                cuerpo: propuestaData,
                event: crearPropuesta
            })*/

            const propuestaNueva: Partial<Propuesta> = {
                id_plantilla: plantillaSeleccionada,
                id_servicio: selectedService,
                id_organizacion: organizacionSeleccionada,
                titulo: tituloPropuesta,
                monto: parseInt(presupuesto),
                informacion: "nada",
                id_usuario: getUserIdFromSession(),
                id_estado: 1,
            }
            await notificacionAsyncrona(crearPropuesta(usarAi, orgDescripcion, instruccionesAi, propuestaNueva), 'Creando...', 'Propuesta creada correctamente', 'Ocurrio un error, intentalo mas tarde')
            router.push('/propuestas')
            //crearPropuesta(propuestaData)
            //console.log(propuestaData)
        } catch (error) {
            console.error(error);
        }
    }

    /* Obtiene la data para servirla */
    const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([])
    const [plantillas, setPlantillas] = useState<Plantilla[]>([])
    const [servicios, setServicios] = useState<Servicio[]>([])

    const [loading, setLoading] = useState<boolean>(true)

    async function fetchOrganizaciones() {
        setOrganizaciones(await obtenerOrganizaciones())
    }
    async function fetchPlantillas() {
        setPlantillas(await obtenerPlantillas())
    }
    async function fetchServicios() {
        setServicios(await obtenerServicios())
    }

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                fetchOrganizaciones(),
                fetchPlantillas(),
                fetchServicios(),
            ]);
            setLoading(false);
        };

        fetchData();
    }, []);


    return (
        <>
            {loading ? (
                <PagesLoading></PagesLoading>
            ) : (
                <div className='flex justify-center w-full bg-slate-200 py-10 h-full overflow-auto'>

                    <div className="max-w-2xl h-fit mx-auto p-6 bg-white flex-col flex gap-2 items-center rounded-xl">
                        <Breadcrumb activeIndex={step} onStepChange={setStep} />

                        {step === 0 && <Paso1
                            plantillasData={plantillas}
                            plantillaSeleccionada={plantillaSeleccionada}
                            setPlantillaSeleccionada={setPlantillaSeleccionada}
                            nextStep={nextStep}
                        />}
                        {step === 1 && <Paso2
                            organizacionesData={organizaciones}
                            selectedContact={organizacionSeleccionada}
                            setSelectedContact={setOrganizacionSeleccionada}
                            nextStep={nextStep}
                        />}
                        {step === 2 && <Paso3
                            serviciosData={servicios}
                            selectedService={selectedService}
                            setSelectedService={setSelectService}
                            nextStep={nextStep}
                        />}
                        {step === 3 && <Paso4
                            tituloPropuesta={tituloPropuesta}
                            setTituloPropuesta={setTituloPropuesta}
                            orgDescripcion={orgDescripcion}
                            setOrgDescripcion={setOrgDescripcion}
                            presupuesto={presupuesto}
                            setPresupuesto={setPresupuesto}
                            instruccionesAi={instruccionesAi}
                            setInstruccionesAi={setInstruccionesAi}
                            usarAi={usarAi}
                            setUsarAi={setUsarAi}
                            // handle
                            handleSubmit={postPropuesta}
                        />}
                    </div>

                </div>
            )}
        </>
    );
}
