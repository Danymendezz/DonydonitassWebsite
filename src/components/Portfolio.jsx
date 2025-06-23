import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye, Code2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast'; // Importa toast para manejar errores

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para la carga
  const [fetchError, setFetchError] = useState(null); // Nuevo estado para errores de fetch

  // URL de la API con variable de entorno como fallback
  const API_URL = import.meta.env.VITE_API_URL || 'https://donydonitasss.com/api';

  // Función para cargar proyectos desde la API
  const fetchProjectsFromAPI = async () => {
    setIsLoading(true);
    setFetchError(null); // Limpiar errores previos
    try {
      const response = await fetch(`${API_URL}/getProjects.php`, {
        headers: {
          'Accept': 'application/json'
        }
      });

      // Validar que la respuesta sea JSON y que no haya errores HTTP
      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType?.includes('application/json')) {
        const text = await response.text();
        throw new Error(text || 'Respuesta no válida del servidor. Esperaba JSON.');
      }

      const data = await response.json();
      setProjects(data);
      // Opcional: Podrías guardar esto en localStorage si quieres un caché,
      // pero el objetivo es que lea siempre de la base de datos para ver los cambios.
      // localStorage.setItem('portfolioProjects', JSON.stringify(data));
    } catch (error) {
      console.error("Error al cargar proyectos del portafolio:", error);
      setFetchError(error.message);
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: "No se pudieron cargar los proyectos del portafolio. " + error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsFromAPI(); // Llama a la función para cargar proyectos al montar el componente
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  const handleVisitSite = (url) => {
    // Asegurarse de que la URL comience con http:// o https://
    let fullUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      fullUrl = `https://${url}`;
    }
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Code2 className="w-4 h-4 mr-2" />
            Nuestros Proyectos
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Portafolio de
            <span className="gradient-text-custom"> Sitios Web</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada proyecto es único y está diseñado para destacar la personalidad de tu marca
          </p>
        </motion.div>

        {/* Muestra el estado de carga */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
            <p className="text-muted-foreground">Cargando proyectos...</p>
          </div>
        ) : fetchError ? ( // Muestra el error si existe
          <div className="text-center py-12">
            <div className="mx-auto mb-4 text-destructive">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Error al cargar proyectos</h3>
            <p className="text-muted-foreground mb-4">{fetchError}</p>
            <Button
              onClick={fetchProjectsFromAPI}
              variant="outline"
              className="border-border hover:bg-secondary"
            >
              Reintentar
            </Button>
          </div>
        ) : projects.length === 0 ? ( // Si no hay proyectos y no hay error
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No hay proyectos aún</h3>
            <p className="text-muted-foreground">Los proyectos aparecerán aquí una vez que se agreguen desde el panel de administración.</p>
          </div>
        ) : ( // Si hay proyectos y no hay errores
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="portfolio-card bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    className="w-full h-48 object-cover"
                    alt={`Preview del proyecto ${project.name}`}
                    src={project.image}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/400x200?text=Imagen+no+disponible'; // Imagen de fallback
                      e.target.className = 'w-full h-48 object-contain bg-gray-100 p-4'; // Ajuste de clase para fallback
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      onClick={() => handleVisitSite(project.url)}
                      className="bg-background text-foreground hover:bg-secondary"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Vista Previa
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.name}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary font-medium break-all">{project.url}</span>
                    <Button
                      onClick={() => handleVisitSite(project.url)}
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Ver Sitio
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Portfolio;