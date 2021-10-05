import Number from './Number';

const Row = ({ rowN, numbers }) => {
    return (
        <div className={`calculator-row calculator-row-${rowN}`}>
            <Number number={numbers[0]} />
            <Number number={numbers[1]} />
            <Number number={numbers[2]} />
        </div>
    )
}

export default Row;