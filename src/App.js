/* eslint-disable no-eval */
import React, { useEffect, useReducer, useRef, useState } from "react";
import Display from "./components/Display";
import Keyboard from "./components/Keyboard";
import PreviewCode from "./components/PreviewCode";
import { ACTIONS, getCodeof, resize_to_fit, splitString } from "./components/utils";

export const HandlersContext = React.createContext();

function reducer(current, action) {
    const { display, result, number, operator } = action.payload;
    switch(action.type)
    {
        case ACTIONS.NUMBERS:
           if(current.length % 2 === 1 && current[current.length - 1] === '0') //replace zero if not needed
            {
                let toReplace = display.innerText.lastIndexOf(display.innerText[display.innerText.length - 1])
                return splitString(display.innerText.substr(0, toReplace) + number)
            }
            else 
                return splitString(display.innerText + number)

        case ACTIONS.OPERATORS:
            if(current.length === 0) // display vuoto
            { 
                if(operator === '-') // you can insert minus value at blank display for negativer addition
                    return splitString(display.innerText + operator);
            }
            else if(!isNaN(current[current.length - 1])) //if previous value is a number, it just print the operator
                return splitString(display.innerText + operator);    
            else if(isNaN(current[current.length - 1]) && current.length > 1) //if previous value is another operator, it replace it with the clicked one
            { 
                let toReplace = display.innerText.lastIndexOf(display.innerText[display.innerText.length - 1])
                return splitString(display.innerText.substr(0, toReplace) + operator);
            }
            result.innerText = ''; //empty the preview result screen
            return current;
        case ACTIONS.COMMA:
            if (display.innerText.length > 0) // does't add dot if empty display
            { 
                if(!current[current.length - 1].includes(number) && !isNaN(current[current.length - 1]))
                    return splitString(display.innerText + number) //add a dot just if there is none already in the same value
            };
            return current;
        case ACTIONS.EQUAL:
            if((current.length > 2 && current.length % 2 === 1) || (current.length > 2 && current.length % 2 === 0 && current[0] === '-')) //evaluate the expression if it is not incomplete
            { 
                display.innerText = eval(current.join('')) //bring result to top-half
                result.innerText = ''; //empty the preview display
                return splitString(display.innerText)
            };
            return current;
        case ACTIONS.DELETE:
            if(display.innerText.length > 0) //nothing happen on empty display
                return splitString(display.innerText.slice(0, -1)); //update state 
            return current;
        default:
            return current;
    }
}

const App = () => {
    const displayContainer = useRef();
    const display = useRef();
    const result = useRef();
    const [current, dispatch] = useReducer(reducer, []);
    const [content, setContent] = useState(
        [
            { name: 'App', text: 'Loading...' }, 
            { name: 'Display', text: 'Loading...' },
            { name: 'Keyboard', text: 'Loading...' },
            { name: 'Row', text: 'Loading...' },
            { name: 'Number', text: 'Loading...' },
            { name: 'Operator', text: 'Loading...' },
            { name: 'utils', text: 'Loading...' },
        ]
    )
    
    useEffect(
        () => {
            display.current.style.fontSize = `${40}px`;
            resize_to_fit(display.current, displayContainer.current)
        },
        [current]
    )

    useEffect(
        () => 
            {
                getCodeof('App', 0, setContent)
            },
            []
    )
    
    return (
        <section className="calculator-screen d-flex align-items-center flex-wrap justify-content-around">
            <div className="calculator-body my-5 my-xl-0 col-md-5">
                <HandlersContext.Provider value={ { dispatch, displayContainer, display, result, current } }>
                    <Display />
                    <Keyboard />
                </HandlersContext.Provider>
            </div>

           { <PreviewCode content={content} setContent={setContent} />}
        </section>
    )
}

export default App;