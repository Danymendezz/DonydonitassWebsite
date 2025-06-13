import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Save, DollarSign } from 'lucide-react';

function AdminPricing() {
  const [pricing, setPricing] = useState({
    landingPage: 3100,
    basicSite: 5200,
    interactiveFormSite: 6800,
    customBrandingSite: 8400,
    basicEcommerce: 11500,
    corporateSite: 13000,
  });

  useEffect(() => {
    const savedPricing = localStorage.getItem('servicePricing');
    if (savedPricing) {
      setPricing(JSON.parse(savedPricing));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPricing(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('servicePricing', JSON.stringify(pricing));
    toast({
      title: "Precios actualizados",
      description: "Los precios se han actualizado correctamente.",
    });
  };

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
                    value={pricing[field.key]}
                    onChange={handleInputChange}
                    className="w-full pl-7 pr-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
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
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Precios
            </Button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Vista Previa de Precios (MXN)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingFields.slice(0,3).map(field => (
             <div key={`preview-${field.key}`} className="bg-card rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-foreground mb-2">{field.label}</h4>
              <div className="text-2xl font-bold text-primary">${pricing[field.key].toLocaleString('es-MX')}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingFields.slice(3,6).map(field => (
             <div key={`preview-${field.key}`} className="bg-card rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-foreground mb-2">{field.label}</h4>
              <div className="text-2xl font-bold text-primary">${pricing[field.key].toLocaleString('es-MX')}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default AdminPricing;