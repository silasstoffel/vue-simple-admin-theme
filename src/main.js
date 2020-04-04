import Vue from "vue";
import VueRouter from "vue-router";
import { Plugin } from "vue-fragment";
import VueToastr from "vue-toastr";
import VueTheMask from "vue-the-mask";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// Configs
import { toastr } from "./config/index";
// Services
import { SessionStore, Session } from "./services/Session";
import routes from "./routes";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(Plugin);
Vue.use(VueRouter);
Vue.use(VueToastr, toastr);
Vue.use(VueTheMask);

// Uma forma de criar instancia global acessível
// a todos os componentes
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
  render: h => h(App)
}).$mount("#app");
