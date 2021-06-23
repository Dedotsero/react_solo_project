// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css"

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>
      <div className="login-title">
        <h2>LOG IN</h2>
      </div>
      <div>
        <label id="credential-label">
          Username/Email
        </label>
          <div className="username-login-input-container">
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </div>
      </div>
      <div>
        <label id="password-label">
          Password
        </label>
        <div className="password-login-input-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="login-buttons">
        <button type="submit" id="login-submit">LOG IN</button>
        <button type="button" id="login-cancel">CANCEL</button>
      </div>
    </form>
  );
}

export default LoginForm;
