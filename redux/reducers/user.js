const {
  REGISTER_USER,
  LOGIN_USER,
  FAIL_USER,
  LOAD_USER,
  CURRENT_USER,
  LOGOUT_USER,
  GET_ALL_USERS,
  GET_USER,
  FORGOT_PASS,
  RESET_PASS,  
  UPDATE_USER,
  VERIFY_EMAIL
} = require("../constants/user");

const initialState = {
  users: [],
  user: {},
  errors: [],
  isAuth: false,
  load: false,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER:
      return { ...state, load: true };

    case REGISTER_USER:
      localStorage.setItem("token", payload.token);
      return { ...state, user: payload.user, load: false, isAuth: true };

    case LOGIN_USER:
      localStorage.setItem("token", payload.token);
      return { ...state, user: payload.user, load: false, isAuth: true };

    case FAIL_USER:
      return { ...state, errors: payload, load: false };

    case CURRENT_USER:
      return { ...state, user: payload, isAuth: true, load: false };

    case UPDATE_USER:
      return { ...state, user: { ...state.user, ...payload }, load: false };

    case LOGOUT_USER:
      localStorage.removeItem("token");
      return { ...state, user: {}, isAuth: false, load: false };

    case GET_ALL_USERS:
      return { ...state, users: payload.users, load: false };

    case GET_USER:
      return { ...state, user: payload, load: false };

    case FORGOT_PASS: 
      return { ...state, load: false };

    case RESET_PASS: 
      return { ...state, load: false };

    case VERIFY_EMAIL:
      return { 
        ...state, 
        user: { 
          ...state.user, 
          isVerified: true 
        }, 
        load: false 
      };

    case "VIDE_ERRORS":
      return { ...state, errors: [] };

    default:
      return state;
  }
};

export default userReducer;
