import { defineStore } from 'pinia';

export const useCounterStore = defineStore("counter", {
  // data reactiva
  state: () => ({
    count: 0,
    http: ''
  }),
  // methods
  actions: {
    increment() {
      this.count++;
    },
    reduct() {
      this.count--;
    },
    lectura(texto) {
      console.log(text);
    },
    Actualizar(http) {

      this.http = http;
      localStorage.setItem('http', http);
    },
    initialize() {
      const storedHttp = localStorage.getItem('http');
      if (storedHttp) {
        this.http = storedHttp;
      }
    }
  },
  // computed
  getters: {
    double: (state) => state.count * 2,
  },
  onInit() {
    this.initialize();
  }
});