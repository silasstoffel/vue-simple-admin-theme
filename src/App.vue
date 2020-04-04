<script>
import { Fragment } from "vue-fragment";
import Menu from "./components/menu/index";
//import { SessionStore, Session } from "./services/Session";

export default {
  name: "App",
  mounted() {},
  updated() {},
  components: {
    Fragment,
    Menu
  },
  methods: {}
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
