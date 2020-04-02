import Vue from "vue";
import VueRouter from "vue-router";
import { Plugin } from "vue-fragment";
import VueToastr from "vue-toastr";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Configs
import { toastr } from "./config";

// Services
import { SessionStore, Session } from "./services/Session";

import routes from "./routes";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(Plugin);
Vue.use(VueRouter);
Vue.use(VueToastr, toastr);

Vue.prototype.$rootApp = new Vue();

const router = new VueRouter({ routes });
const publicRouters = ["/sign-in", "/sign-up"];

if (!Session.isAuthorized) {
  const session = SessionStore.load();
  Session.isAuthorized = session.isAuthorized;
  Session.token = session.token;
  Session.user = session.user;
}

router.beforeEach((to, from, next) => {
  if (publicRouters.indexOf(to.path) === -1 && !Session.isAuthorized) {
    next({ path: "/sign-in" });
  } else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App),
  mounted() {
    this.$toastr.defaultTimeout = toastr.defaultTimeout;
    this.$toastr.defaultProgressBar = toastr.defaultProgressBar;
    this.$toastr.defaultProgressBarValue = toastr.defaultProgressBarValue;
    this.$toastr.defaultCloseOnHover = toastr.defaultCloseOnHover;
    this.$toastr.defaultType = toastr.defaultType;
    this.$toastr.defaultPosition = toastr.defaultPosition;
  }
}).$mount("#app");
