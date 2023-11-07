import {createApp} from "vue";
import "./styles/index.scss";
import App from "./App.vue";
import {router} from './router'
import {store} from "~/store/index.js";
import {ElMessage} from 'element-plus'
import {axiosInstance} from "@/utils/index.js";


createApp(App).use(router).use(store).use(ElMessage).use(axiosInstance).mount("#app");
