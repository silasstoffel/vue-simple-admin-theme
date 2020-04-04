<script>
import api from "../../services/Api";
import mask from "../../config/mask";

export default {
  data() {
    return {
      profile: {},
      mask: mask
    };
  },

  methods: {
    async onSubmit() {
      const data = this.profile;
      if (data.password !== data.password_confirm) {
        this.$toastr.w("Senha e confirmação de senha não são identicas");
        return false;
      }
      delete data.password_confirm;
      try {
        this.$toastr.i("Salvando...");
        await api.postAsync("/users", data);
        this.$toastr.removeByType("info");
        this.$toastr.s("Conta criada com sucesso");
        this.$router.push("/sign-in");
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
      <img
        class="mb-4"
        src="../../assets/bootstrap-solid.svg"
        alt
        width="72"
        height="72"
      />
      <h1 class="h3 mb-3 font-weight-normal">Criar Conta</h1>
    </div>

    <div class="form-label-group">
      <input
        type="text"
        class="form-control"
        placeholder="Nome"
        v-model="profile.name"
        id="name"
        required
        autofocus
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
        required
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
        required
      />
      <label for="password_confirm">Confirmação de Senha</label>
    </div>

    <button type="submit" class="btn btn-success">Salvar</button>
    <hr class="mb" />

    <p>
      <a href="/#/sign-in">Login</a>
    </p>
  </form>
</template>

<style>
@import url("../../assets/theme.css");
</style>
