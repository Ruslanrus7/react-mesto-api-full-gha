class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _getResponseData (res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(this._getResponseData)
  }

  // добавление новой карточки
  createCard (card) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(card),
    })
    .then(this._getResponseData)
  }

  // загрузка информации о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(this._getResponseData)
  }

  // редактирование профиля
  patchUserInfo(info) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info),
      method: 'PATCH',
    })
    .then(this._getResponseData)
  }


  // обновление аватара
  patchUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(link),
      method: 'PATCH',
    })
    .then(this._getResponseData)
  }

  // удаление карточки
  deleteCard (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      method: 'DELETE',
    })
    .then(this._getResponseData)
  }

  // поставить лайк карточки
  likeCard (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
    })
    .then(this._getResponseData)
  }

  // убрать лайк карточки
  deleteLike (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers:  {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      method: 'DELETE',
    })
    .then(this._getResponseData)
  }
}

const api = new Api({
  baseUrl: 'https://api.mestoworld.nomoredomainsrocks.ru',
});

export default api;
