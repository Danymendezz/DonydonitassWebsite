import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Send, MessageCircle, MessageSquare } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para la carga
  const myPhoneNumber = "5215539500411";
  const myEmail = "danymm2407@gmail.com";

  // URL de la API (ajusta si es necesario)
  const API_URL = import.meta.env.VITE_API_URL || 'https://donydonitasss.com/api';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => { // Marca la función como async
    e.preventDefault();
    setIsLoading(true); // Inicia el estado de carga

    try {
      // 1. Envía los datos a tu base de datos
      const dbResponse = await fetch(`${API_URL}/saveContact.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // Para indicar que esperamos JSON de vuelta
        },
        body: JSON.stringify(formData) // Envía el estado del formulario como JSON
      });

      // Verifica si la respuesta de la base de datos fue exitosa
      const dbResult = await dbResponse.json();

      if (!dbResponse.ok || !dbResult.success) {
        // Lanza un error si la API responde con un error o success: false
        throw new Error(dbResult.error || 'Error al guardar el mensaje en la base de datos.');
      }

      // Si todo fue bien en la DB:
      toast({
        title: "¡Mensaje enviado!",
        description: "Tu solicitud ha sido recibida y guardada. Nos pondremos en contacto pronto.",
      });

      // Opcional: Limpiar el formulario después del envío exitoso
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });

      // 2. Procede con la redirección a mailto: (o podrías eliminar esto si solo quieres guardar en DB)
      // La redirección `window.location.href` es un poco agresiva y puede interrumpir la experiencia.
      // Considera si realmente quieres abrir el cliente de correo del usuario automáticamente.
      // Si el objetivo principal es guardar en DB, este paso es opcional.
      /*
      const subject = `Solicitud de cotización: ${formData.service || 'Consulta General'}`;
      const body = `Nombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone || 'No proporcionado'}\nServicio de Interés: ${formData.service || 'No especificado'}\n\nMensaje:\n${formData.message}`;
      const mailtoLink = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      toast({
        title: "Redirigiendo a tu cliente de correo...",
        description: "Preparamos un correo para que nos envíes tu solicitud.",
      });
      */

    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      toast({
        variant: "destructive",
        title: "Error al enviar el mensaje",
        description: error.message || "Hubo un problema al procesar tu solicitud. Intenta de nuevo.",
      });
    } finally {
      setIsLoading(false); // Finaliza el estado de carga
    }
  };

  const services = [
    "Landing Page Básica",
    "Sitio Informativo Básico",
    "Sitio con Formulario Interactivo",
    "Sitio con Branding Personalizado",
    "E-commerce Básico",
    "Sitio Corporativo con Correos",
    "Plan de Correos Institucionales",
    "Otro"
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-accent/20 rounded-full text-accent-foreground text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4 mr-2 text-accent" />
            Hablemos
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            ¿Listo para
            <span className="gradient-text-custom"> Comenzar?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href={`mailto:${myEmail}`} className="text-muted-foreground hover:text-primary">{myEmail}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Teléfono / WhatsApp</p>
                    <a href={`https://wa.me/${myPhoneNumber}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                      +52 55 3950 0411
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/80 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Ubicación</p>
                    <p className="text-muted-foreground">Trabajamos de forma remota (CDMX)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
              <h4 className="text-xl font-bold mb-4">¿Por qué elegirnos?</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full mr-3"></div>
                  Diseños únicos y personalizados
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full mr-3"></div>
                  Soporte técnico continuo
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full mr-3"></div>
                  Precios transparentes y justos
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full mr-3"></div>
                  Entrega en tiempo récord
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Envíanos un Mensaje
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder="Tu nombre"
                    required
                    disabled={isLoading} // Deshabilita el input mientras carga
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder="tu@email.com"
                    required
                    disabled={isLoading} // Deshabilita el input mientras carga
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Teléfono (Opcional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder="+52 55 1234 5678"
                    disabled={isLoading} // Deshabilita el input mientras carga
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Servicio de Interés
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    required
                    disabled={isLoading} // Deshabilita el input mientras carga
                  >
                    <option value="">Selecciona un servicio</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Cuéntanos sobre tu proyecto
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="Describe tu proyecto, objetivos y cualquier detalle importante..."
                  required
                  disabled={isLoading} // Deshabilita el input mientras carga
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-lg"
                disabled={isLoading} // Deshabilita el botón mientras carga
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensaje
                  </>
                )}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  const message = `¡Hola! Me gustaría cotizar el servicio: ${formData.service || 'General'}. Mi nombre es ${formData.name || 'No especificado'}. ${formData.message ? `Detalles: ${formData.message}` : ''}`;
                  const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-500/10 py-3 text-lg"
                disabled={isLoading} // Deshabilita el botón mientras carga
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Contactar por WhatsApp
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;