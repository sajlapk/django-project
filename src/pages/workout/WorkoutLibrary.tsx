import React, { useState } from 'react';
import { useWorkouts, Exercise } from '../../contexts/WorkoutContext';
import { Plus, Search, Dumbbell, Trash2, Edit2, Play, ExternalLink, X, AlertCircle } from 'lucide-react';

export default function WorkoutLibrary() {
  const { exercises, addCustomExercise, updateCustomExercise, deleteCustomExercise } = useWorkouts();
  const [activeTab, setActiveTab] = useState<'default' | 'my'>('default');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('Chest');
  const [exerciseType, setExerciseType] = useState('Strength');
  const [equipment, setEquipment] = useState('Barbell');
  const [notes, setNotes] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  
  // Validation state
  const [error, setError] = useState('');

  // Handle open modal for create
  const handleOpenCreate = () => {
    setEditingExercise(null);
    setName('');
    setMuscleGroup('Chest');
    setExerciseType('Strength');
    setEquipment('Barbell');
    setNotes('');
    setYoutubeUrl('');
    setError('');
    setIsModalOpen(true);
  };

  // Handle open modal for edit
  const handleOpenEdit = (ex: Exercise) => {
    setEditingExercise(ex);
    setName(ex.name);
    setMuscleGroup(ex.muscle_group);
    setExerciseType(ex.exercise_type);
    setEquipment(ex.equipment || '');
    setNotes(ex.notes || '');
    setYoutubeUrl(ex.youtube_url || '');
    setError('');
    setIsModalOpen(true);
  };

  // Handle save / submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Exercise Name is required.');
      return;
    }

    try {
      if (editingExercise) {
        // Edit flow
        await updateCustomExercise(editingExercise.id, {
          name: name.trim(),
          muscle_group: muscleGroup,
          exercise_type: exerciseType,
          equipment,
          notes: notes.trim(),
          youtube_url: youtubeUrl.trim(),
        });
      } else {
        // Create flow
        await addCustomExercise({
          name: name.trim(),
          muscle_group: muscleGroup,
          exercise_type: exerciseType,
          equipment,
          notes: notes.trim(),
          youtube_url: youtubeUrl.trim(),
        });
      }
      setIsModalOpen(false);
    } catch (e: any) {
      setError(e.message || 'Failed to save exercise.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this custom exercise?')) {
      await deleteCustomExercise(id);
    }
  };

  // Filter exercises based on query, type (default vs custom)
  const filteredExercises = exercises.filter((ex) => {
    const matchesTab = activeTab === 'default' ? ex.is_default : !ex.is_default;
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ex.muscle_group.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen text-[#111827]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Workout Library</h1>
          <p className="text-gray-500 text-sm mt-1">Browse master exercises or create your own custom exercise templates.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          Create Exercise
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setActiveTab('default')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'default' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Default Exercises
          </button>
          <button
            onClick={() => setActiveTab('my')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'my' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Exercises ({exercises.filter(e => !e.is_default).length})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search exercises/muscle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Grid of Exercises */}
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((ex) => (
            <div
              key={ex.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:scale-[1.01] hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2.5 py-1 rounded-md">
                    {ex.muscle_group}
                  </span>
                  <span className="text-[11px] font-medium text-gray-400">
                    {ex.exercise_type} • {ex.equipment || 'No Gear'}
                  </span>
                </div>
                <h3 className="font-extrabold text-gray-800 text-lg mb-2">{ex.name}</h3>
                {ex.notes && <p className="text-xs text-gray-500 mb-4 line-clamp-2">{ex.notes}</p>}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                {ex.youtube_url ? (
                  <a
                    href={ex.youtube_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-red-500" />
                    Watch Guide
                  </a>
                ) : (
                  <span className="text-[11px] text-gray-400">No Video Guide</span>
                )}

                {!ex.is_default && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEdit(ex)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(ex.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Dumbbell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-bold text-gray-700 text-base mb-1">No exercises found</h3>
          <p className="text-xs text-gray-400">Try searching for something else or create a custom exercise.</p>
        </div>
      )}

      {/* Create / Edit Exercise Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">
                {editingExercise ? 'Edit Custom Exercise' : 'Create Custom Exercise'}
              </h2>
              <p className="text-xs text-gray-400 mt-1">Design an exercise template for your private library.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Exercise Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Incline Dumbbell Press"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                />
              </div>

              {/* Muscle Group & Exercise Type */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Muscle Group *</label>
                  <select
                    value={muscleGroup}
                    onChange={(e) => setMuscleGroup(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                  >
                    {['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio'].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Exercise Type *</label>
                  <select
                    value={exerciseType}
                    onChange={(e) => setExerciseType(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                  >
                    {['Strength', 'Bodyweight', 'Cardio', 'Flexibility'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Equipment & Youtube */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Equipment</label>
                  <input
                    type="text"
                    placeholder="e.g. Dumbbell"
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">YouTube Guide Link</label>
                  <input
                    type="text"
                    placeholder="https://youtube.com/..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Description / Notes</label>
                <textarea
                  placeholder="Set details, tips or focus pointers..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md"
                >
                  Save Exercise
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
