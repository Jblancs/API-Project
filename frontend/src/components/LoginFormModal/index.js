import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .then(history.push("/"))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            )
    };

    const clickHandler = () => {
        setCredential("Demo-lition")
        setPassword("password")
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .then(history.push("/"))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            )
    }

    return (
        <div className="login-container">
            <div className="login-div">
                <h1 className="login-text">Log In</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <ul className="login-error-list">
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <label>
                        Username or Email
                        <input
                            className="log-input"
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            className="log-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <div className="login-btn-div">
                        <button type="submit" className="login-btn">Log In</button>
                    </div>
                    <div className="demo-user-div">
                        <button onClick={clickHandler} className="demo-btn">Demo User</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginFormModal;
