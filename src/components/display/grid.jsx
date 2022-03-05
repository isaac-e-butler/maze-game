import React from 'react';
import Row from './row';

const Grid = ({ maxRow, maxCol, char }) => {
    let rows = [];

    for (let i = 0; i < maxRow; i++) {
        rows.push(<Row maxCol={maxCol} char={char} rowId={i} key={i} />);
    }

    return <div className="grid">{rows}</div>;
};

export default Grid;
