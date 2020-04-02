import http from "./Http";

export default class Api {
  static get(url) {
    return http.get(url);
  }

  static async getAsync(url) {
    const { data } = await http.get(url);
    return data;
  }

  static post(url, data = {}) {
    return http.post(url, data);
  }

  static async postAsync(url, params = {}) {
    const { data } = await http.post(url, params);
    return data;
  }

  static put(url, data = {}) {
    return http.put(url, data);
  }

  static async putAsync(url, params = {}) {
    const { data } = await http.put(url, params);
    return data;
  }

  static delete(url) {
    return http.delete(url);
  }

  static async deleteAsync(url) {
    const { data } = await http.delete(url);
    return data;
  }

  static getHttpResponseError(data) {
    const error = {
      code: data.status ? data.status : null,
      error: true,
      message: "Erro não identificado"
    };

    if (
      typeof data.response !== "undefined" &&
      data.response.data !== "undefined"
    ) {
      data = data.response.data;
    }
    if (
      typeof data.error !== "undefined" &&
      typeof data.message !== "undefined"
    ) {
      error.message = data.message;
    } else if (typeof data.message !== "undefined" && data.message !== "") {
      error.message = data.message;
    }
    return error;
  }
}
