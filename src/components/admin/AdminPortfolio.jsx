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
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // URL de la API con variable de entorno como fallback
  const API_URL = import.meta.env.VITE_API_URL || 'https://donydonitasss.com/api';

  // Función mejorada para cargar proyectos con manejo de errores
  const fetchProjects = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(`${API_URL}/getProjects.php`, {
        headers: {
          'Accept': 'application/json'
        }
      });

      // Verificar si la respuesta es JSON válido
      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType?.includes('application/json')) {
        const text = await response.text();
        throw new Error(text || 'Respuesta no válida del servidor. Esperaba JSON.');
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
      setFetchError(error.message);
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: "No se pudieron cargar los proyectos. Verifica la consola para más detalles.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ✅ MODIFICACIÓN CLAVE AQUÍ: No generes un ID para nuevos proyectos.
      // La base de datos lo generará. Para edición, sí se envía el ID existente.
      const payload = editingProject 
        ? { id: editingProject.id, ...formData } 
        : { ...formData }; // Para nuevos proyectos, solo envía los datos del formulario.

      const response = await fetch(`${API_URL}/saveProject.php`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      // Verificar respuesta JSON
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const text = await response.text();
        throw new Error(text || 'Respuesta no válida del servidor. Esperaba JSON.');
      }

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Error al guardar el proyecto');
      }

      // Después de guardar, recargamos los proyectos de la BDD para asegurar consistencia
      await fetchProjects(); 
      
      toast({
        title: editingProject ? "✅ Proyecto actualizado" : "✅ Proyecto creado",
        description: `"${formData.name}" se guardó correctamente.`,
      });

      resetForm();
    } catch (error) {
      console.error('Error al guardar:', error);
      toast({
        variant: "destructive",
        title: "❌ Error",
        description: error.message || "Error al procesar la solicitud",
      });
    } finally {
      setIsLoading(false);
    }
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

  const handleDelete = async (projectId) => {
    if (!window.confirm('¿Estás seguro de eliminar este proyecto? Esta acción no se puede deshacer.')) {
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/deleteProject.php`, {
        method: "POST", // O DELETE, según como tu backend PHP esté configurado para manejarlo
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ id: projectId })
      });

      // Verificar respuesta JSON
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const text = await response.text();
        throw new Error(text || 'Respuesta no válida del servidor. Esperaba JSON.');
      }

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error || 'Error al eliminar el proyecto');
      }

      // Actualización optimista del estado: elimina el proyecto de la UI inmediatamente
      setProjects(prev => prev.filter(p => p.id !== projectId));
      
      toast({
        title: "🗑️ Proyecto eliminado",
        description: "El proyecto se ha eliminado correctamente.",
      });
    } catch (error) {
      console.error('Error al eliminar:', error);
      toast({
        variant: "destructive",
        title: "❌ Error",
        description: error.message || "No se pudo eliminar el proyecto",
      });
      // En caso de error, recargar para sincronizar con el servidor y mostrar el estado real
      await fetchProjects(); 
    } finally {
      setIsLoading(false);
    }
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
        <h2 className="text-2xl font-bold text-foreground">Administrador de Portafolio</h2>
        <Button
          onClick={() => setIsEditing(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4 mr-2" />
          {projects.length > 0 ? 'Agregar Proyecto' : 'Crear Primer Proyecto'}
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
              disabled={isLoading}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre del Proyecto *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="Ej: Sitio Web Corporativo"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  URL del Proyecto *
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  placeholder="Ej: https://ejemplo.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descripción *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder="Describe el proyecto, tecnologías utilizadas, tu rol, etc."
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                URL de la Imagen *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder="Ej: https://images.unsplash.com/photo-..."
                required
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Usa una imagen de alta calidad que represente el proyecto.
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                onClick={resetForm}
                variant="outline"
                className="text-muted-foreground border-border hover:bg-secondary"
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {editingProject ? 'Actualizar Proyecto' : 'Guardar Proyecto'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Estado de carga */}
      {isLoading && !isEditing ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
          <p className="text-muted-foreground">Cargando proyectos...</p>
        </div>
      ) : fetchError ? (
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
          <div className="flex justify-center space-x-3">
            <Button
              onClick={fetchProjects}
              variant="outline"
              className="border-border hover:bg-secondary"
            >
              Reintentar
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Recargar Página
            </Button>
          </div>
        </div>
      ) : projects.length === 0 && !isEditing ? (
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
            Crear Primer Proyecto
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-card rounded-lg shadow-lg overflow-hidden border border-border hover:shadow-md transition-shadow"
            >
              {project.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/400x200?text=Imagen+no+disponible';
                      e.target.className = 'w-full h-full object-contain bg-gray-100 p-4';
                    }}
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-foreground mb-2">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                
                <div className="mb-4">
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-primary hover:underline break-all"
                  >
                    {project.url}
                  </a>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => handleEdit(project)}
                    variant="outline"
                    size="sm"
                    className="text-primary border-primary hover:bg-primary/10"
                    disabled={isLoading}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(project.id)}
                    variant="outline"
                    size="sm"
                    className="text-destructive border-destructive hover:bg-destructive/10"
                    disabled={isLoading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPortfolio;