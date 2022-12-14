import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/reset.css'
import * as Icons from "@element-plus/icons-vue";

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import './permission' // permission control
import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

const app =  createApp(App).use(store).use(router).use(ElementPlus).use(VueMarkdownEditor)
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key])
})
app.mount('#app')

