import { checkResponse } from "./check-response";


const registerUrl = 'https://norma.nomoreparties.space/api/auth/register'
const forgotPasswordUrl = 'https://norma.nomoreparties.space/api/password-reset'
const resetPasswordUrl = 'https://norma.nomoreparties.space/api/password-reset/reset';
const loginUrl = 'https://norma.nomoreparties.space/api/auth/login';
const userAuthUrl = 'https://norma.nomoreparties.space/api/auth/user';
const refreshTokenUrl = 'https://norma.nomoreparties.space/api/auth/token';
const logoutUrl = 'https://norma.nomoreparties.space/api/auth/logout';

export const refreshToken = () => {
  return fetch(refreshTokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const getUser = () => {
  return fetchWithRefresh(userAuthUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    }
  })

    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    }
    );
};

const changeUser = (name, email, password) => {
  return fetchWithRefresh(userAuthUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password }),
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    }
    );
  };



const login = (email, password) => {
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      password: password }),
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    }
    );
};

const logout = () => {
  return fetch(logoutUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};


const register = (name, email, password) => {
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name }),
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    }
    );
};

const resetPassword = (password, token) => {
  return fetch(resetPasswordUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      password: password,
      token: token }),
  })

    .then(checkResponse)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    }
    );
};

const forgotPassword = (email) => {
  return fetch(forgotPasswordUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email }),
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    }
    );
};



export const api = {
  getUser,
  changeUser,
  login,
  register,
  logout,
  forgotPassword,
  resetPassword
};

