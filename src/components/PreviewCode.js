import { useEffect, useRef, useState } from 'react';
import { codeParser, getCodeof } from './utils';


const PreviewCode = ( { content, setContent } ) => {
    const tabs = useRef();
    const [selected, setSelected] = useState(null);

    useEffect(
        () =>
            {
                tabs.current.firstChild.classList.add('selected');
                setSelected(() => tabs.current.firstChild)
            },
            []
    )

    const handleClick = e => {
        selected.classList.remove('selected')
        e.target.classList.add('selected');
        console.log(e.target);
        getCodeof(e.target.textContent, e.target.id, setContent)
        setSelected(() => e.target)
    };
    
    return (
        <div className='preview-code col-11 col-lg-7' style={{height: '500px', position: 'relative', zIndex: '20'}}>
            <div ref={tabs} className="tabs">
                {
                    content.map(
                        (element, idx) => 
                            <div 
                                id={idx}
                                key={element.name} 
                                onClick={handleClick} 
                                className={`tab ${idx === 0 && 'selected'}`}
                                style=
                                    {
                                        {   width: `${100/content.length}%` }
                                    } 
                            >
                                {element.name}
                            </div>
                    )
                }
            </div>
            <pre className="code">
                {selected && content[selected.id].text !== undefined && codeParser(content[selected.id].text)}
            </pre>
        </div>
    )
}

export default PreviewCode
