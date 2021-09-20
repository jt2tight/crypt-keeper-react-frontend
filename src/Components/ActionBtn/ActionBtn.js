import React from 'react';
import classes from './ActionBtn.module.css';

const ActionBtn = (props) => (
    <div className={classes.ActionBtn} onClick={props.clicked}>
        {props.children}
    </div>
);

export default ActionBtn; 