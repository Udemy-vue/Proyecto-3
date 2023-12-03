<template>
	<h1>Pokemones</h1>
	<ul v-if="data!=null" class="NamePoke" :style="`counter-reset: item ${num};`">
		<li v-for="poke in pokemons" :key="poke.name">
			<router-link :to="`/pokemons/${poke.name}/${encodeURIComponent(http)}`"
				@lectura="lectura">
        {{ poke.name }}
      </router-link>
		</li>
	</ul>
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

	export default {
		data() {
			return {
				pokemons: ref([]),
				data: ref(),
				next: '',
				previous: '',
				http: this.$route.params.http,
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
				this.http = texto;
				this.next = this.data.next;
				this.previous = this.data.previous;
				if(this.data != null) this.pokemons = this.data.results;
			},
			lectura(texto) {

				console.log("hola a todos: " + texto);
			}
		},
		async created() {
			await this.crear(this.http);
		},
		components: {
			RouterLink,
			ButtonCounter
		}
	}
</script>

<style>
  @import "@/assets/styles/app.css";
</style>