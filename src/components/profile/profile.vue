<script>
import mask from "../../config/mask";
import { SessionStore } from "../../services/Session";
import api from "../../services/Api";
export default {
  async created() {
    try {
      const session = SessionStore.load();
      this.session = session;
      const pro = await api.getAsync(`/users/${session.user.id}`);
      this.profile = { password: null, password_confirm: null, ...pro };
    } catch (error) {
      const { message } = api.getHttpResponseError(error);
      this.$toastr.e(message);
    }
  },

  data() {
    return {
      profile: {},
      session: {},
      mask
    };
  },

  methods: {
    async onSubmit() {
      const data = this.profile;
      if (
        (data.password || data.password_confirm) &&
        data.password !== data.password_confirm
      ) {
        this.$toastr.w("Senha e confirmação de senha não são identicas");
        return false;
      }
      delete data.password_confirm;
      try {
        this.$toastr.i("Salvando...");
        await api.putAsync("/users", data);
        const session = this.session;
        const user = { ...session.user, name: data.name };
        const sessionUpdate = { ...session, user };
        SessionStore.store(sessionUpdate);
        this.$rootApp.$emit("session", {
          isAuthorized: true,
          ...sessionUpdate
        });
        this.$toastr.removeByType("info");
        this.$toastr.s("Conta alterada com sucesso");
        this.profile = {
          ...this.profile,
          password: null,
          password_confirm: null
        };
      } catch (error) {
        const { message } = api.getHttpResponseError(error);
        this.$toastr.e(message);
      }
      return false;
    }
  }
};
</script>

<template>
  <form v-on:submit.prevent="onSubmit()" class="form-signin">
    <div class="text-center mb-4">
      <h1 class="h3 mb-3 font-weight-normal">Atualizar Conta</h1>
    </div>

    <div class="form-label-group">
      <input
        type="text"
        class="form-control"
        placeholder="Nome"
        v-model="profile.name"
        id="name"
      />
      <label for="name">Nome</label>
    </div>

    <div class="form-label-group">
      <input
        type="email"
        class="form-control"
        placeholder="E-mail"
        v-model="profile.email"
        id="email"
        readonly
        required
      />
      <label for="email">E-mail</label>
    </div>

    <div class="form-label-group">
      <the-mask
        type="text"
        class="form-control"
        placeholder="Celular"
        v-model="profile.mobile_phone"
        id="mobile_phone"
        required
        :mask="mask.brCelular"
      ></the-mask>
      <label for="mobile_phone">Celular</label>
    </div>

    <div class="form-label-group">
      <input
        type="password"
        class="form-control"
        placeholder="Senha"
        v-model="profile.password"
        id="email"
      />
      <label for="password">Senha</label>
    </div>

    <div class="form-label-group">
      <input
        type="password"
        class="form-control"
        placeholder="Confirmação de Senha"
        v-model="profile.password_confirm"
        id="password_confirm"
      />
      <label for="password_confirm">Confirmação de Senha</label>
    </div>

    <button type="submit" class="btn btn-success">Salvar</button>
  </form>
</template>

<style>
@import url("../../assets/theme.css");
</style>
