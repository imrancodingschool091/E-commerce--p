import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerAPI,
  loginAPI,
  logoutAPI,
  refreshAccessTokenAPI,
  getMeAPI,
} from "./authAPI";
import {
  setAccessToken,
  removeAccessToken,
  getAccessToken,
} from "../../utils/token";

/* ===================== THUNKS ===================== */

/* Register */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await registerAPI(data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

/* Login */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await loginAPI(data);
      setAccessToken(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

/* Get Logged-in User (IMPORTANT) */
export const getMe = createAsyncThunk(
  "auth/me",
  async (_, thunkAPI) => {
    try {
      const res = await getMeAPI();
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue("Not authenticated");
    }
  }
);

/* Refresh Access Token */
export const refreshAccessToken = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await refreshAccessTokenAPI();
      setAccessToken(res.data.accessToken);
      return res.data.accessToken;
    } catch (error) {
      removeAccessToken();
      return thunkAPI.rejectWithValue("Session expired");
    }
  }
);

/* Logout */
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await logoutAPI();
      removeAccessToken();
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

/* ===================== SLICE ===================== */

const initialState = {
  user: null,
  isAuthenticated: !!getAccessToken(),
  isLoading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      /* REGISTER */
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* LOGIN */
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* GET ME */
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getMe.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      /* REFRESH TOKEN */
      .addCase(refreshAccessToken.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      /* LOGOUT */
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.success = false;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
