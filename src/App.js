import React from 'react';
import samplePDF from './sample.pdf';
import { pdfjs } from 'react-pdf';
import CustomNavbar from './custom-navbar/custom-navbar.js';
import CustomPageDisplay from './custom-page-display/custom-page-display';


import 'bootstrap/dist/css/bootstrap.min.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export default function App() {
  return (
    <>
      <CustomNavbar />
      <CustomPageDisplay inputPDF={samplePDF}/>


    </>
  );
}






