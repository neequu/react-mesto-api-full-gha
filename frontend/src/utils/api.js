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

  getInitialCards() {
    return this._request("/cards", {
      headers: this._headers,
    });
  }

  addCard(data) {
    return this._request("/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(`/users/me`, {
      credentials: 'include',
      headers: this._headers,
    });
  }

  editUserInfo(data) {
    return this._request(`/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  editAvatar(data) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: data.link }),
    });
  }

  changeLikeCardStatus = (id, isLiked) =>
    isLiked ? this.deleteLike(id) : this.setLike(id);

  setLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

// api
const api = new Api({
  baseUrl: baseUrl,
  headers: {
    authorization: "d9a56d97-fcff-4775-997d-668b8fda98e2",
    "Content-Type": "application/json",
  },
});

export default api;
