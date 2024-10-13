'use client'
import Breadcrumb from '@/app/components/Breadcrumb';
import React, { useState } from 'react'
import Paso1 from './paso1';
import Paso2 from './paso2';
import Paso3 from './paso3';
import Paso4 from './paso4';

export default function Page() {
    {/** Breadcrumb */ }
    const [step, setStep] = useState(0);
    const nextStep = () => setStep(step + 1);
    const previousStep = () => setStep(step - 1);

    {/** Datos */}
    const [plantillaSeleccionada, setPlantillaSeleccionada] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedService, setSelectService] = useState(null);
    const [formData, setFormData] = useState({
        proposalName: '',
        companyDescription: '',
        budget: '',
        additionalComments: ''
    });


    return (
        <div className='flex justify-center w-full bg-slate-200 py-10'>
            <div className="max-w-2xl mx-auto p-6 bg-white flex-col flex gap-2 items-center rounded-xl">
                <Breadcrumb activeIndex={step} onStepChange={setStep} />

                {step === 0 && <Paso1 
                plantillaSeleccionada={plantillaSeleccionada} 
                setPlantillaSeleccionada={setPlantillaSeleccionada} 
                nextStep={nextStep}
                />}
                {step === 1 && <Paso2 
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
                nextStep={nextStep}
                />}
                {step === 2 && <Paso3 
                selectedService={selectedService}
                setSelectedService={setSelectService}
                nextStep={nextStep}
                />}
                {step === 3 && <Paso4 
                formData={formData}
                setFormData={setFormData}
                />}
            </div>
        </div>
    );
}
