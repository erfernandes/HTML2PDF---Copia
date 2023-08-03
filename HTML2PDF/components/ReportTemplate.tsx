import * as React from 'react';
import parse from 'html-react-parser';

import '../css/reportTemplateStyles.css';

interface IReportTemplatePropos {
    htmlString?: string;
    innerRef?: any;
}

const ReportTemplate: React.FC<IReportTemplatePropos> = ({ htmlString, innerRef }) => {
    const options = {
        replace: (domNode: any) => {
            if (domNode.attribs && domNode.attribs.class === 'remove') {
                return <></>;
            }
        },
    };

	return (
		// <div className='pagebreak full-table' ref={innerRef}>
        //     { parse(htmlString!) }
        // </div>
        <div className='pagebreak full-table' ref={innerRef}>
            { parse(htmlString!) }
        </div>
        
        //<div dangerouslySetInnerHTML={{ __html: htmlString! }} ref={innerRef} />
	);
};

export default ReportTemplate;