<template>
	<h1>Pokemones</h1>
	<div v-if="data!=null" class="NamePoke">
		<ul :style="`counter-reset: item ${num};`">
			<li v-for="poke in pokemons" :key="poke.name">
				<router-link :to="`/pokemon/${poke.name}/vista`">
	        {{ poke.name }}
	      </router-link>
			</li>
		</ul>
	</div>
	<h2 v-else>No se encontro ningún Pokemon porque no existen.</h2>
	
	<div v-if="data!=null" class="buttonPoke">
		<ButtonCounter :buttonText="'Previous'" 
			:info="previous"
			@lectura="crear" 
			:paso="previous===null" 
			:clase="'boton'"/>

		<ButtonCounter :buttonText="'Next'" 
			:info="next"
			@lectura="crear" 
			:paso="next===null" 
			:clase="'boton'" />
	</div>
</template> 

<script>
	/*import axios from 'axios';*/
	import { ref } from 'vue';
	import { RouterLink } from 'vue-router';
	import { Pokedest } from '@/assets/js/bundle.js'
	import ButtonCounter from '@/components/ButtonCounter.vue';
	import { useCounterStore } from '@/store/counter.js'

	export default {
		data() {
			return {
				pokemons: ref([]),
				data: ref(),
				next: '',
				previous: '',
				useCounter: useCounterStore(),
				// http: useCounter.http,
				num: 0
			};
		},
		computed: {

		},
		methods: {
			async crear(texto) {
				this.data = (await Pokedest.Pokeboll(texto));

				this.num = texto === "https://pokeapi.co/api/v2/pokemon"
				  ? 0 : parseInt(texto.match(/offset=(\d+)/)?.[1]) || null;
				// this.useCounter.http = texto
				this.useCounter.Actualizar(texto);
				this.next = this.data.next;
				this.previous = this.data.previous;
				if(this.data != null) this.pokemons = this.data.results;
			},
			lectura(texto) {
				console.log(texto);
			}
		},
		async created() {
			await this.crear(this.useCounter.http);
		},
		components: {
			RouterLink,
			ButtonCounter,
			useCounterStore
		}
	}
</script>

<style>
  @import "@/assets/styles/app.css";
</style>