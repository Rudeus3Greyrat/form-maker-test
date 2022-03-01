import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import FormMaker from 'vue-nesting-form-maker'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(FormMaker);

new Vue({
  render: h => h(App),
}).$mount('#app')
