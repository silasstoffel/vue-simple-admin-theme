<script>
import { SessionStore, Session } from "../../services/Session";

const noAuth = {
  isAuthorized: false,
  user: {},
  token: null
};

export default {
  created() {
    this.$rootApp.$on("session", data => {
      if (
        typeof data.isAuthorized === "undefined" ||
        typeof data.user === "undefined"
      ) {
        this.session = noAuth;
        return;
      }

      if (!data.isAuthorized || typeof data.user.id === "undefined") {
        this.session = noAuth;
        return;
      }
      this.session = {
        isAuthorized: data.isAuthorized,
        user: data.user,
        token: data.token
      };
    });
  },

  data() {
    return {
      session: noAuth,
      info: null
    };
  },
  methods: {
    signOut() {
      Session.destroy(SessionStore);
      this.$rootApp.$emit("session", noAuth);
      this.$toastr.i("Sessão encerrada");
      this.$router.push("/sign-in");
    }
  }
};
</script>

<template>
  <nav
    v-show="session.isAuthorized"
    class="navbar navbar-expand-lg navbar-light bg-light"
  >
    <a class="navbar-brand" href="/#/dashboard">Vue Admin</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/#/dashboard">
            Dasboard
            <span class="sr-only">(current)</span>
          </a>
        </li>
      </ul>

      <ul class="navbar-nav ml-md-auto mr-md-1">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <svg
              class="bi bi-person-fill"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
            {{ session.user.name }}
          </a>
          <div
            class="dropdown-menu dropdown-menu-md-right"
            aria-labelledby="navbarDropdown"
          >
            <a class="dropdown-item" href="/#/profile">Perfil</a>
            <a class="dropdown-item" href="/#/" v-on:click="signOut()">Sair</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>
