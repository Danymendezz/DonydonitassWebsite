import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye, Code2 } from 'lucide-react';

function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      const defaultProjects = [
        {
          id: 1,
          name: "Escuela DonyDonitasss",
          url: "escuelita.donydonitasss.com",
          description: "Plataforma educativa moderna con gestión de cursos y estudiantes",
          image: "Educational platform with modern interface showing course management, pink and yellow theme"
        },
        {
          id: 2,
          name: "Invitaciones Digitales",
          url: "invitaciones.donydonitasss.com",
          description: "Sistema de invitaciones digitales personalizables para eventos especiales",
          image: "Digital invitation platform with elegant design templates, pink and yellow theme"
        },
        {
          id: 3,
          name: "Mobiliaria Premium",
          url: "mobiliaria.donydonitasss.com",
          description: "Catálogo online de muebles con experiencia de compra inmersiva",
          image: "Furniture e-commerce website with premium product showcase, pink and yellow theme"
        }
      ];
      setProjects(defaultProjects);
      localStorage.setItem('portfolioProjects', JSON.stringify(defaultProjects));
    }
  }, []);

  const handleVisitSite = (url) => {
    window.open(`https://${url}`, '_blank');
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
                  alt={`Preview del proyecto ${project.name} con tema rosa y amarillo`}
                  src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
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
                  <span className="text-sm text-primary font-medium">{project.url}</span>
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

        {projects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No hay proyectos aún</h3>
            <p className="text-muted-foreground">Los proyectos aparecerán aquí una vez que se agreguen desde el panel de administración.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Portfolio;