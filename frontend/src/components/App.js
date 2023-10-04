import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import ProtectedRoute from './ProtectedRout.js';
import * as auth from '../utils/auth';
import RegisterPopup from './RegisterPopup';
import registerSuccess from '../images/register_success.svg';
import registerFail from '../images/register_fail.svg';


function App() {


  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isCheckRegister, setIsCheckRegister] = React.useState(true);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const popupOpen = 'popup_opened';
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggedEmail, setLoggedEmail] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    handleTokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(()=> {

    if (loggedIn) {

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([dataUserInfo, dataInitialCards]) => {

        setCurrentUser(dataUserInfo);

        setCards(dataInitialCards.reverse());
        }
      )
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })}
    }, [loggedIn])

  const handleTokenCheck = () => {
    if(localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
      .then(data => {
        setLoggedIn(true)
        navigate('/', {replace: true})
        setLoggedEmail(data.email)
      }
      )
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })
    }

  }

  const handleLogin = (userEmail) => {
    setLoggedIn(true);
    setLoggedEmail(userEmail);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsRegisterPopupOpen(false);
  }

  function handleCardLike(card) {

    api.likeCard(card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      })
  }

  function handleCardDeliteLike (card) {

    api.deleteLike(card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      })
  }

  function handleCardDelete (card) {

    api.deleteCard(card._id)
    .then(()=> {
      setCards(cards => cards.filter((c) => c._id !== card._id));
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      })
  }

  function handleUpdateUser (data) {
    api.patchUserInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      })
  }

  function handleUpdateAvatar (link) {
    api.patchUserAvatar(link)
    .then((res)=> {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      })
  }

  function handleAddPlaceSubmit (Card) {
    api.createCard(Card)
    .then((newCard)=> {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      })
  }

  function handleCheckRegister (checkInfo) {
    setIsRegisterPopupOpen(true);
    setIsCheckRegister(checkInfo);
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedEmail={loggedEmail}/>
      <Routes>
        <Route path='/signin' element={<Login handleLogin={handleLogin} onCheckRegister={handleCheckRegister} />}/>
        <Route path='/signup' element={<Register onCheckRegister={handleCheckRegister} />} />
        <Route path='/' element={<ProtectedRoute element={Main} loggedIn={loggedIn} cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDeleteLike={handleCardDeliteLike} onCardDelete={handleCardDelete}/>} />
        <Route path='*' element={<Navigate to='/' replace/>} />
      </Routes>
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen && popupOpen} isClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen && popupOpen} isClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen && popupOpen} isClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      <PopupWithForm title='Вы уверены?' name='delete' buttonText='Да' />
      <ImagePopup  card={selectedCard} onClose={closeAllPopups}/>
      <RegisterPopup imagesRegister={isCheckRegister ? registerSuccess : registerFail} textRegister={isCheckRegister ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'} isOpen={isRegisterPopupOpen && popupOpen} isClose={closeAllPopups}/>
    </CurrentUserContext.Provider>

  );
}

export default App;
