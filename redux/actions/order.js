import axios from "axios";
import {
  GET_ALL_ORDERS,
  GET_ORDER,
  ADD_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  LOAD_ORDER,
  FAIL_ORDER,
} from "../constants/order";
const tokenStr = localStorage.getItem("token");

export const addOrder = (id, order) => async (dispatch) => {
  try {
    const tokenStr = localStorage.getItem("token");

    let result = await axios.post(
      `http://localhost:5000/api/order/add-order/${id}`,
      order,
      {
        headers: {
          Authorization: `Bearer ${tokenStr}`,
        },
      }
    );
    dispatch({ type: ADD_ORDER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_ORDER, payload: [error] });
  }
};

export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: LOAD_ORDER });
  const tokenStr = localStorage.getItem("token");
  try {
    const allOrders = await axios.get(
      `http://localhost:5000/api/order/orders`,
      {
        headers: { Authorization: `Bearer ${tokenStr}` },
      }
    );
    console.log(allOrders);
    dispatch({ type: GET_ALL_ORDERS, payload: allOrders.data });
  } catch (error) {
    dispatch({ type: FAIL_ORDER, payload: [error] });
  }
};

export const getOrderByID = (id) => async (dispatch) => {
  dispatch({ type: LOAD_ORDER });
  try {
    const tokenStr = localStorage.getItem("token");

    const result = await axios.get(`http://localhost:8080/api/Orders/${id}`, {
      headers: { Authorization: `Bearer ${tokenStr}` },
    });
    dispatch({ type: GET_ORDER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_ORDER, payload: [error] });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/order/orders/${id}`);
    dispatch(DELETE_ORDER);
  } catch (error) {
    dispatch({ type: FAIL_ORDER, payload: error.response.data.errors });
  }
};
