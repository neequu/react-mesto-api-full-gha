const baseUrl = 'https://api.neequu.nomoreparties.co';

const checkResponse = async (res) => {
  try {
    const r = await res.json();
    if (!res.ok) throw new Error(r.message);
    return r;
  } catch (error) {
    console.log(error);
    return Promise.reject(`${error}`);
  }
};

const reqest = async (url, options) => {
  const res = await fetch(url, options);
  return checkResponse(res);
};

const register = async (data) => {
  const url = `${baseUrl}/signup`;
  const headers = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return reqest(url, headers);
};

const signin = async (data) => {
  const url = `${baseUrl}/signin`;
  const headers = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return reqest(url, headers);
};

const validate = async (token) => {
  const url = `${baseUrl}/users/me`;
  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return reqest(url, headers);
};

export { validate, signin, register };
