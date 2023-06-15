import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import pearHouse from './images/pear-logo.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='nav-button-div'>
                <div className='nav-button__spot'>
                    <NavLink to="/spots/new">
                        <button className='nav-button__spot__btn'>
                            PearBnb your home
                        </button>
                    </NavLink>
                </div>
                <div className='profile-container'>
                    <ProfileButton user={sessionUser} />
                </div>
            </div>
        );
    } else {
        sessionLinks = (
            <div>
                <OpenModalButton
                    buttonText="Log In"
                    modalComponent={<LoginFormModal />}
                />
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                />
            </div>
        );
    }

    return (
        <nav className='nav__container'>
            <div className='nav__bar'>
            <NavLink exact to="/" style={{ textDecoration: 'none' }}>
                <div className='nav__logo'>
                    <img className="nav__logo__img" src={pearHouse} alt="pearImage" />
                    <span className="nav__logo__text">Pearbnb</span>
                </div>
            </NavLink>
            <div className='nav__buttons'>
                {isLoaded && sessionLinks}
            </div>
        </div>
        </nav>
    );
}

export default Navigation;
