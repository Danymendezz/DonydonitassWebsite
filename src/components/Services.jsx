import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Palette, 
  Mail, 
  Server, 
  Check, 
  Star,
  Zap,
  Smartphone,
  ShoppingCart,
  Briefcase,
  MessageSquare
} from 'lucide-react';

function Services() {
  const [pricing, setPricing] = useState({});
  const myPhoneNumber = "5215539500411"; 

  useEffect(() => {
    const savedPricing = localStorage.getItem('servicePricing');
    if (savedPricing) {
      setPricing(JSON.parse(savedPricing));
    } else {
      const defaultPricing = {
        landingPage: 3100,
        basicSite: 5200,
        interactiveFormSite: 6800,
        customBrandingSite: 8400,
        basicEcommerce: 11500,
        corporateSite: 13000,
      };
      setPricing(defaultPricing);
      localStorage.setItem('servicePricing', JSON.stringify(defaultPricing));
    }
  }, []);

  const mainServices = [
    {
      icon: Globe,
      title: "Sitios Web Personalizados",
      description: "Desarrollo completo desde cero, adaptado a tu marca y necesidades específicas.",
      features: ["Diseño responsive", "Optimización SEO", "Carga rápida", "Seguridad avanzada"]
    },
    {
      icon: Palette,
      title: "Diseño de Marca",
      description: "Creación de identidad visual completa: logos, paletas de colores, tipografía.",
      features: ["Logo profesional", "Paleta de colores", "Tipografías", "Manual de marca básico"]
    },
    {
      icon: Mail,
      title: "Correos Institucionales",
      description: "Configuración de emails profesionales con tu dominio personalizado.",
      features: ["Dominio personalizado", "Configuración completa", "Soporte técnico", "Integración con clientes de correo"]
    },
    {
      icon: Server,
      title: "Hosting y Mantenimiento",
      description: "Alojamiento seguro y mantenimiento continuo de tu sitio web.",
      features: ["Hosting premium", "Backups automáticos", "Actualizaciones", "Soporte 24/7"]
    }
  ];

  const pricingPlans = [
    {
      name: "Landing Page Básica",
      price: pricing.landingPage || 3100,
      description: "Perfecta para una presencia rápida y profesional.",
      features: [
        "Una sola sección (scroll único)",
        "Diseño adaptable a celular",
        "Optimización SEO básica",
        "Hosting incluido (1 año)",
        "Entrega rápida"
      ],
      popular: false,
      icon: Smartphone
    },
    {
      name: "Sitio Informativo Básico",
      price: pricing.basicSite || 5200,
      description: "Ideal para presentar tu negocio con más detalle.",
      features: [
        "Hasta 5 páginas (Inicio, Nosotros, Servicios, etc.)",
        "Diseño adaptable a celular",
        "Formulario de contacto",
        "Optimización SEO básica",
        "Hosting incluido (1 año)"
      ],
      popular: true,
      icon: Globe
    },
    {
      name: "Sitio con Formulario Interactivo",
      price: pricing.interactiveFormSite || 6800,
      description: "Perfecto para captar clientes o solicitudes.",
      features: [
        "Incluye todas las funcionalidades del sitio informativo básico",
        "Formulario personalizado (contacto, cotización, etc.)",
        "Integración con redes sociales",
        "Imágenes optimizadas",
        "Hosting incluido (1 año)"
      ],
      popular: false,
      icon: Mail
    },
    {
      name: "Sitio con Branding Personalizado",
      price: pricing.customBrandingSite || 8400,
      description: "Tu marca desde cero, bien presentada.",
      features: [
        "Incluye todas las funcionalidades del sitio con Formulario Básico",
        "Diseño de logo",
        "Paleta de colores personalizada",
        "Tipografía y manual de uso básico",
        "Correos institucionales (hasta 3 cuentas)",
        "Hosting y dominio incluidos (1 año)"
      ],
      popular: false,
      icon: Palette
    },
    {
      name: "E-commerce Básico",
      price: pricing.basicEcommerce || 11500,
      description: "Ideal para vender productos o servicios en línea.",
      features: [
        "Catálogo de productos",
        "Carrito de compras funcional",
        "Diseño adaptable a celular",
        "Integración con pasarelas de pago (Stripe, PayPal, etc.)",
        "Hosting y dominio incluidos (1 año)"
      ],
      popular: true,
      icon: ShoppingCart
    },
    {
      name: "Sitio Corporativo con Correos",
      price: pricing.corporateSite || 14500,
      description: "Para empresas, escuelas o equipos grandes.",
      features: [
        "Incluye todas las funcionalidades del sitio e-commerce o branding",
        "Correos institucionales configurados (hasta 10 cuentas)",
        "Asesoría personalizada",
        "Diseño profesional adaptado a tu rubro",
        "Hosting y dominio incluidos (1 año)"
      ],
      popular: false,
      icon: Briefcase
    }
  ];

  const emailPlans = [
    {
      id: "email_plan_1",
      name: "Plan 1: Creación desde cero (1 cuenta)",
      description: "Ideal si aún no tienes dominio ni servidor.",
      features: [
        "Dominio propio incluido (.com u otro)",
        "Servidor básico para correo institucional",
        "Configuración personalizada (nombre, firma, acceso webmail)"
      ]
    },
    {
      id: "email_plan_2",
      name: "Plan 2: Creación desde cero (varias cuentas)",
      description: "Perfecto para empresas, escuelas o equipos.",
      features: [
        "Dominio incluido",
        "Configuración de varias cuentas personalizadas",
        "Posibilidad de usar con Gmail o Google Workspace",
        "Descuentos por cantidad"
      ]
    },
    {
      id: "email_plan_3",
      name: "Plan 3: Ya tienes dominio o servidor",
      description: "Si ya cuentas con dominio y solo necesitas configurar correos.",
      features: [
        "Configuración técnica de cada cuenta",
        "Integración con Gmail, Outlook, etc.",
        "Opciones con Google Workspace (opcional)",
        "Ideal para quienes solo necesitan ayuda técnica"
      ]
    }
  ];

  const handleWhatsAppRedirect = (planName) => {
    const message = `¡Hola! Estoy interesado/a en cotizar el "${planName}". ¿Podrían darme más información?`;
    const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const handleGeneralQuoteRequest = (planName) => {
    const message = `¡Hola! Estoy interesado/a en cotizar el plan "${planName}". ¿Podrían darme más información?`;
    const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };


  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-accent/20 rounded-full text-accent-foreground text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2 text-accent" />
            Nuestros Servicios
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Servicios que
            <span className="gradient-text-custom"> Transforman</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ofrecemos soluciones completas para llevar tu presencia digital al siguiente nivel
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <service.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pricing-table-custom rounded-3xl p-8"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              Planes y Precios <span className="gradient-text-custom">Flexibles</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Elige el plan que mejor se adapte a tus necesidades (Precios en MXN)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-card rounded-2xl p-6 shadow-lg relative flex flex-col ${
                  plan.popular ? 'ring-2 ring-primary scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Más Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6 flex-grow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">{plan.name}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <div className="text-3xl font-bold gradient-text-custom">
                    ${(plan.price || 0).toLocaleString('es-MX')}
                    <span className="text-lg text-muted-foreground font-normal"> MXN</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent mr-3 flex-shrink-0 mt-1" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleGeneralQuoteRequest(plan.name)}
                  className={`w-full mt-auto ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border border-primary text-primary hover:bg-primary/10'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Cotizar por WhatsApp
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              Planes de <span className="gradient-text-custom">Correos Institucionales</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Los precios se cotizan de manera individual según tus necesidades.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {emailPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-card rounded-2xl p-6 shadow-lg flex flex-col"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">{plan.name}</h4>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">{plan.description}</p>
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent mr-3 flex-shrink-0 mt-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleWhatsAppRedirect(plan.name)}
                  className="w-full mt-auto border border-primary text-primary hover:bg-primary/10"
                  variant="outline"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Cotizar Plan de Correo
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;