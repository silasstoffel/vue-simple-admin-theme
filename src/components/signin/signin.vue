<script>
import { Session, SessionService, SessionStore } from "../../services/Session";
import api from "../../services/Api";

export default {
  name: "SignIn",

  created() {
    if (this.$root.state.session.isAuthorized) {
      this.$router.push("/dashboard");
    }
  },

  data() {
    return {
      login: { email: "", senha: "" }
    };
  },

  methods: {
    async signIn() {
      try {
        this.$toastr.i("Salvando ...");
        const session = await SessionService.start(
          this.login.email,
          this.login.password
        );
        SessionStore.store(session);
        Session.isAuthorized = true;
        Session.token = session.token;
        Session.user = session.user;
        this.$root.state.session = {
          isAuthorized: true,
          token: session.token,
          user: session.user
        };
        this.$toastr.removeByType("info");
        this.$router.push("/dashboard");
      } catch (error) {
        this.$toastr.removeByType("info");
        const { message } = api.getHttpResponseError(error);
        this.$toastr.e(message);
      }
    }
  }
};
</script>

<template>
  <form class="form-signin" v-on:submit.prevent="signIn()">
    <div class="text-center mb-4">
      <img
        class="mb-4"
        src="../../assets/bootstrap-solid.svg"
        alt
        width="72"
        height="72"
      />
      <h1 class="h3 mb-3 font-weight-normal">Admin</h1>
    </div>

    <div class="form-label-group">
      <input
        type="email"
        class="form-control"
        placeholder="E-mail"
        v-model="login.email"
        id="email"
        required
        autofocus
      />
      <label for="email">E-mail</label>
    </div>

    <div class="form-label-group">
      <input
        type="password"
        class="form-control"
        placeholder="Senha"
        v-model="login.password"
        id="email"
        required
      />
      <label for="password">Senha</label>
    </div>

    <button type="submit" class="btn btn-primary">Login</button>

    <hr class="mb" />

    <p>
      <a href="/#/sign-up">Criar conta</a>
    </p>
  </form>
</template>

<style>
@import url("../../assets/theme.css");
</style>
