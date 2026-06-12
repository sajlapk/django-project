import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkouts, WorkoutPreset } from '../../contexts/WorkoutContext';
import { 
  ArrowLeft, Plus, Play, Trash2, Edit, Dumbbell, 
  Sliders, ClipboardList, Info
} from 'lucide-react';

export default function WorkoutPresets() {
  const navigate = useNavigate();
  const { presets, deletePreset, saveWorkout } = useWorkouts();

  const handleStartWorkout = async (preset: WorkoutPreset) => {
    const newWorkoutId = 'work-' + Date.now();
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Map preset exercises to workout exercises with completed=false
    const workoutExercises = preset.exercises.map(ex => ({
      id: ex.id,
      name: ex.name,
      muscle_group: ex.muscle_group,
      sets: ex.sets.map(s => ({
        reps: s.reps,
        weight: s.weight,
        completed: false
      }))
    }));

    // Save as active session
    await saveWorkout({
      id: newWorkoutId,
      title: preset.title,
      workout_date: todayStr,
      duration: 0,
      status: 'active',
      exercises: workoutExercises
    });

    // Navigate to workout session tracker
    navigate(`/workout-tracker/session?workout_id=${newWorkoutId}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this preset?')) {
      await deletePreset(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 bg-gray-50 min-h-screen text-[#111827]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/workout-tracker')}
            className="p-2 bg-white hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <Sliders className="w-8 h-8 text-amber-500" />
              Workout Presets
            </h1>
            <p className="text-gray-500 text-sm mt-1">Create workout templates and start them instantly whenever you exercise.</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/workout-tracker/presets/new')}
          className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold px-5 py-3 rounded-xl text-sm transition-all shadow-md"
        >
          <Plus className="w-5 h-5" />
          Create Preset
        </button>
      </div>

      {presets.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center max-w-xl mx-auto mt-8">
          <div className="p-4 bg-amber-50 rounded-full text-amber-500 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">No Presets Found</h3>
          <p className="text-sm text-gray-400 mb-6">
            You don't have any workout presets saved yet. Create templates for your common routines (e.g. Chest Day, Leg Routine) to start workouts with a single click.
          </p>
          <button
            onClick={() => navigate('/workout-tracker/presets/new')}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            Create Your First Preset
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presets.map((preset) => (
            <div 
              key={preset.id} 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              {/* Preset Card Header */}
              <div className="p-6 pb-4 border-b border-gray-50">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-extrabold text-gray-800 text-lg leading-tight">
                    {preset.title} <span className="text-amber-500">({preset.exercises.length})</span>
                  </h3>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => navigate(`/workout-tracker/presets/new?preset_id=${preset.id}`)}
                      className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Preset"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(preset.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Preset"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                  Saved on {new Date(preset.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              {/* Preset Exercises list */}
              <div className="p-6 py-4 flex-1 space-y-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Exercises</span>
                {preset.exercises.length > 0 ? (
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {preset.exercises.map((ex, index) => (
                      <div key={ex.id} className="flex items-center justify-between text-sm bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                        <div className="space-y-0.5">
                          <p className="font-bold text-gray-700 text-xs">
                            {index + 1}. {ex.name}
                          </p>
                          <p className="text-[9px] text-gray-400 uppercase tracking-wider">{ex.muscle_group}</p>
                        </div>
                        <span className="text-xs bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-md">
                          {ex.sets.length} {ex.sets.length === 1 ? 'set' : 'sets'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    No exercises added to this preset yet.
                  </p>
                )}
              </div>

              {/* Preset Card Actions */}
              <div className="p-6 bg-gray-50/50 border-t border-gray-50">
                <button
                  onClick={() => handleStartWorkout(preset)}
                  disabled={preset.exercises.length === 0}
                  className={`w-full flex items-center justify-center gap-2 font-extrabold py-3 rounded-xl text-sm transition-all shadow-sm ${
                    preset.exercises.length === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#111827] hover:bg-gray-800 text-white hover:shadow-md'
                  }`}
                >
                  <Play className="w-4 h-4 fill-white" />
                  Start Workout
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
