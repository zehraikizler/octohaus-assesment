import VueFeather from "vue-feather";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import LikeIcon from "@/components/icons/LikeIcon.vue";
import UnlikeIcon from "@/components/icons/UnlikeIcon.vue";

export function setComponentsAsGlobal(app) {
  app.component(VueFeather.name, VueFeather);
  app.component("DeleteIcon", DeleteIcon);
  app.component("EditIcon", EditIcon);
  app.component("LikeIcon", LikeIcon);
  app.component("UnlikeIcon", UnlikeIcon);
}
