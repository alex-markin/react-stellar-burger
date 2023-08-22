import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../utils/api";
import { AppThunk } from "./store";
import { User } from "../utils/types";

type UserState = {
  user: User | null,
  password: string,
  isAuthenticated: boolean,
  loading: boolean,
  isAuthChecked: boolean,
  error: any,
}

const initialState: UserState = {
  user: null,
  password: "",
  isAuthenticated: false,
  loading: false,
  isAuthChecked: false,
  error: null,
};


export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthChecked = false;
    },

    fetchRequestSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.isAuthChecked = true;
    },

    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.isAuthChecked = true;
      state.isAuthenticated = true;
    },

    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    setLogout: (state) => {
      state.user = null;
      state.password = "";
      state.loading = false;
      state.error = null;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    },

    fetchUserFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthChecked = true;
      state.isAuthenticated = false;
    },

    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
});

export const {
  fetchRequest,
  fetchRequestSuccess,
  setUser,
  fetchUserFailure,
  setLogout,
  setAuthChecked,
  setPassword
} = userAuthSlice.actions;


export const getUser = (): AppThunk => async (dispatch) => {
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



export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  dispatch(fetchRequest());
  try {
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
  } catch (err) {
    dispatch(fetchUserFailure(err));
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  dispatch(fetchRequest());
  try {
    api.
      logout()
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setLogout());
      })
  } catch (err) {
    dispatch(fetchUserFailure(err));
  }
};


export const register = (name: string, email: string, password: string): AppThunk => async (dispatch) => {
  dispatch(fetchRequest());
  try {
    api
      .register(name, email, password)
      .then((res) => {
        dispatch(setUser(res.user));
        dispatch(setPassword(password));
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
      })
  } catch (err) {
    dispatch(fetchUserFailure(err));
  }
};

export const checkUserAuth = (): AppThunk => async (dispatch) => {
  if (localStorage.getItem("accessToken")) {
    try {
      await dispatch(getUser());
    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    } finally {
      dispatch(setAuthChecked(true));
    }
  } else {
    dispatch(setAuthChecked(true));
  }
};

export const forgotPassword = (email: string): AppThunk => async (dispatch) => {
  dispatch(fetchRequest());
  try {
    api
      .forgotPassword(email)
      .then((res) => {
        console.log(res);
        dispatch(fetchRequestSuccess());
      })
  } catch (err) {
    dispatch(fetchUserFailure(err));
  }
}

export const resetPassword = (password: string, token: string): AppThunk => async (dispatch) => {
  dispatch(fetchRequest());
  try {
    api
      .resetPassword(password, token)
      .then((res) => {
        console.log(res);
        dispatch(fetchRequestSuccess());
      })
  } catch (err) {
    dispatch(fetchUserFailure(err));
  }
}

export const changeUser = (name: string, mail: string, password: string): AppThunk => async (dispatch) => {
  try {
    api
      .changeUser(name, mail, password)
      .then((res) => {
        dispatch(setUser(res.user));
        dispatch(setPassword(password));
      })
  } catch (err) {
    console.log(err);
  }
}

