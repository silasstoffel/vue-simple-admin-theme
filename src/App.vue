<script>
import { Fragment } from "vue-fragment";
import Menu from "./components/menu/index";
import { SessionStore, Session } from "./services/Session";

export default {
  name: "App",
  mounted() {
    this.sessionEmitter();
  },
  updated() {
    this.sessionEmitter();
  },
  components: {
    Fragment,
    Menu
  },
  methods: {
    /*
     * Emite um evento da session em contexto
     */
    sessionEmitter() {
      if (!Session.isAuthorized) {
        const session = SessionStore.load();
        Session.isAuthorized = session.isAuthorized;
        Session.token = session.token;
        Session.user = session.user;
      }
      this.$rootApp.$emit("session", Session);
    }
  }
};
</script>

<template>
  <Fragment>
    <Menu></Menu>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </Fragment>
</template>