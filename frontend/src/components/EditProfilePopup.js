import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup (props) {

  const currentUser = React.useContext(CurrentUserContext);

  const  [name, setName] = React.useState('');
  const  [description, setDescription] = React.useState('');

  React.useEffect(()=> {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen])


  function handleNameChange (e) {
    setName(e.target.value)
  }

  function handleDescriptionChange (e) {
    setDescription(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title='Редактировать профиль' name='edit' buttonText='Сохранить' isOpen={props.isOpen} isClose={props.isClose} onSubmit={handleSubmit}>
      <input value={name ?? ''} onChange={handleNameChange} type="text" className="popup__input popup__input_type_name" placeholder="Имя" name="nameUser" id="input-name" minLength="2" maxLength="30" required />
      <span className="popup__input-error input-name-error"></span>
      <input value={description ?? ''} onChange={handleDescriptionChange} type="text" className="popup__input popup__input_type_job" placeholder="О себе" name="jobUser" id="input-job" minLength="2" maxLength="30" required />
      <span className="popup__input-error input-job-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
