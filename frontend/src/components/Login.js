import React from 'react';
import AuthForm from './AuthForm';
import * as auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function Login ({handleLogin, onCheckRegister}) {


  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.email, formValue.password)
      .then(data => {
        if (data.token) {
          handleLogin(formValue.email);
          setFormValue({email: '', password: ''})
          navigate('/', {replace: true});
        }
      })
      .catch(err => {
        onCheckRegister(false)
        console.log(err)});
  }


  return (
    <AuthForm title='Вход' name='login' onSubmit={handleSubmit}>
      <input value={formValue.email} onChange={handleChange} type="email" className="auth__input auth__input_type_name" placeholder="Email" name="email" id="email" minLength="2" maxLength="60" required />
      <span className="auth__input-error input-nameuser-error"></span>
      <input value={formValue.password} onChange={handleChange} type="password" className="auth__input auth__input_type_password" placeholder="Пароль" name="password" id="password" minLength="2" maxLength="30" required />
      <span className="auth__input-error input-password-error"></span>
      <button className='auth__form-btn auth__form-btn_type_login' type="submit">Войти</button>
    </AuthForm>
  )
}

export default Login;
