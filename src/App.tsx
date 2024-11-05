import React, { useState } from 'react';
import { Clock, Wrench, Calendar, Plus, Trash2 } from 'lucide-react';

interface MaintenanceTask {
  id: string;
  equipment: string;
  hours: number;
  description: string;
  date: string;
}

function App() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [formData, setFormData] = useState({
    equipment: '',
    hours: '',
    description: '',
    date: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: MaintenanceTask = {
      id: crypto.randomUUID(),
      equipment: formData.equipment,
      hours: Number(formData.hours),
      description: formData.description,
      date: formData.date
    };
    setTasks([...tasks, newTask]);
    setFormData({ equipment: '', hours: '', description: '', date: '' });
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Wrench className="w-10 h-10 text-indigo-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-800">Plan de Mantenimiento</h1>
          </div>
          <p className="text-gray-600">Registra y gestiona los mantenimientos programados</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-2 text-indigo-600" />
              Nuevo Mantenimiento
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipo
                </label>
                <input
                  type="text"
                  required
                  value={formData.equipment}
                  onChange={(e) => setFormData({...formData, equipment: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Nombre del equipo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horas de Mantenimiento
                </label>
                <input
                  type="number"
                  required
                  value={formData.hours}
                  onChange={(e) => setFormData({...formData, hours: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Cantidad de horas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe el mantenimiento"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Agregar Mantenimiento
              </button>
            </form>
          </div>

          {/* Tasks List Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
              Mantenimientos Programados
            </h2>
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No hay mantenimientos programados
                </p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {task.equipment}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {task.hours} horas
                        </div>
                        <div className="text-gray-600 mt-2">
                          {task.description}
                        </div>
                        <div className="text-sm text-indigo-600 mt-2">
                          {new Date(task.date).toLocaleDateString()}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="text-red-500 hover:text-red-700 transition duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;