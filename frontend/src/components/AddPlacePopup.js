import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup (props) {

  const [place, setPlace] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');

  React.useEffect(() => {
      setPlace('');
      setPlaceLink('');
  }, [props.isOpen])


  function handlePlaceChange (e) {
    setPlace(e.target.value);
  }

  function handlePlaceLinkChange (e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();

    props.onAddPlace({
      name: place,
      link: placeLink,
    })
  }

  return (
    <PopupWithForm title='Новое место' name='add' buttonText='Создать' isOpen={props.isOpen} isClose={props.isClose} onSubmit={handleSubmit}>
      <input value={place} onChange={handlePlaceChange} type="text" className="popup__input popup__input_type_mesto-name"  placeholder="Название" name="name" id="input-mesto-name" minLength="2" maxLength="30" required />
      <span className="popup__input-error input-mesto-name-error"></span>
      <input value={placeLink} onChange={handlePlaceLinkChange} type="url" className="popup__input popup__input_type_image"  placeholder="Ссылка на картинку" name="link" id="input-image" required />
      <span className="popup__input-error input-image-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
