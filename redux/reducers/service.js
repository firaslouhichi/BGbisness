const {
  GET_ALL_SERVICES,
  GET_SERVICE,
  ADD_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  LOAD_SERVICE,
  FAIL_SERVICE,
  GET_ALL_SERVICES_BY_USER,
} = require("../constants/service");

const initialState = {
  services: [],
  service: {},
  errors: [],
  load: false,
};

const serviceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_SERVICE:
      return { ...state, load: true };
    case ADD_SERVICE:
      return { ...state, service: payload.service, load: false };
    case UPDATE_SERVICE:
      return { ...state, service: payload.service, load: false };
    case DELETE_SERVICE:
      return {
        ...state,
        services: state.services.filter(
          (service) => service.id !== payload.serviceId
        ),
        load: false,
      };
    case FAIL_SERVICE:
      return { ...state, errors: payload, load: false };
    case GET_ALL_SERVICES:
      return { ...state, services: payload, load: false };
    case GET_ALL_SERVICES_BY_USER:
      return { ...state, services: payload, load: false };
    case GET_SERVICE:
      return { ...state, service: payload, load: false };
    case "VIDE_ERRORS":
      return { ...state, errors: [] };
    default:
      return state;
  }
};
export default serviceReducer;
