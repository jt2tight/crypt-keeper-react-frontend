import React from 'react';
import classes from './Footer.module.css';

const Footer = () => (
    <div className={classes.Footer}>
        <div className={classes.InnerFooter}>
            <div className={classes.LogoBox}>
            <h1>CRYPT KEEPER</h1>

            </div>
            <div className={classes.Details}>
                <div className={classes.DetailsList}>
                <ul>
                    <li>About Us</li>
                    <li>Support</li>
                    <li>Terms of Use</li>
                    <li>Privacy Policy</li>
                    <li>Disclaimer</li>
                </ul>

                </div>
                <div className={classes.DetailsList}>
                <ul>
                    <li>Facebook</li>
                    <li>Twitter</li>
                    <li>Instagram</li>
                    <li>Telegram</li>
                    <li>Discord</li>
                </ul>
                </div>
            </div>


        </div>
        

    </div>
)

export default Footer; 