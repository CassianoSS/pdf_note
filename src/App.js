import React from 'react';
import samplePDF from './sample.pdf';
import CustomNavbar from './core/custom-navbar.js';
import { pdfjs } from 'react-pdf';

import CustomPageDisplay from './core/custom-page-display';


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






