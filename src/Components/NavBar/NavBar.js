import React from 'react';
import classes from './NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
   

    return(
    <div className={classes.NavBar}>
        <div><h2><Link to="/">CRYPT KEEPER</Link></h2></div>
        <div>Cryptocurrencies</div>
        <div>Portfolio</div>
        <div>Watchlist</div>
        <div>Browser Extension</div>
        <div className={classes.UserProfile}>
            <div className={classes.Login}>Login</div>
            <div className={classes.Signup}>Signup</div>
        </div>
        
    </div>
    )
}

export default NavBar; 