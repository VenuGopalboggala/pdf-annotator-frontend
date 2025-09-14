import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [pdfs, setPdfs] = useState([]);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // --- Styles ---
  const styles = {
    container: { maxWidth: '900px', margin: '40px auto', padding: '30px', fontFamily: 'Arial, sans-serif', color: '#333', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '20px' },
    title: { fontSize: '2em', color: '#1a1a1a' },
    logoutButton: { padding: '10px 20px', fontSize: '1em', color: '#fff', backgroundColor: '#d9534f', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    uploadSection: { padding: '20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '30px' },
    pdfList: { listStyle: 'none', padding: '0' },
    pdfListItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '10px' },
    deleteButton: { backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '3px', cursor: 'pointer' },
  };

  // --- Logic ---
  const fetchPdfs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/pdfs`, {
        headers: { 'x-auth-token': token },
      });
      setPdfs(response.data);
    } catch (err) {
      console.error('Error fetching PDFs', err);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post(`${backendUrl}/api/pdfs/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': token },
      });
      setMessage(res.data.msg);
      fetchPdfs();
      document.getElementById('fileInput').value = null;
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Upload failed');
    }
  };

  const handleDelete = async (uuid) => {
    if (window.confirm('Are you sure you want to delete this PDF?')) {
      try {
        await axios.delete(`${backendUrl}/api/pdfs/${uuid}`, {
          headers: { 'x-auth-token': token },
        });
        fetchPdfs();
      } catch (err) {
        setMessage('Failed to delete PDF.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/';
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>My Library</h1>
        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </header>
      
      <section style={styles.uploadSection}>
        <form onSubmit={handleUpload}>
          <input id="fileInput" type="file" accept="application/pdf" onChange={handleFileChange} />
          <button type="submit" disabled={!file}>Upload PDF</button>
          {message && <p>{message}</p>}
        </form>
      </section>

      <ul style={styles.pdfList}>
        {pdfs.map((pdf) => (
          <li key={pdf.uuid} style={styles.pdfListItem}>
            <a href={`/pdf/${pdf.uuid}`} target="_blank" rel="noopener noreferrer">{pdf.originalName}</a>
            <button onClick={() => handleDelete(pdf.uuid)} style={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;