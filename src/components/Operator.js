import { useContext } from "react";
import { HandlersContext } from "../App";
import { ACTIONS } from "./utils";

const Operator = ({ operator }) => {

    const context = useContext(HandlersContext);
    const { dispatch, display, result } = context;

    return (
        <button 
            className='calculator-operator'
            id={operator} 
            value={operator} 
            onClick=
                {
                    operator === 'C' 
                    ? () => dispatch(
                            { 
                                type: ACTIONS.DELETE,
                                payload: 
                                {
                                    display: display.current,
                                    result: result.current,
                                }
                             }
                        ) 
                    : () => dispatch(
                            { 
                                type: ACTIONS.OPERATORS, 
                                payload: 
                                {
                                    operator,
                                    display: display.current,
                                    result: result.current,
                                }
                            }
                        )
                }
        >
            {operator}
        </button>
    )
}

export default Operator;