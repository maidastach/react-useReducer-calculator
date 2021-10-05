/* eslint-disable no-useless-escape */
import axios from "axios";

export const ACTIONS = 
    {
        NUMBERS: 'numbers',
        OPERATORS: 'operators',
        COMMA: 'comma',
        EQUAL: 'equal',
        DELETE: 'delete',
    }

//return string from the array with input elements splitted at operator sign
export const joinArray = array => array.join('');

//return array with input elements splitted at operator sign & filter for empty positions
export const splitString = string => string.split(/(?<!e)(\+|\-|\*|\/)/g).filter(x => x); 


//source StackOverFlow.com and adapted to my project
//it reduce and increase font size in regard of lenght
export function resize_to_fit (calculatorDisplay, displayContainer)
    {
        if(calculatorDisplay.clientHeight >= displayContainer.clientHeight)
        {
            let fontSize = window.getComputedStyle(calculatorDisplay).fontSize;
            calculatorDisplay.style.fontSize = (parseFloat(fontSize) - 1) + 'px';
            resize_to_fit(calculatorDisplay, displayContainer);
        }
}

const COLORS = {
    purple: 
        {
            regExp: /import|from|if|switch|else|return|case|export|default/g,
            color: '#ff5bff',
        },
    green: 
        {
            regExp: /\/\/.+/g,
            color: '#139700',
        },
    orange: 
        {
            regExp: /".+"|".?"|'.+'|'.?'/g,
            color: '#c67235',
        },
    grey: 
        {
            regExp: /<[\/]?|[\/]?>/g,
            color: 'gray',
        },
    white: 
        {
            regExp: /[\+\-\*\/\=]+|[,{}\(\)\.&%\[\]\>\<\!\'\|;:]/g,
            color: 'white',
        },
    blue: 
        {
            regExp: /const|let|var|function|=>|section|div/g,
            color: '#3961ff',
        },
    numbers: 
        {
            regExp: /\d+/g,
            color: 'rgb(226, 255, 21)'
        },
    components: 
        {
            regExp: /[<]\/?(([A-Z]\w*\.?)+)/g,
            color: '#50ff00',
        },
    functions: 
        {
            color: "yellow",
        },
    defaultColor:
        {
            color: '#70dcff',
        }
}

const regExp = 
/\/\/.+|(?<=<\/?)[A-Z][a-z]+([A-Z][a-z]+)?(\.[A-Z][a-z]+)?|\d+|[\w]+|(=>)|(<\/?)|(\/?>)|".+"|".?"|'.*?'|[\+\-\*\/\=]+|[&]+|[,{}\(\)\.&%\[\]\>\<\!\'\|;:\?]|[\s]+/g; 
//to split the string in each section we need to color

const arrowRegExp = /(&lt;\/?)|(\/?&gt;)/g;
const replaceArrow = value => {
    switch(value)
    {
        case '&lt;':
            return '<';
        case '&lt;/':
            return '</';
        case '&gt;':
            return '>';
        default:
            return '/>';
    }
}

const setColor = (line, array, idx) => {
    if (line.match(COLORS.green.regExp)) return COLORS.green.color;
    if (line.match(COLORS.orange.regExp)) return COLORS.orange.color 
    if (line.match(COLORS.purple.regExp)) return COLORS.purple.color 
    if (line.match(COLORS.blue.regExp)) return COLORS.blue.color
    if ((array[idx - 1] + line).match(COLORS.components.regExp)) return COLORS.components.color
    if (line.match(COLORS.grey.regExp)) return COLORS.grey.color
    if (line.match(COLORS.white.regExp)) return COLORS.white.color
    if (array[idx+1] === '(') return COLORS.functions.color
    if (line.match(COLORS.numbers.regExp)) return COLORS.numbers.color
    return COLORS.defaultColor.color
}

export const codeParser = string => {
    const updatedString = string.replace(arrowRegExp, value => replaceArrow(value));
    const arrayOfCode = updatedString.match(regExp);

    const result = arrayOfCode.map(
        (line, idx) => 
        <span 
            style=
                {
                    {   color: setColor(line, arrayOfCode, idx)    }
                }
        >
            {line}
        </span>
    )

    return result
}

export const getCodeof = async(file, idx, setContent) => {
    try 
    {
        const response = await axios.get(`/txtComponents/${file}.txt`)
        setContent(prevValue => 
            prevValue.map(
                element => 
                {
                    if(element.name === file)
                        element.text = response.data
                    return element
                }
            )
        )
    }
    catch (error) 
    {
        console.log(error);
        setContent(prevValue => 
            prevValue.map(
                element => 
                {
                    if(element.name === file)
                        element.text = 'Error Loading'
                    return element
                }
            )
        )
    }
}