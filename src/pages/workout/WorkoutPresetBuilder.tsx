import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWorkouts, WorkoutExercise, Exercise } from '../../contexts/WorkoutContext';
import { 
  Plus, Trash2, ArrowLeft, Search, Dumbbell, 
  AlertCircle, PlusCircle, Check, Save, Sliders, XCircle
} from 'lucide-react';

export default function WorkoutPresetBuilder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { exercises, presets, savePreset } = useWorkouts();

  const queryPresetId = searchParams.get('preset_id');

  // Preset state
  const [presetId, setPresetId] = useState('');
  const [title, setTitle] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);

  // Search exercise state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [error, setError] = useState('');

  // Load existing preset or set defaults
  useEffect(() => {
    if (queryPresetId) {
      const existing = presets.find((p) => p.id === queryPresetId);
      if (existing) {
        setPresetId(existing.id);
        setTitle(existing.title);
        setSelectedExercises(existing.exercises);
      }
    } else {
      setPresetId('preset-' + Date.now());
      // Default title matching user's requirement: "Preset [Count + 1]"
      const nextNum = presets.length + 1;
      setTitle(`Preset ${nextNum}`);
    }
  }, [queryPresetId, presets]);

  // Handle adding exercise from library
  const handleAddExercise = (ex: Exercise) => {
    // Check if already added
    if (selectedExercises.some((item) => item.id === ex.id)) return;

    const newWorkoutEx: WorkoutExercise = {
      id: ex.id,
      name: ex.name,
      muscle_group: ex.muscle_group,
      sets: [{ reps: 10, weight: 20 }], // default target set
    };
    setSelectedExercises([...selectedExercises, newWorkoutEx]);
  };

  // Remove exercise
  const handleRemoveExercise = (id: string) => {
    setSelectedExercises(selectedExercises.filter((ex) => ex.id !== id));
  };

  // Add a set to a specific exercise
  const handleAddSet = (exId: string) => {
    setSelectedExercises(
      selectedExercises.map((ex) => {
        if (ex.id === exId) {
          const lastSet = ex.sets[ex.sets.length - 1] || { reps: 10, weight: 20 };
          return {
            ...ex,
            sets: [...ex.sets, { reps: lastSet.reps, weight: lastSet.weight }],
          };
        }
        return ex;
      })
    );
  };

  // Remove set from a specific exercise
  const handleRemoveSet = (exId: string, setIndex: number) => {
    setSelectedExercises(
      selectedExercises.map((ex) => {
        if (ex.id === exId) {
          const newSets = ex.sets.filter((_, idx) => idx !== setIndex);
          return {
            ...ex,
            sets: newSets.length > 0 ? newSets : [{ reps: 10, weight: 20 }],
          };
        }
        return ex;
      })
    );
  };

  // Update set values
  const handleUpdateSet = (exId: string, setIndex: number, fields: { reps?: number; weight?: number }) => {
    setSelectedExercises(
      selectedExercises.map((ex) => {
        if (ex.id === exId) {
          const newSets = ex.sets.map((set, idx) => {
            if (idx === setIndex) {
              return { ...set, ...fields };
            }
            return set;
          });
          return { ...ex, sets: newSets };
        }
        return ex;
      })
    );
  };

  // Handle Save Preset
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Preset Title is required.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (selectedExercises.length === 0) {
      setError('Please add at least one exercise to your preset.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      await savePreset({
        id: presetId,
        title: title.trim(),
        exercises: selectedExercises,
      });

      // Redirect back to presets page
      navigate('/workout-tracker/presets');
    } catch (e: any) {
      setError(e.message || 'Failed to save preset.');
    }
  };

  // Exercises filtering
  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === 'All' || ex.muscle_group === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

  const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 bg-gray-50 min-h-screen text-[#111827]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/workout-tracker/presets')}
          className="p-2 bg-white hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <Sliders className="w-8 h-8 text-amber-500" />
            {queryPresetId ? 'Edit Workout Preset' : 'Create Workout Preset'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Configure your routine template, exercises, target sets, weights, and reps.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm font-semibold text-red-600 flex items-center gap-2 shadow-sm">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Form + Selected Exercises Builder */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General info Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">Preset Details</h2>
            
            <div className="space-y-4">
              {/* Title Input */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Preset Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Chest Day, Leg Workout"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Builder area */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">Exercises in Preset</h2>

            {selectedExercises.length > 0 ? (
              <div className="space-y-6">
                {selectedExercises.map((workoutEx, exIndex) => (
                  <div key={workoutEx.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4 border-b border-gray-200/50 pb-2">
                      <div>
                        <h3 className="font-extrabold text-gray-800 text-sm">{workoutEx.name}</h3>
                        <span className="text-[10px] bg-amber-50 text-amber-600 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {workoutEx.muscle_group}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveExercise(workoutEx.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Sets Header */}
                    <div className="grid grid-cols-12 gap-2 text-center text-xs font-bold text-gray-400 mb-2">
                      <div className="col-span-2">SET</div>
                      <div className="col-span-4">Reps</div>
                      <div className="col-span-4">Weight (kg)</div>
                      <div className="col-span-2">Action</div>
                    </div>

                    {/* Sets List */}
                    <div className="space-y-2">
                      {workoutEx.sets.map((set, setIndex) => (
                        <div key={setIndex} className="grid grid-cols-12 gap-2 items-center text-center">
                          <div className="col-span-2 text-sm font-bold text-gray-500">{setIndex + 1}</div>
                          <div className="col-span-4">
                            <input
                              type="number"
                              value={set.reps}
                              onChange={(e) =>
                                handleUpdateSet(workoutEx.id, setIndex, { reps: Number(e.target.value) })
                              }
                              className="w-full text-center bg-white border border-gray-200 rounded-lg py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                          </div>
                          <div className="col-span-4">
                            <input
                              type="number"
                              value={set.weight}
                              onChange={(e) =>
                                handleUpdateSet(workoutEx.id, setIndex, { weight: Number(e.target.value) })
                              }
                              className="w-full text-center bg-white border border-gray-200 rounded-lg py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                          </div>
                          <div className="col-span-2 flex justify-center">
                            <button
                              onClick={() => handleRemoveSet(workoutEx.id, setIndex)}
                              className="text-gray-400 hover:text-red-500 p-1"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleAddSet(workoutEx.id)}
                      className="mt-4 flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      Add Set
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Dumbbell className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                <p className="text-xs">No exercises added yet. Select exercises from the library on the right.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Exercise Library Drawer */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 mb-4">Add Exercises</h2>

          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search exercise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
          </div>

          {/* Muscle Filters */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {muscleGroups.map((muscle) => (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition-all ${
                  selectedMuscle === muscle
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {muscle}
              </button>
            ))}
          </div>

          {/* Exercises scrollable list */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredExercises.map((ex) => {
              const isAdded = selectedExercises.some((item) => item.id === ex.id);
              return (
                <div
                  key={ex.id}
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100/70 rounded-xl transition-all border border-gray-100"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-gray-800">{ex.name}</p>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider">{ex.muscle_group}</p>
                  </div>

                  <button
                    onClick={() => handleAddExercise(ex)}
                    disabled={isAdded}
                    className={`p-1.5 rounded-lg border transition-all ${
                      isAdded
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-600 cursor-not-allowed'
                        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-amber-500'
                    }`}
                  >
                    {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Action Panel */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-md"
            >
              <Save className="w-4 h-4" />
              Save Preset Template
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
