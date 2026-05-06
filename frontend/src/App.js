import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import LeadForm from "./pages/LeadForm";

import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import CompanyForm from "./pages/CompanyForm";

import Tasks from "./pages/Tasks";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTE */}
        <Route path="/" element={<Login />} />

        {/* PROTECTED ROUTES */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <Layout>
                <Leads />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-lead"
          element={
            <ProtectedRoute>
              <Layout>
                <LeadForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-lead/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <LeadForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/*  COMPANIES MODULE */}

        {/* Companies List */}
        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <Layout>
                <Companies />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Create Company */}
        <Route
          path="/companies/new"
          element={
            <ProtectedRoute>
              <Layout>
                <CompanyForm />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
  path="/companies/edit/:id"
  element={
    <ProtectedRoute>
      <Layout>
        <CompanyForm />
      </Layout>
    </ProtectedRoute>
  }
/>

        {/* Company Detail */}
        <Route
          path="/companies/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <CompanyDetail />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Tasks */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Layout>
                <Tasks />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;