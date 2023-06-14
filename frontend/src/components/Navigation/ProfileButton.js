import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
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

    const profileClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div>
            <button className="profile-button" onClick={openMenu}>
                <i className="fa-solid fa-user" />
            </button>
            <div className={profileClassName} ref={ulRef}>
                <div className="profile-username">Hello, {user.firstName}</div>
                <div className="profile-email">{user.email}</div>
                <div className="profile-button-div">
                    <div className="profile-manage-div">
                        <Link to="/spots/current">
                            <button className="profile-manage-btn" style={{ border: "none" }}>Manage Spots</button>
                        </Link>
                    </div>
                    <div className="profile-logout-div">
                        <button className="profile-logout-btn" onClick={logout}>Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileButton;
