import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFavoritosStore = defineStore('favoritos', {

	state: () => ({
		favoritos: ref(JSON.parse(localStorage.getItem('favoritos')) || []),
		pokemon: -1
	}),
	actions: {
		add(poke) {
			const existe = this.favoritos.some((favorito) => favorito.name === poke.name);
			if (!existe) {
        this.favoritos.push(poke);
        this.actualizarLocalStorage();
      }
		},
		delete(poke) {
			// console.log(typeof(poke));
			this.favoritos.splice(parseInt(poke), 1);
      this.actualizarLocalStorage();
		},
		vaciar() {
			this.favoritos = [];
      this.actualizarLocalStorage();
		},
		visualizar() { 
			console.log(this.favoritos);
		},
		vista(poke, name) {
			if(this.favoritos.length > poke){
				return this.favoritos[parseInt(poke)].name != name;
			}
			else{
				return true;
			}
		},
		atrapado(name) {
			return this.favoritos.some((favorito) => favorito.name === name);
		},
		actualizarLocalStorage() {
      localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    }
	},
	getters: {

	}
});

