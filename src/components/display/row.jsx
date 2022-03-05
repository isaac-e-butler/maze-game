import React from 'react';

const Row = ({ maxCol, char, rowId }) => {
    let columns = [];

    for (let i = 0; i < maxCol; i++) {
        columns.push(
            <li id={i} key={i}>
                <p>{char}</p>
            </li>
        );
    }

    return <ul id={rowId}>{columns}</ul>;
};

export default Row;
