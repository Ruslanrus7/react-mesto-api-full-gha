import React from 'react';

function ImagePopup ({card, onClose}) {
  return (
    <div className={`popup popup-image ${card ? `popup_opened` : ""}`}>
      <div className="popup-image__box">
        <button className="popup__close popup-image__close" type="button" onClick={onClose}></button>
        <img className="popup-image__element" src={card ? card.link : '#'} alt={card ? card.name : '#'} />
        <p className="popup-image__text">{card ? card.name : ''}</p>
      </div>
    </div>
  )
}


export default ImagePopup;
