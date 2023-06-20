class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, this._headers).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, this._headers).then(this._checkResponse);
  }

  editProfile(newName, newStatus) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers.headers,
      body: JSON.stringify({
        name: newName,
        about: newStatus
      })
    }).then(this._checkResponse);
  }

  addNewCard(newLocation, newLink) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers.headers,
      body: JSON.stringify({
        name: newLocation,
        link: newLink
      })
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers.headers,
    }).then(this._checkResponse);
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers.headers,
    }).then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers.headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, flag) {
    if (flag) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers.headers,
      }).then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers.headers,
      }).then(this._checkResponse);

    }
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers.headers,
      body: JSON.stringify({
        avatar: link
      })
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'http://api.stoliarovea.nomoredomains.rocks',
  headers: {
    headers: {
      authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkxOTBjMTY1ZTZiMjczMDQ4MGU4ZjIiLCJpYXQiOjE2ODcyNjM3NjMsImV4cCI6MTY4Nzg2ODU2M30.oQ-iyGdB4AZ2cUGrO-o757TNtYcwu3IVPSsVoIyGOaM',
      'Content-Type': 'application/json',
//      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
  }
})

export default api;
