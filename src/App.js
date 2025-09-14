import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import PdfViewer from './components/PdfViewer';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="App" style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={!token ? <Auth /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/pdf/:pdfUuid" element={token ? <PdfViewer /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;