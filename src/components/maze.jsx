import './maze.css';
import React from 'react';
import Grid from './display/grid';

function Maze() {
    return <Grid maxCol={4} maxRow={4} char={'&'} />;
}

export default Maze;
