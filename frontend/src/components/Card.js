import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';


function Card (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i =>  i === currentUser._id);
  const cardLikeButtonClassName = (
    `elements__card-btn ${isLiked && 'elements__card-btn_active'}`
  );


  function handleClick () {
    props.onCardClick(props.card)
  }

  function handleLikeClick () {
    props.onCardLike(props.card)
  }

  function handleDeleteLikeClick () {
    props.onCardDeleteLike(props.card)
  }

  function handleDeleteClick () {
    props.onCardDelete(props.card)
  }

  return (
    <div className="elements__card">
      <img className="elements__card-image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="elements__card-info">
        <h2 className="elements__card-text">{props.card.name}</h2>
        <button className={cardLikeButtonClassName} onClick={isLiked ? handleDeleteLikeClick : handleLikeClick} type="button"></button>
        <span className="elements__card-like-number">{props.card.likes.length}</span>
      </div>
        {isOwn && <button className="elements__card-basket" type="button" onClick={handleDeleteClick}></button>}
    </div>
  )
}

export default Card;
