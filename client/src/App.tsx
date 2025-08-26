import CitizenDashboard from './pages/CitizenDashboard';
import AdminDashboard from './pages/AdminDashboard';
import WorkerDashboard from './pages/WorkerDashboard';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";

import TestComponent from './components/test.js';
import Home from './pages/Home';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Complaints from './pages/Complaints';
import Certificates from './pages/Certificates';
import GarbageCollection from './pages/GarbageCollection';
import EducationDocs from './pages/EducationDocs';
import Announcements from './pages/Announcements';
import ProfileSettings from './pages/ProfileSettings';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';

const App: React.FC = () => {
  return (
    <Router>
      <React.Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/complaints" element={
            <div className="min-h-screen flex flex-col bg-blue-50">
              <Navbar />
              <div className="flex flex-1 min-h-0">
                <Sidebar />
                <main className="flex-1 flex flex-col min-h-0">
                  <Complaints />
                  <Footer />
                </main>
              </div>
            </div>
          } />
          <Route path="/certificates" element={
            <div className="min-h-screen flex flex-col bg-blue-50">
              <Navbar />
              <div className="flex flex-1 min-h-0">
                <Sidebar />
                <main className="flex-1 flex flex-col min-h-0">
                  <Certificates />
                  <Footer />
                </main>
              </div>
            </div>
          } />
          <Route path="/garbage-collection" element={
            <div className="min-h-screen flex flex-col bg-blue-50">
              <Navbar />
              <div className="flex flex-1 min-h-0">
                <Sidebar />
                <main className="flex-1 flex flex-col min-h-0">
                  <GarbageCollection />
                  <Footer />
                </main>
              </div>
            </div>
          } />
          <Route path="/education-docs" element={
            <div className="min-h-screen flex flex-col bg-blue-50">
              <Navbar />
              <div className="flex flex-1 min-h-0">
                <Sidebar />
                <main className="flex-1 flex flex-col min-h-0">
                  <EducationDocs />
                  <Footer />
                </main>
              </div>
            </div>
          } />
          <Route path="/announcements" element={
            <div className="min-h-screen flex flex-col bg-blue-50">
              <Navbar />
              <div className="flex flex-1 min-h-0">
                <Sidebar />
                <main className="flex-1 flex flex-col min-h-0">
                  <Announcements />
                  <Footer />
                </main>
              </div>
            </div>
          } />
          <Route path="/profile-settings" element={
            <div className="min-h-screen flex flex-col bg-blue-50">
              <Navbar />
              <div className="flex flex-1 min-h-0">
                <Sidebar />
                <main className="flex-1 flex flex-col min-h-0">
                  <ProfileSettings />
                  <Footer />
                </main>
              </div>
            </div>
          } />
        </Routes>
      </React.Suspense>
    </Router>
  );
};

export default App;
