import * as React from 'react';
import { useRef } from 'react';

import {IInputs, IOutputs} from "../generated/ManifestTypes";

import ReportTemplate from './ReportTemplate';

import {useReactToPrint} from 'react-to-print';

interface IHTML2PDFComponentProps {
    appContext: ComponentFramework.Context<IInputs>
} 

const HTML2PDFComponent: React.FC<IHTML2PDFComponentProps> = ({ appContext }) => {
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <div style={{ display: "none" }}>
                <ReportTemplate htmlString={ appContext.parameters.HTMLCode.raw! } innerRef={componentRef} />                
            </div>
            <button onClick={handlePrint}>Imprimir!</button>
        </>
    );
};

export default HTML2PDFComponent;