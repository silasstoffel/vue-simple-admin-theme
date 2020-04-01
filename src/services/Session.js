import Api from "./Api";

export class SessionStore {
  static load(localStorageName = "@appStorage[session]") {
    const stored = localStorage.getItem(localStorageName);
    const initialSession = {
      isAuthorized: false,
      user: {},
      token: null
    };
    if (!stored) {
      return initialSession;
    }
    const session = JSON.parse(stored);
    if (!SessionStore.isValidModel(session)) {
      return initialSession;
    }
    session.isAuthorized = true;
    return session;
  }

  static store(session, localStorageName = "@appStorage[session]") {
    localStorage.setItem(localStorageName, JSON.stringify(session));
  }

  static delete(localStorageName = "@appStorage[session]") {
    localStorage.removeItem(localStorageName);
    console.log("Passou aqui");
  }

  static isValidModel(model) {
    if (
      typeof model.user.email === "undefined" ||
      typeof model.user.name === "undefined" ||
      typeof model.token === "undefined"
    ) {
      return false;
    }

    if (model.token.length < 20) {
      return false;
    }

    return true;
  }
}

export class SessionService {
  static async start(email, password) {
    const auth = await Api.postAsync("/auth", { email, password });
    return auth;
  }
}

export class Session {
  static user = {};
  static token = null;
  static isAuthorized = false;

  static current() {
    if (Session.user.id && this.isAuthorized) {
      return this;
    }

    const session = JSON.parse(SessionStore.stored());
    if (!session) {
      return null;
    }

    if (typeof session.user === "undefined") {
      return null;
    }

    Session.user = session.user;
    Session.token = session.token;
    Session.isAuthorized = session.isAuthorized;
    return this;
  }

  static destroy(SessionStoreInstance = null) {
    Session.user = {};
    Session.token = null;
    Session.isAuthorized = null;
    if (SessionStoreInstance && typeof SessionStore.delete !== "undefined") {
      SessionStoreInstance.delete();
    }
  }
}
