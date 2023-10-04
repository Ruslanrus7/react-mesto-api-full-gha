import React from 'react';

function PopupWithForm (props) {

  return (
    <div className={`popup popup_form_${props.name} ${props.isOpen}`}>
      <div className="popup__container">
        <button className="popup__close popup__close_form_edit" type="button" onClick={props.isClose}></button>
        <h2 className="popup__text-edit">{props.title}</h2>
        <form action="#" className={`popup__form popup__form_type_${props.name}`} name={`${props.name}-form`} onSubmit={props.onSubmit}>
          {props.children}
          <button className={`popup__form-btn popup__form-btn_type_${props.name}`} type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
