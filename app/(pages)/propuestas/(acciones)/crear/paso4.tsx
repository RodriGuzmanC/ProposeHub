import Button from '@/app/components/Button';
import React, { ChangeEvent } from 'react';

interface FormData {
  proposalName: string;
  companyDescription: string;
  budget: string;
  additionalComments: string;
}

interface Paso4Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit: () => void
}

export default function Paso4({ formData, setFormData, handleSubmit }: Paso4Props) {

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl text-gray-950 font-bold text-center mb-2">Información General</h1>
      <p className="text-center text-sm text-gray-950 mb-8">potenciado con AI</p>

      <form className="space-y-6">
        <div>
          <label htmlFor="proposalName" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la propuesta
          </label>
          <input
            type="text"
            id="proposalName"
            name="proposalName"
            value={formData.proposalName}
            onChange={handleInputChange}
            placeholder="Propuesta"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción de la empresa
          </label>
          <textarea
            id="companyDescription"
            name="companyDescription"
            value={formData.companyDescription}
            onChange={handleInputChange}
            placeholder="Una breve descripción de la empresa"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Presupuesto
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            placeholder="Presupuesto de la propuesta"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700 mb-1">
            Comentarios adicionales
          </label>
          <textarea
            id="additionalComments"
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleInputChange}
            placeholder="Describe si la AI te deseás agregar"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleSubmit} variant='primary'>
            Generar Propuesta
          </Button>
        </div>
      </form>
    </div>
  );
}
