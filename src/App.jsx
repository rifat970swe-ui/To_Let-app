import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Listing from './pages/Listing'
import CreateListing from './pages/CreateListing'
import Login from './pages/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateListing />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div className="bg-white rounded shadow p-6">Page not found.</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
