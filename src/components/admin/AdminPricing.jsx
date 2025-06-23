import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Save, DollarSign } from 'lucide-react';

function AdminPricing() {
  const [pricing, setPricing] = useState({
    landingPage: 0, // Inicializa con 0 o un valor nulo, se cargará de la DB
    basicSite: 0,
    interactiveFormSite: 0,
    customBrandingSite: 0,
    basicEcommerce: 0,
    corporateSite: 0,
  });
  const [isLoading, setIsLoading] = useState(false); // Estado para indicar carga
  const [fetchError, setFetchError] = useState(null); // Estado para errores de carga/guardado

  // URL de la API (ajusta si es necesario)
  const API_URL = import.meta.env.VITE_API_URL || 'https://donydonitasss.com/api';

  // --- Función para cargar precios desde la API ---
  const fetchPricing = async () => {
    setIsLoading(true);
    setFetchError(null); // Limpiar errores previos
    try {
      const response = await fetch(`${API_URL}/getPricing.php`, {
        headers: {
          'Accept': 'application/json'
        }
      });

      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType?.includes('application/json')) {
        const text = await response.text();
        throw new Error(text || 'Respuesta no válida del servidor. Esperaba JSON.');
      }

      const data = await response.json();
      // Si la base de datos devuelve un objeto vacío (ej. si no hay fila con id=1),
      // usará los valores por defecto iniciales del estado.
      if (Object.keys(data).length > 0) {
        // Convertir strings a numbers si es necesario (PDO::FETCH_ASSOC devuelve strings)
        const parsedData = {};
        for (const key in data) {
          parsedData[key] = parseFloat(data[key]);
        }
        setPricing(parsedData);
      } else {
        // Si no hay datos en la DB, inicializa con valores por defecto (o los que quieras)
        setPricing({
          landingPage: 3100,
          basicSite: 5200,
          interactiveFormSite: 6800,
          customBrandingSite: 8400,
          basicEcommerce: 11500,
          corporateSite: 13000,
        });
        toast({
          title: "Precios iniciales",
          description: "No se encontraron precios en la base de datos, se cargaron los valores por defecto.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error al cargar precios:", error);
      setFetchError(error.message);
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: `No se pudieron cargar los precios. ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPricing(); // Carga los precios al montar el componente
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Asegurarse de que el valor sea un número, o 0 si no es válido
    setPricing(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  // --- Función para guardar precios en la API ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(`${API_URL}/savePricing.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(pricing) // Envía el objeto de precios completo
      });

      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType?.includes('application/json')) {
        const text = await response.text();
        throw new Error(text || 'Respuesta no válida del servidor. Esperaba JSON.');
      }

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Error al guardar los precios');
      }

      toast({
        title: "✅ Precios actualizados",
        description: "Los precios se han guardado correctamente en la base de datos.",
      });

      // Opcional: Recargar precios después de guardar para asegurar que se muestran los datos de la DB
      // fetchPricing(); 

    } catch (error) {
      console.error('Error al guardar precios:', error);
      setFetchError(error.message);
      toast({
        variant: "destructive",
        title: "❌ Error al guardar",
        description: error.message || "No se pudieron guardar los precios.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Definición de los campos de precios para renderizado
  const pricingFields = [
    {
      key: 'landingPage',
      label: 'Landing Page Básica',
      description: 'Precio para landing page de una sola sección'
    },
    {
      key: 'basicSite',
      label: 'Sitio Informativo Básico',
      description: 'Precio para sitios web informativos (hasta 5 páginas)'
    },
    {
      key: 'interactiveFormSite',
      label: 'Sitio con Formulario Interactivo',
      description: 'Precio para sitios con formularios personalizados'
    },
    {
      key: 'customBrandingSite',
      label: 'Sitio con Branding Personalizado',
      description: 'Precio para sitios con diseño de logo y marca'
    },
    {
      key: 'basicEcommerce',
      label: 'E-commerce Básico',
      description: 'Precio para tiendas en línea básicas'
    },
    {
      key: 'corporateSite',
      label: 'Sitio Corporativo con Correos',
      description: 'Precio para sitios empresariales completos'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Gestión de Precios</h2>
        <div className="flex items-center text-sm text-muted-foreground">
          <DollarSign className="w-4 h-4 mr-1" />
          Precios en MXN
        </div>
      </div>

      {/* Muestra estado de carga global o error al cargar precios */}
      {isLoading && fetchError === null ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
          <p className="text-muted-foreground">Cargando precios...</p>
        </div>
      ) : fetchError ? (
        <div className="text-center py-12 text-destructive">
          <p className="mb-2">Error: {fetchError}</p>
          <Button onClick={fetchPricing} variant="outline">Reintentar Carga</Button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg shadow-lg p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-muted-foreground sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name={field.key}
                      // Asegurarse de que pricing[field.key] no sea undefined o null
                      value={pricing[field.key] !== undefined && pricing[field.key] !== null ? pricing[field.key] : ''}
                      onChange={handleInputChange}
                      className="w-full pl-7 pr-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                      disabled={isLoading} // Deshabilita inputs mientras se guarda
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{field.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading} // Deshabilita el botón mientras se guarda
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </span>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Precios
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Sección de Vista Previa de Precios (se muestra siempre que no haya un error de carga bloqueante) */}
      {!fetchError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Vista Previa de Precios (MXN)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricingFields.slice(0, 3).map(field => (
              <div key={`preview-${field.key}`} className="bg-card rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-foreground mb-2">{field.label}</h4>
                {/* Asegurarse de que el precio es un número antes de formatear */}
                <div className="text-2xl font-bold text-primary">
                  ${typeof pricing[field.key] === 'number' ? pricing[field.key].toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricingFields.slice(3, 6).map(field => (
              <div key={`preview-${field.key}`} className="bg-card rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-foreground mb-2">{field.label}</h4>
                <div className="text-2xl font-bold text-primary">
                  ${typeof pricing[field.key] === 'number' ? pricing[field.key].toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default AdminPricing;