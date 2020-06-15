import Vue from 'vue';

const eventBus = {};

eventBus.install = function (Vue) {
  Vue.prototype.$bus = new Vue();
};

Vue.use(eventBus);
