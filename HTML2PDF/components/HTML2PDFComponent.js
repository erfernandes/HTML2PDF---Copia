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

    return(
        <React.Fragment>
            <ReactToPrint
                trigger={() => <button id='btnImprimirPDF'>{ appContext.parameters.ButtonName.raw }</button>}
                content={() => componentRef.current}
            />
            <div className='pagebreak full-table'>
              { document.title = appContext.parameters.DefaultFilename.raw }
              <div id="element-to-print" ref={componentRef}>
                  { parse(appContext.parameters.CustomCss.raw + appContext.parameters.HTMLCode.raw) }
              </div>
            </div>
        </React.Fragment>
    );
}

export default App;