console.log('J.M.J');
console.log("Crux sancta sit mihi lux Non draco sit mihi dux Vade retro satana Numquam suade mihi vana Sunt mala quae libas Ipse venena bibas ");
console.log('Sancte Ioseph, operarius, ora pro nobis');


import './assets/main.css'
import NavBar from './components/UI/NavBar.vue';
import BaseCard from './components/UI/BaseCard.vue';
import BaseModal from './components/UI/BaseModal.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import BaseButton from './components/UI/BaseButton.vue';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('NavBar', NavBar);
app.component('BaseCard', BaseCard);
app.component('BaseModal', BaseModal);
app.component('BaseDialog', BaseDialog);
app.component('BaseButton', BaseButton);

app.mount('#app')
