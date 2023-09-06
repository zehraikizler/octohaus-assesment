import VueFeather from "vue-feather";
export function setComponentsAsGlobal(app) {
  app.component(VueFeather.name, VueFeather);
}
