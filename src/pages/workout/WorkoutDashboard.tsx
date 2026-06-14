import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkouts, Workout } from '../../contexts/WorkoutContext';
import { 
  Flame, Award, Calendar as CalendarIcon, CheckCircle2, 
  Plus, History, Dumbbell, AlertTriangle, ArrowRight, XCircle, ChevronLeft, ChevronRight,
  Coffee, Sliders
} from 'lucide-react';

export default function WorkoutDashboard() {
  const navigate = useNavigate();
  const { workouts, getStreak, getTotalCompleted, saveWorkout } = useWorkouts();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const streak = getStreak();
  const totalCompleted = getTotalCompleted();

  // Calculate rest days in current month up to today
  const getRestDaysCount = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    
    let restCount = 0;
    for (let i = 1; i <= lastDayOfMonth; i++) {
      const day = new Date(year, month, i);
      const dayStr = day.toISOString().split('T')[0];
      
      // Count days up to today that have no completed workout
      if (dayStr <= todayStr) {
        const workout = workouts.find(w => w.workout_date === dayStr);
        if (!workout || workout.status !== 'completed') {
          restCount++;
        }
      }
    }
    return restCount;
  };

  const restDaysCount = getRestDaysCount();

  // Find workout for the selected date
  const dateStr = selectedDate.toISOString().split('T')[0];
  const workoutForSelectedDate = workouts.find(w => w.workout_date === dateStr);

  // Today's workout status
  const todayStr = new Date().toISOString().split('T')[0];
  const todayWorkout = workouts.find(w => w.workout_date === todayStr);

  // Toggle today's status (quick complete empty workout or toggle existing)
  const handleToggleTodayStatus = async () => {
    if (todayWorkout) {
      // Toggle status
      const newStatus = todayWorkout.status === 'completed' ? 'active' : 'completed';
      await saveWorkout({
        ...todayWorkout,
        status: newStatus
      });
    } else {
      // Create a quick today's workout
      const newId = 'work-' + Date.now();
      await saveWorkout({
        id: newId,
        title: "Quick Workout",
        workout_date: todayStr,
        duration: 30,
        status: 'completed',
        exercises: []
      });
    }
  };

  // Helper: check calendar day state
  const getDayState = (date: Date) => {
    const dayStr = date.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    const workout = workouts.find(w => w.workout_date === dayStr);

    if (workout) {
      return workout.status === 'completed' ? 'completed' : 'active';
    }

    if (dayStr < today) {
      // Past day with no workout is considered a "Rest Day" by default
      return 'rest';
    }

    if (dayStr === today) {
      return 'today-empty';
    }

    return 'future';
  };

  // Calendar Helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days: Date[] = [];
    
    // Add padding days from previous month to align weeks (start on Monday)
    let startDayOfWeek = firstDay.getDay(); // 0 Sunday, 1 Monday, etc.
    const paddingCount = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    for (let i = paddingCount - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }
    
    // Add current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 bg-gray-50 min-h-screen text-[#111827]">
      {/* Upper Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Workout Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Track your fitness journey, log custom workouts, and stay consistent.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate(`/workout-tracker/presets?date=${dateStr}`)}
            className="flex items-center gap-2 border border-amber-200 bg-amber-50/50 hover:bg-amber-50 text-amber-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            <Sliders className="w-4 h-4 text-amber-500" />
            Workout Presets
          </button>
          <button 
            onClick={() => navigate('/workout-tracker/library')}
            className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            <Dumbbell className="w-4 h-4 text-red-500" />
            Workout Library
          </button>
          <button 
            onClick={() => navigate('/workout-tracker/logs')}
            className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            <History className="w-4 h-4 text-gray-500" />
            History Logs
          </button>
        </div>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Streak Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Current Streak</span>
            <p className="text-3xl font-black text-amber-500 flex items-baseline gap-1">
              {streak} <span className="text-sm font-medium text-gray-500">days</span>
            </p>
            <p className="text-xs text-gray-500">Keep it up! Consistency is key.</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl text-amber-500">
            <Flame className="w-8 h-8 fill-amber-500" />
          </div>
        </div>

        {/* Total Workouts Completed */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Completed</span>
            <p className="text-3xl font-black text-emerald-600">
              {totalCompleted} <span className="text-sm font-medium text-gray-500">sessions</span>
            </p>
            <p className="text-xs text-gray-500">Overall logged workout history.</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600">
            <Award className="w-8 h-8" />
          </div>
        </div>

        {/* Rest Days Metric */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Rest Days</span>
            <p className="text-3xl font-black text-blue-600">
              {restDaysCount} <span className="text-sm font-medium text-gray-500">days</span>
            </p>
            <p className="text-xs text-gray-500">This month (up to today).</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
            <Coffee className="w-8 h-8" />
          </div>
        </div>

        {/* Today's completion Status Toggle */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Today's Workout Status</span>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold px-2.5 py-1 rounded-md ${
                todayWorkout?.status === 'completed' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {todayWorkout?.status === 'completed' ? 'Completed 🎉' : 'Rest/Not Logged 💤'}
              </span>
            </div>
            <button
              onClick={handleToggleTodayStatus}
              className={`text-xs font-bold transition-colors ${
                todayWorkout?.status === 'completed' 
                  ? 'text-red-500 hover:text-red-700' 
                  : 'text-emerald-600 hover:text-emerald-800'
              }`}
            >
              {todayWorkout?.status === 'completed' ? 'Mark as Incomplete' : 'Quick Complete Today\'s Workout'}
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="today-toggle"
              checked={todayWorkout?.status === 'completed' || false}
              onChange={handleToggleTodayStatus}
              className="w-6 h-6 text-red-600 border-gray-300 rounded-lg focus:ring-red-500 cursor-pointer accent-red-600"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Calendar & Day Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Calendar Card */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-gray-500" />
              Workout Calendar
            </h2>
            <div className="flex items-center gap-1">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold min-w-[100px] text-center">
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Names */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-400 mb-2">
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
            <div>SUN</div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              const state = getDayState(day);
              const isSelected = selectedDate.toDateString() === day.toDateString();
              const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
              
              let dayStyles = "h-12 w-full flex flex-col items-center justify-center rounded-xl text-sm font-bold relative transition-all duration-200 cursor-pointer ";
              
              if (!isCurrentMonth) {
                dayStyles += "text-gray-300 ";
              } else {
                dayStyles += "text-gray-700 hover:bg-gray-50 ";
              }

              if (isSelected) {
                dayStyles += "ring-2 ring-red-500 bg-red-50 ";
              }

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(day)}
                  className={dayStyles}
                >
                  <span>{day.getDate()}</span>
                  
                  {/* Calendar Indicator Dot/Icon */}
                  {state === 'completed' && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  )}
                  {state === 'active' && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  )}
                  {state === 'rest' && isCurrentMonth && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-gray-100 text-xs font-medium text-gray-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
              Completed Workout
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
              Active Session
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-gray-300 rounded-full"></span>
              Rest Day
            </div>
          </div>
        </div>

        {/* Selected Day Details Panel */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[350px]">
          <div>
            <div className="border-b border-gray-100 pb-4 mb-4">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Selected Date</span>
              <h3 className="text-lg font-bold text-gray-800">
                {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
            </div>

            {workoutForSelectedDate ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-extrabold text-gray-800 text-sm mb-1">{workoutForSelectedDate.title}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                    Duration: {workoutForSelectedDate.duration} mins • Status: {workoutForSelectedDate.status}
                  </p>
                  <div className="space-y-1">
                    {workoutForSelectedDate.exercises.slice(0, 3).map((ex, i) => (
                      <p key={i} className="text-xs text-gray-600 font-medium">
                        • {ex.name} ({ex.sets.length} sets)
                      </p>
                    ))}
                    {workoutForSelectedDate.exercises.length > 3 && (
                      <p className="text-[10px] text-gray-400 italic">
                        + {workoutForSelectedDate.exercises.length - 3} more exercises
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/workout-tracker/session?workout_id=${workoutForSelectedDate.id}`)}
                    className="flex-1 text-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    Start / Resume Session
                  </button>
                  <button
                    onClick={() => navigate(`/workout-tracker/new?workout_id=${workoutForSelectedDate.id}&date=${dateStr}`)}
                    className="flex-1 text-center border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    Edit Workout
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-gray-400 font-medium mb-1">Rest Day 💤</p>
                <p className="text-xs text-gray-400">No workout was logged on this day. You can add a workout log for this day anytime.</p>
              </div>
            )}
          </div>

          {!workoutForSelectedDate && (
            <button
              onClick={() => navigate(`/workout-tracker/new?date=${dateStr}`)}
              className="w-full flex items-center justify-center gap-2 bg-[#111827] hover:bg-gray-800 text-white font-bold py-3 rounded-xl text-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              Log Workout for this Day
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
