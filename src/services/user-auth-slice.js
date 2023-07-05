import { createSlice } from "@reduxjs/toolkit";
import { checkReponse } from "../utils/check-response";
import { api } from "../utils/api";

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: null,
    password: null,
    isAuthenticated: false,
    loading: false,
    isAuthChecked: false,
    error: null,
  },
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthChecked = false;
    },

    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.isAuthChecked = true;
      state.isAuthenticated = true;
    },

    setPassword: (state, action) => {
      state.password = action.payload;
    },

    setLogout: (state) => {
      state.user = null;
      state.password = null;
      state.loading = false;
      state.error = null;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    },

    fetchUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    },

    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
  },
});

export const {
  fetchRequest,
  setUser,
  fetchUserFailure,
  setLogout,
  setAuthChecked,
  setPassword
} = userAuthSlice.actions;

export const getUser = () => (dispatch) => {
  return api.getUser()
  .then((res) => {
    dispatch(setUser(res.user));
    return res;
  })
  .catch((err) => {
    dispatch(fetchUserFailure(err));
    return err;
  });
};

export const login = (email, password) => (dispatch) => {
  dispatch(fetchRequest());
  api
    .login(email, password)
    .then((res) => {
      dispatch(setUser(res.user));
      dispatch(setPassword(password));
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("accessToken", res.accessToken);
    })
    .catch((err) => {
      dispatch(fetchUserFailure(err));
    });
};

export const logout = () => (dispatch) => {
  dispatch(fetchRequest());
  api.
    logout()
    .then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setLogout());
    })
    .catch((err) => {
      console.log(err);
    });
};


export const register = (name, email, password) => (dispatch) => {
  dispatch(fetchRequest());
  api
    .register(name, email, password)
    .then((res) => {
      dispatch(setUser(res.user));
      dispatch(setPassword(password));
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("accessToken", res.accessToken);
    })
    .catch((err) => {
      dispatch(fetchUserFailure(err));
    });
};

export const checkUserAuth = () => dispatch => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch((err) => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser({}));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };

export const forgotPassword = (email) => (dispatch) => {
  dispatch(fetchRequest());
  api
    .forgotPassword(email)
    .then((res) => {
     console.log(res);
    })
    .catch((err) => {
      dispatch(fetchUserFailure(err));
    });
}

export const resetPassword = (password, token) => (dispatch) => {
  dispatch(fetchRequest());
  api
    .resetPassword(password, token)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      dispatch(fetchUserFailure(err));
    });
}

export const changeUser = (name, mail, password) => (dispatch) => {
  dispatch(fetchRequest());
  api
    .changeUser(name, mail, password)
    .then((res) => {
      dispatch(setUser(res.user));
      dispatch(setPassword(password));
    })
    .catch((err) => {
      console.log(err);
    });
}

