
interface breadProps{
  activeIndex: number,
  onStepChange: (arg : any) => void
}

const Breadcrumb = ({ activeIndex = 0, onStepChange } : breadProps) => {
  const breadcrumbItems = ['Plantilla', 'Contacto', 'Servicio', 'Informacion'];

  return (
    <nav className="w-full flex mb-6 gap-2">
      {breadcrumbItems.map((item, index) => (
        <button
          key={index}
          onClick={() => onStepChange(index)} // Cambia el paso al hacer clic
          className={`px-6 flex-1 py-3 text-sm font-medium rounded-lg transition-colors ${
            index === activeIndex
              ? 'bg-primary text-primary-foreground'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } ${index === 0 ? 'rounded-tl-lg' : ''} ${
            index === breadcrumbItems.length - 1 ? 'rounded-tr-lg' : ''
          }`}
        >
          {item}
        </button>
      ))}
    </nav>
  );
};

export default Breadcrumb;
