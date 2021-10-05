/* eslint-disable no-eval */
import { useContext } from "react";
import { HandlersContext } from "../App";
import { joinArray } from "./utils";

const Display = () => {
    const context = useContext(HandlersContext);
    const { current, displayContainer, display, result } = context;

    return (
        <div className='calculator-top'>
            <div ref={displayContainer} className="display-container">
                <div 
                    ref={display}
                    className="calculator-display"
                >
                    {joinArray(current)}
                </div>
            </div>
            
            <div 
                ref={result}
                className="calculator-result" 
            >
                {(current.length < 3) ? '' : ((current.length > 2) && (!isNaN(current[current.length - 1]))) ? (eval(joinArray(current))) : ''}
            </div>
        </div>
    )
}

export default Display;