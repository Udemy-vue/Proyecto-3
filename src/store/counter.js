import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCounterStore = defineStore("counter", {
  // data reactiva
  state: () => ({
    count: 0,
    http: ref(localStorage.getItem('http') || '')
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
      this.actualizarLocalStorage();
    },
    actualizarLocalStorage() {
      localStorage.setItem('http', this.http);
    }
  },
  // computed
  getters: {
    double: (state) => state.count * 2,
  }
});