import React, { useState, useEffect } from 'react';
import LoginButton from '../components/LoginButton';

export default function Login() {
  const [email, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'email') {
      setUserEmail(value);
    } else {
      setUserPassword(value);
    }
  };
  const validation = () => {
    const six = 6;
    const emailRegex = /\S+@\S+\.\S+/i;
    if (userPassword.length < six || !emailRegex.test(email)) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };
  useEffect(validation);
  return (
    <div>
      <input
        data-testid="email-input"
        name="email"
        onChange={ handleChange }
        placeholder="Email"
        type="email"
        value={ email }
      />
      <input
        data-testid="password-input"
        name="password"
        onChange={ handleChange }
        placeholder="Senha"
        type="password"
        value={ userPassword }
      />
      <LoginButton email={ email } buttonDisabled={ buttonDisabled } />
    </div>);
}
