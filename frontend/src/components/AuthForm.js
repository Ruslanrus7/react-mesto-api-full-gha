import React from 'react';

function AuthForm (props) {

  return (
    <section className='auth page__auth'>
      <h1 className='auth__title'>{props.title}</h1>
      <form className='auth__form' action='#' name={`${props.name}-form`} onSubmit={props.onSubmit}>
        {props.children}
      </form>
    </section>
  )
}

export default AuthForm;
