import { createRoot } from 'react-dom/client';
import parse from 'html-react-parser';

import React, { useRef } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

import Html2Pdf, { html2pdf } from 'html2pdf.js';

import '../css/AppStyles.css';

const options = {
  replace: (domNode) => {
    if (domNode.attribs && domNode.attribs.class === 'remove') {
      return <></>;
    }
  },
};

function App({ appContext }) {
    const componentRef = useRef();

    const handleDownload = useReactToPrint({
      onPrintError: (error) => console.log(error),
      content: () => componentRef.current,
      removeAfterPrint: true,
      print: async (printIframe) => {
        const document = printIframe.contentDocument;
        if (document) {
          const html = document.getElementById("element-to-print");
          var opt = {
              pagebreak: {
                  mode: ['avoid-all', 'css', 'legacy']
              },
              margin:       [10, 5],
              filename:     'myfile.pdf',
              image:        { type: 'jpeg', quality: 0.95 },
              html2canvas:  { useCORS: true },
              jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
          };
          const exporter = new Html2Pdf(html, opt);
          await exporter.getPdf(true);
        }
      },
    });

    return(
        <React.Fragment>
            <ReactToPrint
                trigger={() => <button>Imprimir !</button>}
                content={() => componentRef.current}
            />
            <button onClick={handleDownload}>Download</button>
            <div className='pagebreak full-table'>
              <div id="element-to-print" ref={componentRef}>
                  { parse(appContext.parameters.HTMLCode.raw) }
              </div>
            </div>
        </React.Fragment>
    );
}

export default App;