import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';

function Hero() {
  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-accent/20 rounded-full text-accent-foreground text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-accent" />
              Desarrollo Web Creativo
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Creamos sitios web que
              <span className="gradient-text-custom block">destacan tu negocio</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Desarrollo web personalizado, diseño de marca único y hosting profesional. 
              Transformamos tus ideas en experiencias digitales extraordinarias.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              onClick={scrollToPortfolio}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Ver Portafolio
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg border-2 border-primary text-primary hover:bg-primary/10"
            >
              Cotizar Proyecto
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="floating">
              <img   
                className="mx-auto rounded-2xl shadow-2xl neon-glow-custom max-w-4xl w-full"
                alt="Showcase de desarrollo web creativo con colores rosa y amarillo"
                src="https://images.unsplash.com/photo-1613395752352-292cf623d389" />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;