import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/")
    };

    const profileClassName = "profile-dropdown" + (showMenu ? "" : " hidden") + (user ? "" : " no-user-drop border");

    let dropdownDisplay;
    if (user) {
        dropdownDisplay = (
            <>
                <div className="profile-username">Hello, {user.firstName}</div>
                <div className="profile-email">{user.email}</div>
                <div className="profile-button-div">
                    <div className="profile-manage-div">
                        <Link to="/spots/current">
                            <button className="profile-manage-btn" style={{ border: "none" }} onClick={() => setShowMenu(false)}>Manage Spots</button>
                        </Link>
                        <Link to="/bookings/current">
                            <button className="profile-manage-btn" style={{ border: "none" }} onClick={() => setShowMenu(false)}>Manage Bookings</button>
                        </Link>
                    </div>
                    <div className="profile-logout-div">
                        <button className="profile-logout-btn" onClick={logout}>Log Out</button>
                    </div>
                </div>
            </>
        )
    } else {
        dropdownDisplay = (
            <div className="profile-button-no-user">
                <OpenModalButton
                    buttonText="Log In"
                    nameClass="button-drop-no-user"
                    modalComponent={<LoginFormModal />}
                />
                <OpenModalButton
                    buttonText="Sign Up"
                    nameClass="button-drop-no-user"
                    modalComponent={<SignupFormModal />}
                />
            </div>
        )
    }

    return (
        <div className={user ? "profile-button-container" : "profile-button-container-no-user"}>
            <div className="profile-button" onClick={openMenu}>
                <i className="fa-solid fa-bars user-icon" />
                <i className="fa-solid fa-user user-icon" />
            </div>
            <div className={profileClassName} ref={ulRef}>
                {dropdownDisplay}
            </div>
        </div>
    );
}

export default ProfileButton;
