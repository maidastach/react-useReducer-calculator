import { useContext } from "react";
import { HandlersContext } from "../App";
import { ACTIONS } from "./utils";

const Number = ({ number }) => {

    const context = useContext(HandlersContext);
    const { dispatch, display, result, displayContainer } = context;

    return (
        <button 
            className={!isNaN(number) ? 'calculator-number' : 'calculator-number-operator'} 
            id={number} 
            onClick=
                {
                    number === '=' 
                    ? () => dispatch(
                            { 
                                type: ACTIONS.EQUAL,
                                payload: 
                                {
                                    number,
                                    display: display.current,
                                    result: result.current,
                                    displayContainer: displayContainer.current
                                }
                            }
                        ) 
                    : number !== '.' 
                        ? () => dispatch(
                                { 
                                    type: ACTIONS.NUMBERS, 
                                    payload: 
                                    {
                                        number,
                                        display: display.current,
                                        result: result.current,
                                        displayContainer: displayContainer.current
                                    }
                                }
                            )
                        : () => dispatch(
                                { 
                                    type: ACTIONS.COMMA, 
                                    payload: 
                                    {
                                        number,
                                        display: display.current,
                                        result: result.current,
                                        displayContainer: displayContainer.current
                                    }
                                }
                            )
                }
            value={number}
        >
            {number}
        </button>
    )
}

export default Number;