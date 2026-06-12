import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkouts } from '../../contexts/WorkoutContext';
import { Calendar, Clock, Dumbbell, Trash2, Edit2, ChevronDown, ChevronUp, History, ArrowLeft } from 'lucide-react';

export default function WorkoutLogs() {
  const navigate = useNavigate();
  const { workouts, deleteWorkoutLog } = useWorkouts();
  const [expandedWorkoutId, setExpandedWorkoutId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedWorkoutId(expandedWorkoutId === id ? null : id);
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this workout log?')) {
      await deleteWorkoutLog(id);
    }
  };

  const handleEdit = (e: React.MouseEvent, id: string, date: string) => {
    e.stopPropagation();
    navigate(`/workout-tracker/new?workout_id=${id}&date=${date}`);
  };

  // Only show completed workouts
  const completedWorkouts = workouts.filter((w) => w.status === 'completed');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 bg-gray-50 min-h-screen text-[#111827]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate('/workout-tracker')}
          className="p-2 bg-white hover:bg-gray-100 rounded-xl border border-gray-200 text-gray-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Workout Logs</h1>
          <p className="text-gray-500 text-sm mt-1">Review your history, edit previous logs, and inspect your progress.</p>
        </div>
      </div>

      {completedWorkouts.length > 0 ? (
        <div className="space-y-4">
          {completedWorkouts.map((workout) => {
            const isExpanded = expandedWorkoutId === workout.id;
            return (
              <div
                key={workout.id}
                onClick={() => toggleExpand(workout.id)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
              >
                {/* Accordion Header */}
                <div className="p-6 flex items-center justify-between flex-wrap gap-4">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-gray-800 text-base">{workout.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-red-500" />
                        {workout.workout_date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {workout.duration} mins
                      </span>
                      <span className="flex items-center gap-1">
                        <Dumbbell className="w-3.5 h-3.5 text-gray-400" />
                        {workout.exercises.length} exercises
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleEdit(e, workout.id, workout.workout_date)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, workout.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="text-gray-400 p-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-50 bg-gray-50/20">
                    {workout.exercises.length > 0 ? (
                      <div className="space-y-4">
                        {workout.exercises.map((workoutEx, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100">
                            <h4 className="font-black text-gray-800 text-sm mb-2">{workoutEx.name}</h4>
                            <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold text-gray-400 border-b border-gray-50 pb-1 mb-1.5">
                              <div>SET</div>
                              <div>Reps</div>
                              <div>Weight</div>
                              <div>Status</div>
                            </div>
                            <div className="space-y-1">
                              {workoutEx.sets.map((set, setIdx) => (
                                <div key={setIdx} className="grid grid-cols-4 gap-2 text-center text-xs text-gray-600 py-1">
                                  <div>{setIdx + 1}</div>
                                  <div>{set.reps}</div>
                                  <div>{set.weight} kg</div>
                                  <div className="font-semibold text-emerald-600">Done</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic">No exercises logged for this workout.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <History className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-bold text-gray-700 text-base mb-1">No workout logs found</h3>
          <p className="text-xs text-gray-400">Your completed workouts will appear here. Start logging today!</p>
        </div>
      )}
    </div>
  );
}
