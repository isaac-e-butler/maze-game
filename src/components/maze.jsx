import './maze.css';
import React from 'react';
import Grid from './display/grid';

function Maze() {
    return <Grid maxCol={30} maxRow={20} char={'@'} />;
}

export default Maze;
