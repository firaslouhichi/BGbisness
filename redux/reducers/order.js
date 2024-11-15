const {
  GET_ALL_ORDERS,
  GET_ORDER,
  ADD_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  LOAD_ORDER,
  FAIL_ORDER,
} = require("../constants/order");

const initialState = {
  orders: [],
  order: {},
  errors: [],
  load: false,
};

const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_ORDER:
      return { ...state, load: true };
    case ADD_ORDER:
      return { ...state, order: payload.order, load: false };
    case UPDATE_ORDER:
      return { ...state, order: payload.order, load: false };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== payload.orderId),
        load: false,
      };
    case FAIL_ORDER:
      return { ...state, errors: payload, load: false };
    case GET_ALL_ORDERS:
      return { ...state, orders: payload, load: false };
    case GET_ORDER:
      return { ...state, order: payload, load: false };
    case "VIDE_ERRORS":
      return { ...state, errors: [] };
    default:
      return state;
  }
};
export default orderReducer;
