import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

const PdfViewer = () => {
    const { pdfUuid } = useParams();
    const [pdfUrl, setPdfUrl] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const loadPdf = async () => {
            if (!token) {
                setError('Authentication token not found.');
                return;
            }
            try {
                const res = await axios.get(`${backendUrl}/api/pdfs`, {
                    headers: { 'x-auth-token': token },
                });
                const currentPdf = res.data.find(p => p.uuid === pdfUuid);
                if (currentPdf) {
                    setPdfUrl(`${backendUrl}/uploads/${currentPdf.storageName}`);
                } else {
                    setError('PDF not found.');
                }
            } catch (err) {
                setError('Failed to fetch PDF data.');
            }
        };
        loadPdf();
    }, [pdfUuid, token, backendUrl]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    if (!pdfUrl) {
        return <div>Loading PDF...</div>;
    }

    return (
        <div>
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages || 0), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
            </Document>
        </div>
    );
};

export default PdfViewer;