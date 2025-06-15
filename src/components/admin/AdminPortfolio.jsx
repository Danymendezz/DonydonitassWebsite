import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

function AdminPortfolio() {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    image: ''
  });

  // Verifica si localStorage está disponible
  const isLocalStorageAvailable = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      const savedProjects = localStorage.getItem('portfolioProjects');
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      }
    }
  }, []);

  const saveProjects = (updatedProjects) => {
    if (isLocalStorageAvailable()) {
      localStorage.setItem('portfolioProjects', JSON.stringify(updatedProjects));
    }
    setProjects(updatedProjects);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProject) {
      const updatedProjects = projects.map(project =>
        project.id === editingProject.id
          ? { ...project, ...formData }
          : project
      );
      saveProjects(updatedProjects);
      toast({
        title: "Proyecto actualizado",
        description: "El proyecto se ha actualizado correctamente.",
      });
    } else {
      const newProject = {
        id: Date.now(),
        ...formData
      };
      const updatedProjects = [...projects, newProject];
      saveProjects(updatedProjects);
      toast({
        title: "Proyecto agregado",
        description: "El nuevo proyecto se ha agregado al portafolio.",
      });
    }

    resetForm();
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      url: project.url,
      description: project.description,
      image: project.image
    });
    setIsEditing(true);
  };

  const handleDelete = (projectId) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    saveProjects(updatedProjects);
    toast({
      title: "Proyecto eliminado",
      description: "El proyecto se ha eliminado del portafolio.",
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      url: '',
      description: '',
      image: ''
    });
    setIsEditing(false);
    setEditingProject(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Gestión de Portafolio</h2>
        <Button
          onClick={() => setIsEditing(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Proyecto
        </Button>
      </div>

      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              {editingProject ? 'Editar Proyecto' : 'Nuevo Proyecto'}
            </h3>
            <Button
              onClick={resetForm}
              variant="outline"
              size="sm"
              className="text-muted-foreground border-border hover:bg-secondary"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre del Proyecto
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="Ej: Mi Sitio Web"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  URL del Sitio
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="Ej: misitio.donydonitasss.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descripción del Proyecto
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder="Describe brevemente el proyecto..."
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descripción de la Imagen (para Unsplash)
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder="Ej: E-commerce website with modern design and shopping cart, pink and yellow theme"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Describe la imagen que quieres mostrar para este proyecto.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                onClick={resetForm}
                variant="outline"
                className="text-muted-foreground border-border hover:bg-secondary"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingProject ? 'Actualizar' : 'Guardar'}
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-2">{project.name}</h3>
              <p className="text-sm text-primary mb-2">{project.url}</p>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={() => handleEdit(project)}
                  variant="outline"
                  size="sm"
                  className="text-primary border-primary hover:bg-primary/10"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(project.id)}
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && !isEditing && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No hay proyectos</h3>
          <p className="text-muted-foreground mb-4">Comienza agregando tu primer proyecto al portafolio.</p>
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Primer Proyecto
          </Button>
        </div>
      )}
    </div>
  );
}

export default AdminPortfolio;
