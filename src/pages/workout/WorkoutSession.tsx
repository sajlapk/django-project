import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useWorkouts, Workout, WorkoutExercise } from '../../contexts/WorkoutContext';
import { Play, Square, Check, ArrowLeft, Clock, Dumbbell, AlertCircle, Plus, Trash2 } from 'lucide-react';

export default function WorkoutSession() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { workouts, saveWorkout } = useWorkouts();
  
  const queryWorkoutId = searchParams.get('workout_id');
  const [workout, setWorkout] = useState<Workout | null>(null);
  
  // Active session state
  const [title, setTitle] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [error, setError] = useState('');

  // Load workout
  useEffect(() => {
    let currentWorkout: Workout | undefined;

    if (queryWorkoutId) {
      currentWorkout = workouts.find(w => w.id === queryWorkoutId);
    } else {
      // Find the first active session if any
      currentWorkout = workouts.find(w => w.status === 'active');
    }

    if (currentWorkout) {
      setWorkout(currentWorkout);
      setTitle(currentWorkout.title);
      setExercises(currentWorkout.exercises);
      setSeconds(currentWorkout.duration * 60);
    } else {
      // Redirect back to dashboard if no session is active/found
      navigate('/workout-tracker');
    }
  }, [queryWorkoutId, workouts, navigate]);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [
      hrs > 0 ? String(hrs).padStart(2, '0') : null,
      String(mins).padStart(2, '0'),
      String(secs).padStart(2, '0')
    ].filter(Boolean).join(':');
  };

  // Toggle set completion
  const handleToggleSet = (exId: string, setIndex: number) => {
    setExercises(
      exercises.map((ex) => {
        if (ex.id === exId) {
          const newSets = ex.sets.map((set, idx) => {
            if (idx === setIndex) {
              return { ...set, completed: !set.completed };
            }
            return set;
          });
          return { ...ex, sets: newSets };
        }
        return ex;
      })
    );
  };

  const handleFinishSession = async () => {
    setError('');

    if (!title.trim()) {
      setError('Workout Title is required to finish the session.');
      return;
    }

    if (!workout) return;

    try {
      // Mark as completed and save final stats
      await saveWorkout({
        ...workout,
        title: title.trim(),
        duration: Math.ceil(seconds / 60),
        status: 'completed',
        exercises: exercises
      });

      // Redirect to dashboard
      navigate('/workout-tracker');
    } catch (e: any) {
      setError(e.message || 'Failed to complete session.');
    }
  };

  if (!workout) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <p>Loading active session...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen text-[#111827]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/workout-tracker')}
            className="p-2 bg-white hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2 py-0.5 rounded-md">
              Active Session
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-extrabold tracking-tight bg-transparent border-b border-transparent hover:border-gray-300 focus:border-red-500 focus:outline-none w-full max-w-md mt-1"
            />
          </div>
        </div>

        {/* Timer UI */}
        <div className="flex items-center gap-3 bg-[#111827] text-white px-5 py-3 rounded-2xl shadow-md">
          <Clock className="w-5 h-5 text-red-500 animate-pulse" />
          <span className="font-mono text-lg font-black tracking-wider">{formatTime(seconds)}</span>
          <button
            onClick={() => setIsActive(!isActive)}
            className="ml-2 p-1.5 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            {isActive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm font-semibold text-red-600 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Exercises Section */}
      <div className="space-y-6 mb-8">
        {exercises.map((workoutEx) => (
          <div key={workoutEx.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <div>
                <h3 className="font-black text-gray-800 text-base">{workoutEx.name}</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-0.5">{workoutEx.muscle_group}</p>
              </div>
            </div>

            {/* Sets Columns */}
            <div className="grid grid-cols-12 gap-2 text-center text-xs font-bold text-gray-400 mb-2 border-b border-gray-50 pb-2">
              <div className="col-span-2">SET</div>
              <div className="col-span-3">Reps</div>
              <div className="col-span-3">Weight (kg)</div>
              <div className="col-span-4">Status</div>
            </div>

            {/* Sets list */}
            <div className="space-y-2.5">
              {workoutEx.sets.map((set, setIndex) => (
                <div 
                  key={setIndex} 
                  className={`grid grid-cols-12 gap-2 items-center text-center py-2.5 px-2 rounded-xl transition-all ${
                    set.completed ? 'bg-emerald-50/50' : 'bg-gray-50/30'
                  }`}
                >
                  <div className="col-span-2 text-sm font-bold text-gray-500">{setIndex + 1}</div>
                  <div className="col-span-3 font-semibold text-gray-700">{set.reps}</div>
                  <div className="col-span-3 font-semibold text-gray-700">{set.weight}</div>
                  <div className="col-span-4 flex justify-center">
                    <button
                      onClick={() => handleToggleSet(workoutEx.id, setIndex)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        set.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-500 hover:text-emerald-600'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {set.completed ? 'Completed' : 'Complete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleFinishSession}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl text-base transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          Finish Workout Session
        </button>
      </div>
    </div>
  );
}
