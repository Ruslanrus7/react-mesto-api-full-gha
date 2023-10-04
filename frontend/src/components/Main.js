import pen from '../images/EditButton.svg';
import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main (props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
      <main className="main">
        <section className="profile page__profile">
          <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar}>
            <img src={currentUser.avatar} alt="аватарка" className="profile__avatar" />
          </button>
          <div className="profile__info">
            <div className="profile__info-content">
              <h1 className="profile__info-name">{currentUser.name}</h1>
              <p className="profile__info-text">{currentUser.about}</p>
            </div>
            <button className="profile__info-button" type="button" onClick={props.onEditProfile}>
              <img src={pen} alt="ручка" className="profile__info-img" />
            </button>
          </div>
          <button className="profile__button" type="button" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements page__elements">
          {props.cards.map((dataCard) => {
            return <Card key={dataCard._id} card={dataCard} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDeleteLike={props.onCardDeleteLike} onCardDelete={props.onCardDelete}/>
          })}
        </section>
      </main>
    )
}

export default Main;
