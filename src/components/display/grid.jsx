import './grid.css';
import React from 'react';
import Column from './column';

const Grid = ({ maxCol, maxRow, char }) => {
    let columns = [];

    for (let i = 0; i < maxCol; i++) {
        columns.push(<Column maxRow={maxRow} char={char} colId={i} key={i} />);
    }

    return <div className="grid">{columns}</div>;
};

export default Grid;
