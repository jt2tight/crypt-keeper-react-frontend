import React from 'react';
import classes from './Home.module.css';
import CoinList from '../CoinList/CoinList';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const Home = () => {

    return(
        <div className={classes.Home}>
            <Header />
            <div className={classes.Wrapper}>
            <CoinList />
            </div>
            <Footer />
            
        </div>
        )
}

export default Home; 