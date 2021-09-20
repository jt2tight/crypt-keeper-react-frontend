import React from 'react';
import classes from './Header.module.css';
import NavBar from '../NavBar/NavBar'

const Header = () => (
    <div className={classes.Header}>
        <div className={classes.MarketOverview}>
            <div>Marketcap: </div>
            <div>24h Volume: </div>
        </div>
        <NavBar />
    </div>
)

export default Header; 