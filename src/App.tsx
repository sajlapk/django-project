import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './pages/Main';
import Home from './pages/Home';
import About from './pages/About';
import DisciplScreens from './pages/DisciplScreens';
import FitnessDirectory from './pages/FitnessDirectory';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import { WorkoutProvider } from './contexts/WorkoutContext';
import ProtectedRoute from './components/ProtectedRoute';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import GymDetails from './pages/GymDetails';
import WorkoutDashboard from './pages/workout/WorkoutDashboard';
import WorkoutLibrary from './pages/workout/WorkoutLibrary';
import WorkoutBuilder from './pages/workout/WorkoutBuilder';
import WorkoutSession from './pages/workout/WorkoutSession';
import WorkoutLogs from './pages/workout/WorkoutLogs';
import WorkoutPresets from './pages/workout/WorkoutPresets';
import WorkoutPresetBuilder from './pages/workout/WorkoutPresetBuilder';
import MentorDashboard from './pages/MentorDashboard';

function AppContent() {
  const location = useLocation();
  const isDisciplScreens = location.pathname === '/discipl-screens';

  return (
    <div className="min-h-screen flex flex-col bg-white pb-20 lg:pb-0">
      {!isDisciplScreens && <Navbar />}
      <main className={`flex-1 ${!isDisciplScreens ? 'lg:pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Home />} />
          <Route path="/discipl-screens" element={<DisciplScreens />} />
          <Route path="/about" element={<About />} />
          <Route path="/fitness-directory" element={<FitnessDirectory />} />
          <Route path="/gym/:id" element={<GymDetails />} />
          <Route path="/gym/:id/:name" element={<GymDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Workout Tracker Routes */}
          <Route path="/workout-tracker" element={
            <ProtectedRoute>
              <WorkoutDashboard />
            </ProtectedRoute>
          } />
          <Route path="/workout-tracker/library" element={
            <ProtectedRoute>
              <WorkoutLibrary />
            </ProtectedRoute>
          } />
          <Route path="/workout-tracker/new" element={
            <ProtectedRoute>
              <WorkoutBuilder />
            </ProtectedRoute>
          } />
          <Route path="/workout-tracker/session" element={
            <ProtectedRoute>
              <WorkoutSession />
            </ProtectedRoute>
          } />
          <Route path="/workout-tracker/logs" element={
            <ProtectedRoute>
              <WorkoutLogs />
            </ProtectedRoute>
          } />
          <Route path="/workout-tracker/presets" element={
            <ProtectedRoute>
              <WorkoutPresets />
            </ProtectedRoute>
          } />
          <Route path="/workout-tracker/presets/new" element={
            <ProtectedRoute>
              <WorkoutPresetBuilder />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/mentor-dashboard" element={
            <ProtectedRoute>
              <MentorDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      {!isDisciplScreens && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <Router>
          <AppContent />
        </Router>
      </WorkoutProvider>
    </AuthProvider>
  );
}

export default App;