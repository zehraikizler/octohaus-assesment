/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import { setComponentsAsGlobal } from "./GlobalComponents";

export function registerPlugins(app) {
  setComponentsAsGlobal(app);
  loadFonts();
  app.use(vuetify);
}
