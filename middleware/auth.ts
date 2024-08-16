import { useLogin } from "@/composables/auth/login";
const { isLoggedIn } = useLogin();
export default defineNuxtRouteMiddleware((to, from) => {
  if (!isLoggedIn.value && to.path !== "/login") {
    return navigateTo("/");
  }
});
