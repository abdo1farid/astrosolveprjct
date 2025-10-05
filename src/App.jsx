/**
 * Copyright 2025 BioTechPark
 * License Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react';

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Solutions from "./components/Solutions";
import Footer from "./components/Footer";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import ForgotPassword from './components/Auth/ForgotPassword';
import NotFound from './components/NotFound';
import Profile from "./components/Auth/Profile";
import UploadPage from "./components/UploadPage";
import LevelsPage from './components/LevelsPage';
import SolarSystemGate from './components/SolarSystemGate';
import TelescopeChallenge from './components/TelescopeChallenge';

// Protected Route Component
const MainContent = () => (
  <>
    <Hero />
    <About />
    <Features />
    <Solutions />
  </>
);

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <MainContent />
              <Footer />
            </>
          } />
          <Route path="/login" element={
            <>
              <Header />
              <Login />
              <Footer />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Header />
              <SignUp />
              <Footer />
            </>
          } />
          <Route path="/forgot-password" element={
            <>
              <Header />
              <ForgotPassword />
              <Footer />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Header />
              <Profile />
              <Footer />
            </>
          } />
          <Route path="/upload" element={
            <>
              <Header />
              <UploadPage />
              <Footer />
            </>
          } />
          <Route path="/levels" element={<LevelsPage />} />
          <Route path="/solar-system-gate" element={<SolarSystemGate />} />
          <Route path="/telescope-challenge" element={<TelescopeChallenge />} />
          <Route path="*" element={
            <>
              <Header />
              <NotFound />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}
export default App;