import { checkResponse } from "./check-response";


const registerUrl = 'https://norma.nomoreparties.space/api/auth/register'
const forgotPasswordUrl = 'https://norma.nomoreparties.space/api/password-reset'
const resetPasswordUrl = 'https://norma.nomoreparties.space/api/password-reset/reset';
const loginUrl = 'https://norma.nomoreparties.space/api/auth/login';
const userAuthUrl = 'https://norma.nomoreparties.space/api/auth/user';
const refreshTokenUrl = 'https://norma.nomoreparties.space/api/auth/token';
const logoutUrl = 'https://norma.nomoreparties.space/api/auth/logout';
const getOrderUrl = 'https://norma.nomoreparties.space/api/orders';

type RefreshData = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  [key: string]: any;
};


export const refreshToken = async (): Promise<RefreshData> => {
  const res = await fetch(refreshTokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
  return checkResponse<RefreshData>(res);
};

export const fetchWithRefresh = async (url: string, options: RequestInit): Promise<RefreshData> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers = {
        ...options.headers,
        authorization: refreshData.accessToken,
      };
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const getUser = async (): Promise<RefreshData> => {
  try {
    const response = await fetchWithRefresh(userAuthUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("accessToken") || "",
      },
    });

    return response;
  } catch (err: any) {
    console.error(err);
    return Promise.reject(err)
  }
};


const changeUser = async (name: string, email: string, password: string) => {
  const accessToken = localStorage.getItem("accessToken") || "";

  try {
    const response = await fetchWithRefresh(userAuthUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    return response;
  } catch (err) {
    console.error(err);
    return Promise.reject(err)
  }
};



const login = async (email: string, password: string): Promise<RefreshData> => {
  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    return await checkResponse(response);
  } catch (err: any) {
    console.error(err);
    return Promise.reject(err)
  }
};


const logout = async (): Promise<RefreshData> => {
  try {
    const response = await fetch(logoutUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });

    return await checkResponse(response);
  } catch (err) {
    console.error(err);
    return Promise.reject(err)
  }
};


const register = async (name: string, email: string, password: string): Promise<RefreshData> => {
  try {
    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });

    return await checkResponse(response);
  } catch (err) {
    console.error(err);
    return Promise.reject(err)
  }
};


const resetPassword = async (password: string, token: string): Promise<RefreshData> => {
  try {
    const response = await fetch(resetPasswordUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    });

    return await checkResponse(response);
  } catch (err) {
    console.error(err);
    return Promise.reject(err)
  }
};


const forgotPassword = async (email: string): Promise<RefreshData> => {
  try {
    const response = await fetch(forgotPasswordUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    return await checkResponse(response);
  } catch (err) {
    console.error(err);
    return Promise.reject(err)
  }
};


const getOrder = async (number: string): Promise<RefreshData> => {
  try {
    const response = await fetchWithRefresh(`${getOrderUrl}/${number}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("accessToken") || "",
      },
    });

    return response;
  } catch (err) {
    console.error(err);
    return Promise.reject(err)
  }
};






export const api = {
  getUser,
  changeUser,
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  getOrder
};

