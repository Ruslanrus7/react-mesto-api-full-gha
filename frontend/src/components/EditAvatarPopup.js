import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup (props) {

  const inputAvatarRef = React.useRef();

  React.useEffect(() => {
    inputAvatarRef.current.value = '';
  }, [props.isOpen])

  function handleSubmit (e) {

    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    })
  }

  return (
    <PopupWithForm title='Обновить аватар' name='avatar' buttonText='Сохранить' isOpen={props.isOpen} isClose={props.isClose} onSubmit={handleSubmit}>
      <input type="url" ref={inputAvatarRef} className="popup__input popup__input_type_avatar"  placeholder="Ссылка на картинку" name="avatar" id="input-avatar" required />
      <span className="popup__input-error input-avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
