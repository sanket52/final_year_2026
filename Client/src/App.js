import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Services from "./Components/Services/Services";
import Contact from "./Components/Contact/Contact";
import Pets from "./Components/Pets/Pets";
import AdoptForm from "./Components/AdoptForm/AdoptForm";
import PetCareHub from "./Components/PetCare/PetCareHub";
import VetHospitals from "./Components/PetCare/VetHospitals";
import FirstAid from "./Components/PetCare/FirstAid";
import PetDiet from "./Components/PetCare/PetDiet";
import HospitalPage from "./Components/Hospital/HospitalPage";
import TakeCarePage from "./Components/TakeCare/TakeCarePage";
import AccidentRescue from "./Components/Rescue/AccidentRescue";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import AdminGate from "./Components/Auth/AdminGate";
import LoginPage from "./Components/Auth/LoginPage";
import SignupPage from "./Components/Auth/SignupPage";
import ForgotPasswordPage from "./Components/Auth/ForgotPasswordPage";
import DashboardPage from "./Components/Auth/DashboardPage";
import "./Components/Auth/auth.css";
import "./App.css";
import "./Components/PetCare/pet-care.css";

const Layout = ({ children }) => (
  <>
    <Navbar title="PawFinds" />
    {children}
    <Footer title="PawFinds" />
  </>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Layout>
                <Services />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/pets"
          element={
            <Layout>
              <Pets />
            </Layout>
          }
        />
        <Route
          path="/pet-care"
          element={
            <Layout>
              <PetCareHub />
            </Layout>
          }
        />
        <Route
          path="/pet-care/vet-hospitals"
          element={
            <Layout>
              <VetHospitals />
            </Layout>
          }
        />
        <Route
          path="/pet-care/first-aid"
          element={
            <Layout>
              <FirstAid />
            </Layout>
          }
        />
        <Route
          path="/pet-care/nutrition"
          element={
            <Layout>
              <PetDiet />
            </Layout>
          }
        />
        <Route
          path="/hospital"
          element={
            <Layout>
              <HospitalPage />
            </Layout>
          }
        />
        <Route
          path="/take-care"
          element={
            <Layout>
              <TakeCarePage />
            </Layout>
          }
        />
        <Route
          path="/accident-rescue"
          element={
            <ProtectedRoute>
              <Layout>
                <AccidentRescue />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/adopt-form"
          element={
            <ProtectedRoute>
              <Layout>
                <AdoptForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/admin" element={<AdminGate />} />
      </Routes>
    </Router>
  );
};

export default App;
