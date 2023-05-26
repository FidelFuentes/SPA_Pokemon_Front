import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>PokéApp</h1> 
      <Link className={Styles.myButton} to="/home">Log in</Link>
      <h3 className={Styles.h3}>Discover and create your own pokemon</h3>
      <img className={`${Styles.img} ${Styles.movedImg}`} src="https://i.pinimg.com/originals/1f/0b/85/1f0b85bb750807778b1fe2444527fbd2.gif" alt="" />

    </div>
  );
}

export default LandingPage;



