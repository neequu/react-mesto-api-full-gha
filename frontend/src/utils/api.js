import { baseUrl } from "./constants";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async _request(endpoint, options) {
    const res = await fetch(`${this._baseUrl}${endpoint}`, options);
    return this._checkResponse(res);
  }

  getInitialCards(jwt) {
    return this._request("/cards", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    });
  }

  addCard(data, jwt) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }

    });
  }

  deleteCard(cardId, jwt) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    });
  }

  getUserInfo(jwt) {
    return this._request(`/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    });
  }

  editUserInfo(data, jwt) {
    return this._request(`/users/me`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    });
  }

  editAvatar(data, jwt) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar: data.link }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    });
  }

  changeLikeCardStatus = (id, isLiked, jwt) =>
    isLiked ? this.deleteLike(id, jwt) : this.setLike(id, jwt);

  setLike(cardId, jwt) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    });
  }

  deleteLike(cardId, jwt) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    });
  }
}

// api
const api = new Api({
  baseUrl: baseUrl,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
});

export default api;
