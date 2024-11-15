import axios from "axios";
import {
  GET_ALL_SERVICES,
  GET_SERVICE,
  ADD_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  LOAD_SERVICE,
  FAIL_SERVICE,
  GET_ALL_SERVICES_BY_USER,
} from "../constants/service";
const tokenStr = localStorage.getItem("token");

export const addService = (service) => async (dispatch) => {
  try {
    const tokenStr = localStorage.getItem("token");

    let result = await axios.post(
      "http://localhost:5000/api/service/add-service",
      service,
      {
        headers: {
          Authorization: `Bearer ${tokenStr}`,
        },
      }
    );
    dispatch({ type: ADD_SERVICE, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_SERVICE, payload: [error] });
  }
};

export const updateService = (id, service) => async (dispatch) => {
  try {
    let result = await axios.put(
      `http://localhost:5000/api/service/update/${id}`,
      service
    );
    dispatch({ type: UPDATE_SERVICE, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_SERVICE, payload: error.response.data.errors });
  }
};

export const getAllServices = () => async (dispatch) => {
  dispatch({ type: LOAD_SERVICE });
  try {
    const allServices = await axios.get(`http://localhost:5000/api/service`, {
      headers: { Authorization: `Bearer ${tokenStr}` },
    });
    dispatch({ type: GET_ALL_SERVICES, payload: allServices.data });
  } catch (error) {
    dispatch({ type: FAIL_SERVICE, payload: [error] });
  }
};

export const getServiceByID = (id) => async (dispatch) => {
  dispatch({ type: LOAD_SERVICE });
  try {
    const tokenStr = localStorage.getItem("token");
    const result = await axios.get(`http://localhost:5000/api/service/${id}`, {
      headers: { Authorization: `Bearer ${tokenStr}` },
    });
    dispatch({ type: GET_SERVICE, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_SERVICE, payload: [error] });
  }
};

export const deleteService = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/service/delete/${id}`);
    dispatch(DELETE_SERVICE);
  } catch (error) {
    dispatch({ type: FAIL_SERVICE, payload: error.response.data.errors });
  }
};
export const getAllServicesByUser = () => async (dispatch) => {
  dispatch({ type: LOAD_SERVICE });
  try {
    const allServices = await axios.get(
      "http://localhost:5000/api/service/get-by-current/user",
      {
        headers: { Authorization: `Bearer ${tokenStr}` },
      }
    );
    dispatch({ type: GET_ALL_SERVICES_BY_USER, payload: allServices.data });
  } catch (error) {
    dispatch({ type: FAIL_SERVICE, payload: [error] });
  }
};
