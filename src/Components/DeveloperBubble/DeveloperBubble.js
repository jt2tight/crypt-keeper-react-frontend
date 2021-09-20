import React from 'react';
import classes from './DeveloperBubble.module.css';

const DeveloperBubble = (props) => (
    <div className={classes.DeveloperBubble}>
        {props.children}
    </div>
);

export default DeveloperBubble; 