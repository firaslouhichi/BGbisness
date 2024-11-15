import axios from "axios";
import {
  LOAD_USER,
  REGISTER_USER,
  FAIL_USER,
  LOGIN_USER,
  CURRENT_USER,
  LOGOUT_USER,
  GET_ALL_USERS,
  GET_USER,
  RESET_PASS,
  CHANGE_PASS,
  UPDATE_USER,
  DELETE_USER,
  VERIFY_EMAIL
} from "../constants/user";

// Register action
export const register = (user) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let result = await axios.post("http://localhost:5000/api/auth/signup", user);
    dispatch({ type: REGISTER_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response ? error.response.data : error.message });
  }
};

// Login action
export const login = (user) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let result = await axios.post("http://localhost:5000/api/auth/login", user);
    dispatch({ type: LOGIN_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response ? error.response.data : error.message });
  }
};

// Get current logged-in user
export const getCurrentUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const tokenStr = localStorage.getItem("token");

  try {
    const result = await axios.get("http://localhost:5000/api/auth/", {
      headers: { Authorization: `Bearer ${tokenStr}` },
    });
    dispatch({ type: CURRENT_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response ? error.response.data : error.message });
  }
};

// Verify email action
export const verifyEmail = (code) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post("http://localhost:5000/api/auth/verify-email", { code });
    dispatch({ type: VERIFY_EMAIL, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response ? error.response.data : error.message });
  }
};

// Get user by ID action
export const getUserById = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const tokenStr = localStorage.getItem("token");

  try {
    const result = await axios.get(`http://localhost:5000/api/auth/user/${userId}`, {
      headers: { Authorization: `Bearer ${tokenStr}` },
    });
    dispatch({ type: GET_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response ? error.response.data : error.message });
  }
};

// Get all users (Admin only)
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const tokenStr = localStorage.getItem("token");

  try {
    const result = await axios.get("http://localhost:5000/api/auth/users", {
      headers: { Authorization: `Bearer ${tokenStr}` },
    });
    dispatch({ type: GET_ALL_USERS, payload: result.data.users });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response ? error.response.data : error.message });
  }
};

// Update user action
export const updateUser = (userId, userData) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const tokenStr = localStorage.getItem("token");

  try {
    const result = await axios.put(`http://localhost:5000/api/auth/update/${userId}`, userData, {
      headers: { Authorization: `Bearer ${tokenStr}` },
    });
    dispatch({ type: UPDATE_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response ? error.response.data : error.message });
  }
};

// Delete user action (Admin only)
export const deleteUser = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const tokenStr = localStorage.getItem("token");

  try {
    const result = await axios.delete(`http://localhost:5000/api/auth/delete/${userId}`, {
      headers: { Authorization: `Bearer ${tokenStr}` },
    });
    dispatch({ type: DELETE_USER, payload: userId });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response ? error.response.data : error.message });
  }
};

// Logout action
export const logout = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const tokenStr = localStorage.getItem("token");

  try {
    await axios.post("http://localhost:5000/api/auth/logout", {}, {
      headers: { Authorization: `Bearer ${tokenStr}` },
    });
    dispatch({ type: LOGOUT_USER });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response ? error.response.data : error.message });
  }
};

// Forgot password action
export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post(
      "http://localhost:5000/api/auth/forgot-password",
      { email }
    );
    dispatch({ type: FORGOT_PASS, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error });
  }
};


// Reset password action
export const resetPassword = (data) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post(
      `http://localhost:5000/api/auth/reset-password/${data.token}`,
      { password: data.password }
    );
    dispatch({ type: RESET_PASS, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error });
  }
};

