import Dashboard from "./components/dashboard/dashboard.vue";
import SignUp from "./components/signup/signup.vue";
import SignIn from "./components/signin/signin.vue";
import Profile from "./components/profile/profile.vue";

const routes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/sign-up", component: SignUp },
  { path: "/sign-in", component: SignIn },
  { path: "/profile", component: Profile },
  { path: "*", redirect: "/dashboard" }
];

export default routes;
