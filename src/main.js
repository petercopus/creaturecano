import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/styles/tailwind.css';

// Prime Vue
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-dark-amber/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Menubar from 'primevue/menubar';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Chip from 'primevue/chip';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  // General
  faPlus,
  faChampagneGlasses,

  // Animals
  faHippo,
  faOtter,
  faDog,
  faCow,
  faFish,
  faDragon,
  faKiwiBird,
  faWorm,
  faSpider,
  faShrimp,
  faMosquito,
  faLocust,
  faHorse,
  faFrog,
  faFishFins,
  faDove,
  faCrow,
  faCat,
  faBugs,

  // Others
  faFlask,
  faVolcano,

  // Stats
  faHeart,
  faPersonRunning,
  faHandsHoldingCircle,
  faMars,
  faVenus,
  faMoon,
  faSun,
  faShield,
  faBatteryFull,
  faBatteryThreeQuarters,
  faBatteryHalf,
  faBatteryQuarter,
  faBatteryEmpty,

  // Food
  faEgg,
  faCarrot,
  faLemon,
  faPepperHot,
  faBone,
  faAppleWhole,
  faWheatAwn,
  faBacon,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  // General
  faPlus,
  faChampagneGlasses,

  // Animals
  faHippo,
  faOtter,
  faDog,
  faCow,
  faFish,
  faDragon,
  faKiwiBird,
  faWorm,
  faSpider,
  faShrimp,
  faMosquito,
  faLocust,
  faHorse,
  faFrog,
  faFishFins,
  faDove,
  faCrow,
  faCat,
  faBugs,

  // Others
  faFlask,
  faVolcano,

  // Stats
  faHeart,
  faPersonRunning,
  faHandsHoldingCircle,
  faMars,
  faVenus,
  faMoon,
  faSun,
  faShield,
  faBatteryFull,
  faBatteryThreeQuarters,
  faBatteryHalf,
  faBatteryQuarter,
  faBatteryEmpty,

  // Food
  faEgg,
  faCarrot,
  faLemon,
  faPepperHot,
  faBone,
  faAppleWhole,
  faWheatAwn,
  faBacon,
  faPerson
);

// App
const pinia = createPinia();
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('Menubar', Menubar);
app.component('Card', Card);
app.component('Checkbox', Checkbox);
app.component('Button', Button);
app.component('Chip', Chip);
app.use(pinia);
app.use(PrimeVue);
app.use(router);
app.mount('#app');
