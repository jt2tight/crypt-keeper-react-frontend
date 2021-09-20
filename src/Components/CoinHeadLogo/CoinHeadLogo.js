import React from 'react';
import classes from './CoinHeadLogo.module.css'; 

const CoinHeadLogo = (props) => (
    <div className={classes.CoinHeadLogo}>
                            <img src={props.image} alt="" />
                            <div className={classes.CoinTitle}>
                                <div><h1>{props.name}</h1></div>
                                <div><h4>{props.symbol}</h4></div>
                            </div>
                        </div>
)

export default CoinHeadLogo; 