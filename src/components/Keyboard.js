import Row from "./Row";
import Operator from "./Operator";
const Keyboard = () => {

    return (
        <div className='calculator-bottom'>
            <div className="calculator-numbers">
                <Row rowN='1' numbers={['1', '2', '3']} />
                <Row rowN='2' numbers={['4', '5', '6']}/>
                <Row rowN='3' numbers={['7', '8', '9']}/>
                <Row rowN='4' numbers={['.', '0', '=']}/>
            </div>
            <div className="calculator-operators">
                <Operator operator='+' />
                <Operator operator='-' />
                <Operator operator='*' />
                <Operator operator='/' />
                <Operator operator='C' />
            </div>
        </div>
    )
}

export default Keyboard;