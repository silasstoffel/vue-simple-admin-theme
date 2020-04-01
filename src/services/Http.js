import axios from "axios";
import httpConfig from "../config/http";
import { Session, SessionStore } from "./Session";

const http = axios.create({
  baseURL: httpConfig.baseUrl
});

http.interceptors.request.use(
  request => {
    if (Session && !Session.isAuthorized) {
      const session = SessionStore.load();
      Session.isAuthorized = session.isAuthorized;
      Session.token = session.token;
      Session.user = session.user;
    }
    if (Session.token) {
      request.headers.Authorization = `Bearer ${Session.token}`;
    }
    return request;
  },
  err => {
    return Promise.reject(err);
  }
);

export default http;
