import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import type { Plugin } from 'grapesjs';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';

// Define the type for the plugin options
interface CustomToolbarsOptions {
  api_key: string;  // Asumiendo que pasas una clave API
}

// Este es el componente React para el diseño del modal
const AITextModal: React.FC<{ onClose: () => void; onSubmit: (content: string) => void }> = ({ onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3000/api/respuesta-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Si tu API requiere una clave API o token, puedes agregarla aquí
          Authorization: `Bearer API_KEY`,  // Pasa tu clave API aquí o desde props
        },
        body: JSON.stringify({
          user_content: inputValue,  // Enviar el valor ingresado por el usuario
        }),
      });

      const data = await response.json();
      onSubmit(data?.message || 'No response');

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>Generar texto con IA</h2>
        <label htmlFor="textboxInput" style={styles.label}>Promp:</label>
        <textarea
          id="textboxInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          rows={4}
          style={styles.textboxInput}
        />
        <button
          style={styles.submitBtn}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
        <button
          style={styles.closeBtn}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Estilos en línea para el modal
const styles = {
  modalOverlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    fontWeight: '500',
    marginBottom: '5px',
  },
  textboxInput: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  submitBtn: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
  closeBtn: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
  },
};

// Función del plugin que integra el modal de React con GrapesJS
export const CustomToolbars: Plugin<CustomToolbarsOptions> = (editor, opts) => {
  const domc = editor.DomComponents;

  domc.addType('text', {
    isComponent: (el) => el.id === 'text',
    model: {
      defaults: {
        toolbar: [
          {
            attributes: { class: 'fa fa-arrows' },
            command: 'tlb-move',
          },
          {
            attributes: { class: 'fa fa-clone' },
            command: 'tlb-clone',
          },
          {
            attributes: { class: 'fa fa-magic' },
            command: 'gen-ai-text',
          },
          {
            attributes: { class: 'fa fa-trash-o' },
            command: 'tlb-delete',
          },
        ],
      },
    },
    view: {},
  });

  const commands = editor.Commands;

  commands.add('gen-ai-text', (editor: any) => {
    const modalContainer = document.createElement('div');
    document.body.appendChild(modalContainer); // Crear contenedor para el modal

    const onClose = () => {
      ReactDOM.unmountComponentAtNode(modalContainer); // Desmontar el componente React cuando se cierre el modal
      modalContainer.remove(); // Eliminar el contenedor del DOM
    };

    const onSubmit = (message: string) => {
      const selectedComponent = editor.getSelected();
      if (selectedComponent && selectedComponent.is('text')) {
        selectedComponent.set('content', message);
        selectedComponent.append(message);
      }
      onClose(); // Cerrar el modal después de recibir la respuesta
    };

    // Montar el componente React en el DOM
    ReactDOM.render(<AITextModal onClose={onClose} onSubmit={onSubmit} />, modalContainer);
  });
};
