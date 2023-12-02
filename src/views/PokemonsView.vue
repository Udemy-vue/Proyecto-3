<template>
	<h1>Pokemones</h1>
	<ul>
		<li v-for="poke in pokemons">
			<router-link :to="`/pokemons/${poke.name}`">
        {{ poke.name }}
      </router-link>
		</li>
	</ul>
</template>

<script>
	import axios from 'axios';
	import { ref } from 'vue';
	import { RouterLink } from 'vue-router';

	export default {
		data() {
			return {
				pokemons: ref([]),
				data: {}
			};
		},
		computed: {

		},
		methods: {
			async getData() {
				try{
					return (await axios.get("https://pokeapi.co/api/v2/pokemon")).data
				} catch(er){
					console.log(er);
				}
			},
		},
		async created() {
			this.data = await this.getData();
			this.pokemons = this.data.results;
			// console.log(this.pokemons)
		},
		components: {
			RouterLink
		}
	}
</script>