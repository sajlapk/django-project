# Gym Workout Tracker App - Feature Audit Report

This report analyzes the existing project codebase and details the implementation plan for the Gym Workout Tracker application in the frontend.

## 1. Feature Audit & Status

| Feature Area | Current Status | Description / Notes |
| :--- | :--- | :--- |
| **Authentication** | Existing (Partially Integrated) | Firebase Auth is configured in the frontend with `login`, `register`, and `logout` flows. But we need to verify routing for workout pages. |
| **Home Dashboard** | Missing | No Home Dashboard exists for workout stats (streaks, total workouts, calendar view, today's workout completion toggle). |
| **Workout Library** | Missing | No library view for Default Exercises (Bench Press, Squat, etc.) or Custom Exercises ("My Exercises" created by the user). |
| **Create Custom Exercise** | Missing | No UI to add, edit, or delete custom exercises. |
| **Create / Build Workout** | Missing | No builder interface to select a date, input title, add exercises, and configure sets/reps/weight. |
| **Workout Session / Execution** | Missing | No workout execution screen (tracking duration, adding sets, ticking off reps/weight, finishing workout). |
| **Workout Log / History** | Missing | No UI to view, edit, or delete completed workouts. |
| **Calendar & Rest Day Logic** | Missing | No custom calendar showing Green Checks (completed), Red (missed), Gray (rest day), and allowing backdated entries. |

---

## 2. Technical Implementation Plan

We will implement the Gym Workout Tracker entirely in the React frontend (`discipl-web-frontend-live`), using **Firebase Firestore** as the database with a robust **local storage fallback** if Firebase isn't initialized or credentials fail. This ensures a fully functional app out-of-the-box.

### 2.1 Firestore / LocalStorage Database Schema
1. **`users`**:
   - `id`, `name`, `email`, `created_at`
2. **`exercises`**:
   - `id`, `user_id` (null if default), `name`, `muscle_group`, `exercise_type`, `youtube_url`, `notes`, `equipment`, `is_default`, `created_at`
3. **`workouts`**:
   - `id`, `user_id`, `title`, `workout_date` (YYYY-MM-DD), `duration` (mins), `status` ('completed' | 'active'), `created_at`
4. **`workout_exercises`**:
   - Map stored inside the workout log or as subcollections, keeping track of `exercise_id`, `sets` (array of `{ reps, weight, completed }`).

---

## 3. UI Design & Navigation Integration
We will add a dedicated navigation link / dashboard area in the React app:
1. **`/workout-tracker`**: The main hub containing the Dashboard, Streaks, Calendar, and Workout Logs.
2. **`/workout-tracker/library`**: Browse default/custom exercises, create custom exercises.
3. **`/workout-tracker/new`**: Create a workout (select date, title, add exercises).
4. **`/workout-tracker/session`**: Active session with timer, sets, reps, weight inputs, and "Finish Workout" button.
5. **`/workout-tracker/logs`**: History list with view/edit/delete options.
