import React from 'react';
import { Code, Heart, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  const myPhoneNumber = "5215539500411";
  const myEmail = "danymm2407@gmail.com";

  return (
    <footer className="bg-foreground text-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-background">DonyDonitasss</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Creamos experiencias digitales únicas que transforman ideas en sitios web extraordinarios. 
              Tu éxito digital es nuestra pasión.
            </p>
            <div className="flex items-center text-muted-foreground">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 mx-2 text-primary" />
              <span>para impulsar tu negocio</span>
            </div>
          </div>

          <div>
            <span className="text-lg font-semibold text-background mb-4 block">Servicios</span>
            <ul className="space-y-2 text-muted-foreground">
              <li>Landing Pages</li>
              <li>Sitios Informativos</li>
              <li>E-commerce</li>
              <li>Diseño de Marca</li>
              <li>Correos Institucionales</li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold text-background mb-4 block">Contacto</span>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                <a href={`mailto:${myEmail}`} className="text-sm hover:text-primary">{myEmail}</a>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                <a href={`https://wa.me/${myPhoneNumber}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary">
                  +52 55 3950 0411
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm">CDMX (Remoto)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DonyDonitasss. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;