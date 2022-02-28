import React from 'react';
import samplePDF from './sample.pdf';
import CustomNavbar from './core/custom-navbar';
import { pdfjs } from 'react-pdf';

import CustomPageDisplay from './page-display/custom-page-display';


import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStyle } from './core/GlobalStyle';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export default function App() {
  return (
    <>
      <CustomNavbar />
      <GlobalStyle />
      <CustomPageDisplay inputPDF={samplePDF}/>
      
    </>
  );
}






