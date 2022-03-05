import React from 'react';

const Column = ({ maxRow, char, colId }) => {
    let rows = [];

    for (let i = 0; i < maxRow; i++) {
        rows.push(
            <li id={i} key={i}>
                <p>{char}</p>
            </li>
        );
    }

    return <ul id={colId}>{rows}</ul>;
};

export default Column;
