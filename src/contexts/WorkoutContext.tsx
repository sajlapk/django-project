import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase/firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';

export interface Exercise {
  id: string;
  name: string;
  muscle_group: string;
  exercise_type: string;
  youtube_url?: string;
  notes?: string;
  equipment?: string;
  is_default: boolean;
  created_at?: string;
}

export interface SetLog {
  reps: number;
  weight: number;
  completed?: boolean;
}

export interface WorkoutExercise {
  id: string; // exercise ID
  name: string;
  muscle_group: string;
  sets: SetLog[];
}

export interface Workout {
  id: string;
  user_id: string;
  title: string;
  workout_date: string; // YYYY-MM-DD
  duration: number; // in minutes
  status: 'completed' | 'active';
  exercises: WorkoutExercise[];
  created_at: string;
}

export interface WorkoutPreset {
  id: string;
  user_id: string;
  title: string;
  exercises: WorkoutExercise[];
  created_at: string;
}

interface WorkoutContextType {
  exercises: Exercise[];
  workouts: Workout[];
  presets: WorkoutPreset[];
  isLoading: boolean;
  addCustomExercise: (exercise: Omit<Exercise, 'id' | 'is_default'>) => Promise<void>;
  updateCustomExercise: (id: string, exercise: Partial<Exercise>) => Promise<void>;
  deleteCustomExercise: (id: string) => Promise<void>;
  saveWorkout: (workout: Omit<Workout, 'user_id' | 'created_at'>) => Promise<void>;
  deleteWorkoutLog: (id: string) => Promise<void>;
  updateWorkoutLog: (id: string, workout: Partial<Workout>) => Promise<void>;
  savePreset: (preset: Omit<WorkoutPreset, 'user_id' | 'created_at'>) => Promise<void>;
  deletePreset: (id: string) => Promise<void>;
  getStreak: () => number;
  getTotalCompleted: () => number;
  getWeeklyProgress: () => { [key: string]: boolean };
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

const DEFAULT_EXERCISES: Exercise[] = [
  { id: 'def-1', name: 'Bench Press', muscle_group: 'Chest', exercise_type: 'Strength', equipment: 'Barbell', is_default: true, youtube_url: 'https://www.youtube.com/watch?v=rT7DgCr-3ps' },
  { id: 'def-2', name: 'Squat', muscle_group: 'Legs', exercise_type: 'Strength', equipment: 'Barbell', is_default: true, youtube_url: 'https://www.youtube.com/watch?v=gcNh17Ckjgg' },
  { id: 'def-3', name: 'Deadlift', muscle_group: 'Back', exercise_type: 'Strength', equipment: 'Barbell', is_default: true, youtube_url: 'https://www.youtube.com/watch?v=op9kVnSso6Q' },
  { id: 'def-4', name: 'Pull Up', muscle_group: 'Back', exercise_type: 'Bodyweight', equipment: 'Pull-up Bar', is_default: true, youtube_url: 'https://www.youtube.com/watch?v=eGo4IYlasUM' },
  { id: 'def-5', name: 'Push Up', muscle_group: 'Chest', exercise_type: 'Bodyweight', equipment: 'Bodyweight', is_default: true, youtube_url: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
];

export const useWorkouts = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutProvider');
  }
  return context;
};

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [customExercises, setCustomExercises] = useState<Exercise[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [presets, setPresets] = useState<WorkoutPreset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load workouts and custom exercises
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      if (!user) {
        setWorkouts([]);
        setCustomExercises([]);
        setPresets([]);
        setIsLoading(false);
        return;
      }

      // Try LocalStorage first as local database / backup
      const localWorkouts = localStorage.getItem(`workouts_${user.id}`);
      const localExercises = localStorage.getItem(`custom_exercises_${user.id}`);
      const localPresets = localStorage.getItem(`presets_${user.id}`);

      if (localWorkouts) {
        try {
          setWorkouts(JSON.parse(localWorkouts));
        } catch (e) {
          console.error('Error parsing local workouts', e);
        }
      }

      if (localExercises) {
        try {
          setCustomExercises(JSON.parse(localExercises));
        } catch (e) {
          console.error('Error parsing local exercises', e);
        }
      }

      if (localPresets) {
        try {
          setPresets(JSON.parse(localPresets));
        } catch (e) {
          console.error('Error parsing local presets', e);
        }
      }

      // Try Firebase Firestore if configured & online
      try {
        // Fetch Exercises
        const exercisesRef = collection(db, 'exercises');
        const qExercises = query(exercisesRef, where('user_id', '==', user.id));
        const exerciseSnap = await getDocs(qExercises);
        const fbExercises: Exercise[] = [];
        exerciseSnap.forEach((doc) => {
          fbExercises.push({ id: doc.id, ...doc.data() } as Exercise);
        });

        if (fbExercises.length > 0) {
          setCustomExercises(fbExercises);
          localStorage.setItem(`custom_exercises_${user.id}`, JSON.stringify(fbExercises));
        }

        // Fetch Workouts
        const workoutsRef = collection(db, 'workouts');
        const qWorkouts = query(workoutsRef, where('user_id', '==', user.id));
        const workoutSnap = await getDocs(qWorkouts);
        const fbWorkouts: Workout[] = [];
        workoutSnap.forEach((doc) => {
          fbWorkouts.push({ id: doc.id, ...doc.data() } as Workout);
        });

        if (fbWorkouts.length > 0) {
          // Sort by workout_date desc
          fbWorkouts.sort((a, b) => new Date(b.workout_date).getTime() - new Date(a.workout_date).getTime());
          setWorkouts(fbWorkouts);
          localStorage.setItem(`workouts_${user.id}`, JSON.stringify(fbWorkouts));
        }

        // Fetch Presets
        const presetsRef = collection(db, 'presets');
        const qPresets = query(presetsRef, where('user_id', '==', user.id));
        const presetSnap = await getDocs(qPresets);
        const fbPresets: WorkoutPreset[] = [];
        presetSnap.forEach((doc) => {
          fbPresets.push({ id: doc.id, ...doc.data() } as WorkoutPreset);
        });

        if (fbPresets.length > 0) {
          fbPresets.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          setPresets(fbPresets);
          localStorage.setItem(`presets_${user.id}`, JSON.stringify(fbPresets));
        }
      } catch (error) {
        console.warn('Firestore failed/offline, using LocalStorage backup:', error);
      }

      setIsLoading(false);
    };

    loadData();
  }, [user]);

  // Save to LocalStorage helper
  const saveToLocal = (workoutsList: Workout[], customExercisesList: Exercise[]) => {
    if (!user) return;
    localStorage.setItem(`workouts_${user.id}`, JSON.stringify(workoutsList));
    localStorage.setItem(`custom_exercises_${user.id}`, JSON.stringify(customExercisesList));
  };

  // 1. Add Custom Exercise
  const addCustomExercise = async (newEx: Omit<Exercise, 'id' | 'is_default'>) => {
    if (!user) return;
    const id = 'cust-' + Date.now();
    const exercise: Exercise = {
      ...newEx,
      id,
      is_default: false,
      created_at: new Date().toISOString(),
    };

    const updated = [...customExercises, exercise];
    setCustomExercises(updated);
    saveToLocal(workouts, updated);

    // Save to Firestore
    try {
      await setDoc(doc(db, 'exercises', id), {
        ...newEx,
        user_id: user.id,
        is_default: false,
        created_at: exercise.created_at,
      });
    } catch (e) {
      console.warn('Firestore offline, saved to localStorage', e);
    }
  };

  // 2. Update Custom Exercise
  const updateCustomExercise = async (id: string, updatedFields: Partial<Exercise>) => {
    if (!user) return;
    const updated = customExercises.map((ex) => (ex.id === id ? { ...ex, ...updatedFields } : ex));
    setCustomExercises(updated);
    saveToLocal(workouts, updated);

    try {
      await updateDoc(doc(db, 'exercises', id), updatedFields);
    } catch (e) {
      console.warn('Firestore offline, saved to localStorage', e);
    }
  };

  // 3. Delete Custom Exercise
  const deleteCustomExercise = async (id: string) => {
    if (!user) return;
    const updated = customExercises.filter((ex) => ex.id !== id);
    setCustomExercises(updated);
    saveToLocal(workouts, updated);

    try {
      await deleteDoc(doc(db, 'exercises', id));
    } catch (e) {
      console.warn('Firestore offline, saved to localStorage', e);
    }
  };

  // 4. Save Workout (Create / Edit)
  const saveWorkout = async (workoutData: Omit<Workout, 'user_id' | 'created_at'>) => {
    if (!user) return;

    // Check if it already exists to overwrite/update, else create new
    const existingIdx = workouts.findIndex((w) => w.id === workoutData.id);
    const createdAt = existingIdx >= 0 ? workouts[existingIdx].created_at : new Date().toISOString();

    const fullWorkout: Workout = {
      ...workoutData,
      user_id: user.id,
      created_at: createdAt,
    };

    let updatedWorkouts = [...workouts];
    if (existingIdx >= 0) {
      updatedWorkouts[existingIdx] = fullWorkout;
    } else {
      updatedWorkouts.push(fullWorkout);
    }

    // Sort descending by date
    updatedWorkouts.sort((a, b) => new Date(b.workout_date).getTime() - new Date(a.workout_date).getTime());

    setWorkouts(updatedWorkouts);
    saveToLocal(updatedWorkouts, customExercises);

    try {
      await setDoc(doc(db, 'workouts', fullWorkout.id), fullWorkout);
    } catch (e) {
      console.warn('Firestore offline, saved to localStorage', e);
    }
  };

  // 5. Delete Workout Log
  const deleteWorkoutLog = async (id: string) => {
    if (!user) return;
    const updated = workouts.filter((w) => w.id !== id);
    setWorkouts(updated);
    saveToLocal(updated, customExercises);

    try {
      await deleteDoc(doc(db, 'workouts', id));
    } catch (e) {
      console.warn('Firestore offline, saved to localStorage', e);
    }
  };

  // 6. Update Workout Log (e.g. mark status completed)
  const updateWorkoutLog = async (id: string, updatedFields: Partial<Workout>) => {
    if (!user) return;
    const updated = workouts.map((w) => (w.id === id ? { ...w, ...updatedFields } : w));
    setWorkouts(updated);
    saveToLocal(updated, customExercises);

    try {
      await updateDoc(doc(db, 'workouts', id), updatedFields);
    } catch (e) {
      console.warn('Firestore offline, saved to localStorage', e);
    }
  };

  // 7. Save Preset
  const savePreset = async (presetData: Omit<WorkoutPreset, 'user_id' | 'created_at'>) => {
    if (!user) return;

    const existingIdx = presets.findIndex((p) => p.id === presetData.id);
    const createdAt = existingIdx >= 0 ? presets[existingIdx].created_at : new Date().toISOString();

    const fullPreset: WorkoutPreset = {
      ...presetData,
      user_id: user.id,
      created_at: createdAt,
    };

    let updatedPresets = [...presets];
    if (existingIdx >= 0) {
      updatedPresets[existingIdx] = fullPreset;
    } else {
      updatedPresets.push(fullPreset);
    }

    setPresets(updatedPresets);
    localStorage.setItem(`presets_${user.id}`, JSON.stringify(updatedPresets));

    try {
      await setDoc(doc(db, 'presets', fullPreset.id), fullPreset);
    } catch (e) {
      console.warn('Firestore offline, saved preset to localStorage', e);
    }
  };

  // 8. Delete Preset
  const deletePreset = async (id: string) => {
    if (!user) return;
    const updated = presets.filter((p) => p.id !== id);
    setPresets(updated);
    localStorage.setItem(`presets_${user.id}`, JSON.stringify(updated));

    try {
      await deleteDoc(doc(db, 'presets', id));
    } catch (e) {
      console.warn('Firestore offline, deleted preset from localStorage', e);
    }
  };

  // Stats calculation: Streak of completed workouts
  const getStreak = () => {
    if (workouts.length === 0) return 0;
    const completedDates = workouts
      .filter((w) => w.status === 'completed')
      .map((w) => w.workout_date);

    if (completedDates.length === 0) return 0;

    // Unique sorted dates descending
    const uniqueDates = Array.from(new Set(completedDates)).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    let streak = 0;
    let expectedDate = new Date(); // Start with today

    // Check if the latest completed workout is today or yesterday
    const latestDate = new Date(uniqueDates[0]);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - latestDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 2) {
      // More than 1 day gap since last workout -> streak is broken/0
      return 0;
    }

    // Set expectedDate to the latest completed workout date
    expectedDate = latestDate;

    for (let i = 0; i < uniqueDates.length; i++) {
      const currentWorkoutDate = new Date(uniqueDates[i]);
      const diff = Math.floor(
        (expectedDate.getTime() - currentWorkoutDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diff === 0) {
        streak++;
        // decrement expectedDate by 1 day
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else if (diff === 1) {
        streak++;
        expectedDate = currentWorkoutDate;
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        break; // Streak broken
      }
    }

    return streak;
  };

  const getTotalCompleted = () => {
    return workouts.filter((w) => w.status === 'completed').length;
  };

  // Returns weekly progress (mon-sun) showing if workouts were done
  const getWeeklyProgress = () => {
    const progress: { [key: string]: boolean } = {};
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const monday = new Date(today);
    // Adjust to Monday
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      const dateStr = day.toISOString().split('T')[0];
      const hasWorkout = workouts.some((w) => w.workout_date === dateStr && w.status === 'completed');
      progress[dateStr] = hasWorkout;
    }

    return progress;
  };

  const allExercises = [...DEFAULT_EXERCISES, ...customExercises];

  return (
    <WorkoutContext.Provider
      value={{
        exercises: allExercises,
        workouts,
        presets,
        isLoading,
        addCustomExercise,
        updateCustomExercise,
        deleteCustomExercise,
        saveWorkout,
        deleteWorkoutLog,
        updateWorkoutLog,
        savePreset,
        deletePreset,
        getStreak,
        getTotalCompleted,
        getWeeklyProgress,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
