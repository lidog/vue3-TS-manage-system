import { createApp } from 'vue';
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import router from './router';
import { usepremissStore } from './store/premiss';
import 'element-plus/dist/index.css';
import './assets/css/icon.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);

// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
// 自定义权限指令
const premiss = usepremissStore();
app.directive('premiss', {
    mounted(el, binding) {
        if (!premiss.key.includes(String(binding.value))) {
            el['hidden'] = true;
        }
    },
});

app.mount('#app');
