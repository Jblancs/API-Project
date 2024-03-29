import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [disableBtn, setDisableBtn] = useState(false)

    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className="sign-container">
            <div className="sign-div">
                <h1 className="sign-text">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <ul className="sign-error-list">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label>
                        Email
                        <input
                            className="sign-input"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Username
                        <input
                            className="sign-input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        First Name
                        <input
                            className="sign-input"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Last Name
                        <input
                            className="sign-input"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            className="sign-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Confirm Password
                        <input
                            className="sign-input"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    <div className="sign-btn-div">
                        <button type="submit" className="sign-btn" disabled={disableBtn}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupFormModal;
